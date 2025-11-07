require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const OpenAI = require('openai');
const rateLimit = require('express-rate-limit');
const app = express();
const server = http.createServer(app);
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many requests, please try again later.'
});

app.use(limiter);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many requests, please try again later.'
});

app.use(limiter);

const PORT = process.env.PORT || 3000;

// store conversation history
const conversations = new Map();

function initializeConversation(socketId) {
  conversations.set(socketId, [
    {
      role: "system",
      content: "You are a helpful assistant. Keep responses concise and friendly."
    }
  ]);
}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  initializeConversation(socket.id);
  
  socket.emit('bot_message', {
    message: "Hi! I'm your AI assistant. How can I help you today?",
    timestamp: new Date().toISOString()
  });
  
  socket.on('user_message', async (data) => {
    try {
      const userMessage = data.message;
      const userConversation = conversations.get(socket.id);
      
      userConversation.push({
        role: "user",
        content: userMessage
      });
      
      socket.emit('bot_typing', { isTyping: true });
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: userConversation,
        max_tokens: 500,
        temperature: 0.7
      });
      
      const botResponse = completion.choices[0].message.content;
      
      userConversation.push({
        role: "assistant",
        content: botResponse
      });
      
      socket.emit('bot_typing', { isTyping: false });
      
      socket.emit('bot_message', {
        message: botResponse,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('OpenAI API Error:', error);
      socket.emit('bot_message', {
        message: 'Sorry, I ran into an error. Please try again.',
        timestamp: new Date().toISOString(),
        error: true
      });
    }
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    conversations.delete(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});