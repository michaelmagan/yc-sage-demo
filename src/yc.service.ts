"use server"

import { Document } from "@/model/document"
import { OpenAI } from "openai"
import { PineconeClient } from "pinecone-client"
import postgres from "postgres"

let pineconeClient: PineconeClient<Document["metadata"]> | null = null
let openaiClient: OpenAI | null = null
let dbClient: postgres.Sql | null = null

const getPineconeClient = (): PineconeClient<Document["metadata"]> => {
  if (!pineconeClient) {
    pineconeClient = new PineconeClient<Document["metadata"]>({
      apiKey: process.env.PINECONE_API_KEY!,
      baseUrl: process.env.PINECONE_BASE_URL!,
      namespace: process.env.PINECONE_INDEX_NAME!,
    })
  }
  return pineconeClient
}

const getOpenAIClient = (): OpenAI => {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })
  }
  return openaiClient
}

const getDbClient = (): postgres.Sql => {
  if (!dbClient) {
    const connectionString = process.env.POSTGRESS_URL
    dbClient = postgres(connectionString!)
  }
  return dbClient
}

export async function queryPineconeForDocuments(
  query: string,
  topK: number = 5
): Promise<Document[]> {
  "use server"
  const client = getPineconeClient()

  const queryEmbedding = await getQueryEmbedding(query)

  try {
    const queryResponse = await client.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    })

    console.log(`Query: ${query}`)
    console.log(`Top ${topK} results:`)

    if (!queryResponse.matches || queryResponse.matches.length === 0) {
      console.log("No matches found.")
      return []
    }

    const results = queryResponse.matches.map((match) => {
      console.log(`Score: ${match.score?.toFixed(4)}`)
      if (match.metadata) {
        console.log(`Name: ${match.metadata["name"] || "N/A"}`)
      } else {
        console.log("Metadata not available for this match.")
      }
      console.log("---")

      return {
        id: match.id,
        values: [],
        metadata: match.metadata as Document["metadata"],
        score: match.score || 0,
      }
    })

    return results as Document[]
  } catch (error) {
    console.error("Error querying Pinecone:", error)
    throw error
  }
}

async function getQueryEmbedding(query: string): Promise<number[]> {
  "use server"
  const openai = getOpenAIClient()
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  })
  return response.data[0].embedding
}

export async function groupBy(query: {
  select?: string[]
  groupBy?: string[]
  where?: Record<string, string | number | boolean>
  orderBy?: Record<string, "ASC" | "DESC">
  limit?: number
}): Promise<any[]> {
  "use server"
  const db = getDbClient()
  try {
    let sqlQuery = `SELECT ${query.select?.join(", ") || "*"} FROM yc_startups`

    if (query.where) {
      const whereClauses = Object.entries(query.where).map(([key, value]) => {
        if (typeof value === "string") {
          return `${key} = '${value}'`
        } else {
          return `${key} = ${value}`
        }
      })
      sqlQuery += ` WHERE ${whereClauses.join(" AND ")}`
    }

    if (query.groupBy && query.groupBy.length > 0) {
      sqlQuery += ` GROUP BY ${query.groupBy.join(", ")}`
    }

    if (query.orderBy) {
      const orderClauses = Object.entries(query.orderBy).map(
        ([key, direction]) => `${key} ${direction}`
      )
      sqlQuery += ` ORDER BY ${orderClauses.join(", ")}`
    }

    if (query.limit) {
      sqlQuery += ` LIMIT ${query.limit}`
    }

    const results = await db.unsafe(sqlQuery)
    return results
  } catch (error) {
    console.error("Error executing SQL:", error)
    throw error
  }
}
