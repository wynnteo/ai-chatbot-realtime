# Build Real-Time AI Chatbot with Node.js & OpenAI API 2025

A real-time AI chatbot built with Node.js, Express, Socket.io, and OpenAI API. This chatbot provides intelligent responses powered by GPT models with real-time bidirectional communication and conversation memory.

## Features

- Real-time messaging with Socket.io
- Conversation history management
- OpenAI GPT integration
- Typing indicators
- Markdown formatting support
- Rate limiting
- Response caching

## Tech Stack

- **Node.js** - Backend runtime
- **Express.js** - Web server framework
- **Socket.io** - Real-time communication
- **OpenAI API** - AI-powered responses

## Prerequisites

- Node.js v16 or higher
- OpenAI API key

## Quick Start

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-chatbot-realtime.git
cd ai-chatbot-realtime
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

4. Start the server
```bash
node server.js
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure
```
ai-chatbot-realtime/
├── server.js          # Main server file
├── .env               # Environment variables
├── public/
│   ├── index.html     # Chat interface
│   ├── style.css      # Styling
│   └── app.js         # Client-side logic
└── package.json
```

## Tutorial

For a complete step-by-step guide, check out the full tutorial:

**[Build a Real-Time AI Chatbot with Node.js and OpenAI API - Complete Guide 2025](https://cloudfullstack.dev/real-time-ai-chatbot-nodejs-openai-api-2025/)**

The tutorial covers:
- Detailed setup instructions
- Code explanations
- Advanced features implementation
- Optimisation techniques
- Deployment strategies

## Configuration

Customise the chatbot behaviour in `server.js`:

- `model`: Change between `gpt-4` or `gpt-3.5-turbo`
- `max_tokens`: Adjust response length (default: 500)
- `temperature`: Control creativity (0-1, default: 0.7)

## License

MIT

## Author

Cloud Full Stack - [cloudfullstack.dev](https://cloudfullstack.dev)
