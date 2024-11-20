import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/Header"

import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

const ThemeProvider = dynamic(
  () => import("@/components/theme-provider").then((mod) => mod.ThemeProvider),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "YC Archive Explorer - AI-Powered YC Startup Insights",
  description:
    "Explore Y Combinator's history with our AI-driven interface, accessing data on all past YC founders and startups.",
  openGraph: {
    title: "YC Archive Explorer - AI-Powered YC Startup Insights",
    description:
      "Dive into Y Combinator's rich history using our generative UI. Discover insights on all past YC founders and startups through an intelligent, interactive experience.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className={cn("h-full bg-background font-sans antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 overflow-hidden">{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
