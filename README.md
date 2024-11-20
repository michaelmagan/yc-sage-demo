<p align="center">
  <img src="https://github.com/michaelmagan/hydraai/raw/main/github-hydra-ai.png" alt="Hydra AI Logo">
</p>

# Hydra-AI RAG Demo On Top of YC Startups

This template utilizes Hydra AI, a powerful tool for generating React components on-the-fly at runtime using AI. You can register your components and let Hydra intelligently decide when to display them in your application.

## Powered by Hydra-AI

For more information, visit the [Hydra AI GitHub repository](https://github.com/michaelmagan/hydraai/tree/main).

<p align="center">
  <a href="https://www.npmjs.com/package/hydra-ai"><img src="https://img.shields.io/npm/v/hydra-ai.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/hydra-ai"><img src="https://img.shields.io/npm/dm/hydra-ai.svg" alt="npm downloads"></a>
  <a href="https://github.com/michaelmagan/hydraai/blob/main/LICENSE"><img src="https://img.shields.io/github/license/michaelmagan/hydraai.svg" alt="license"></a>
  <a href="https://github.com/michaelmagan/hydraai/commits/main"><img src="https://img.shields.io/github/last-commit/michaelmagan/hydraai.svg" alt="GitHub last commit"></a>
  <a href="https://discord.gg/dJNvPEHth6"><img src="https://img.shields.io/discord/1251581895414911016?color=7289da&label=discord" alt="Discord"></a>
  <a href="https://github.com/michaelmagan/hydraai/stargazers"><img src="https://img.shields.io/github/stars/michaelmagan/hydraai.svg?style=social" alt="GitHub stars"></a>
</p>

## Whats going on?

This demo showcases how Hydra AI orchestrates dynamic React component generation through several key files:

### Core Files and Their Roles

1. [`hydra-client.ts`](src/hydra-client.ts)

   - Configures and initializes the [Hydra AI](https://github.com/michaelmagan/hydraai) client
   - Registers components for Hydra's dynamic component generation:
     - [`HydraCarousel`](src/components/hydra/carousel.tsx): A carousel component that Hydra can generate when displaying lists or collections
     - [`HydraText`](src/components/hydra/text.tsx): A text component that Hydra uses for formatted text responses
     - [`Chart`](src/components/hydra/chart.tsx): A visualization component that Hydra leverages for data presentation
     - [`ProfileForm`](src/components/chat/profile.tsx): A form component that Hydra can use for user interactions
   - Defines custom tools that extend Hydra's capabilities

2. [`box.tsx`](src/components/chat/box.tsx)
   - Serves as the main interface between your app and [Hydra AI](https://github.com/michaelmagan/hydraai)
   - Handles the communication flow with Hydra's API
   - Renders Hydra's dynamically generated components
   - Manages the state of Hydra's responses
   - Provides context to Hydra for personalized interactions

### How It Works

1. When you send a message, [`box.tsx`](src/components/chat/box.tsx) processes it through these steps:

   - Adds your message to the chat history
   - Enhances the message with your profile information
   - Sends it to Hydra AI via [`hydra-client.ts`](src/hydra-client.ts)

2. [Hydra AI](https://github.com/michaelmagan/hydraai) then:

   - Analyzes your message to understand the intent
   - Chooses the most appropriate registered component
   - Generates a response with both text and potentially a component

3. The response flows back through:
   - [`box.tsx`](src/components/chat/box.tsx) receives and processes the response
   - The appropriate component is rendered in the chat
   - Progress updates are passed to the chat

## Usage

1. Install and set up Hydra AI using npx:

   ```bash
   # Sign up for a new account
   npx hydra-ai-cli signup

   # Login to your account
   npx hydra-ai-cli login

   # Create a new project
   npx hydra-ai-cli createProject

   # Add OpenAI as a provider
   npx hydra-ai-cli addProvider --id <your_project_id>

   # Generate an API key
   npx hydra-ai-cli generateKey --id <your_project_id> --name "demo-key"

   # Initialize Hydra in your project
   npx hydra-ai-cli init --src ./src/components
   ```

2. Set up your environment variables by creating a `.env.local` file:

   ```
   NEXT_PUBLIC_HYDRAAI_API_KEY=<your_hydra_api_key>
   ```

3. Install the required Python packages for the demo databases:

   ```
   pip install -r requirements.txt
   ```

4. Run the cells in the [Pinecone](pinecone.ipynb) Jupyter Notebook (`pinecone.ipynb`) to initialize and interact with the [Pinecone](https://www.pinecone.io/) service.

5. Run the cells in the [Postgres](postgress.ipynb) Jupyter Notebook (`postgress.ipynb`) to set up and interact with the [PostgreSQL](https://www.postgresql.org/) database.

6. Install the required Node.js packages and start the development server:
   ```bash
   npm install
   npm run dev
   ```

That's it! Your Hydra AI demo should now be running with the vector and relational databases configured.
