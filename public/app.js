const socket = io();

const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const statusElement = document.getElementById('status');
let typingIndicator = null;

socket.on('connect', () => {
  statusElement.textContent = 'Connected';
  statusElement.style.background = 'rgba(76, 175, 80, 0.3)';
});

socket.on('disconnect', () => {
  statusElement.textContent = 'Disconnected';
  statusElement.style.background = 'rgba(244, 67, 54, 0.3)';
});

socket.on('bot_typing', (data) => {
  if (data.isTyping) {
    typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message typing';
    typingIndicator.innerHTML = '<div>AI is typing...</div>';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } else {
    if (typingIndicator) {
      typingIndicator.remove();
      typingIndicator = null;
    }
  }
});

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

function addMessage(message, isUser = false, isError = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  
  if (isError) {
    messageDiv.classList.add('error');
  }
  
  messageDiv.innerHTML = `
    <div>${message}</div>
    <div class="timestamp">${formatTime(new Date())}</div>
  `;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const message = messageInput.value.trim();
  
  if (!message) return;
  
  addMessage(message, true);
  socket.emit('user_message', { message });
  
  messageInput.value = '';
  sendButton.disabled = true;
  sendButton.textContent = 'Sending...';
}

socket.on('bot_message', (data) => {
  addMessage(data.message, false, data.error);
  
  sendButton.disabled = false;
  sendButton.textContent = 'Send';
  messageInput.focus();
});

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

messageInput.focus();


function exportChat() {
  const messages = Array.from(document.querySelectorAll('.message'));
  const chatText = messages.map(msg => msg.textContent).join('\n\n');
  
  const blob = new Blob([chatText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `chat-${Date.now()}.txt`;
  a.click();
}