import React, { useState, useRef, useEffect } from 'react';
import './ChatApp.css';

// 1. Normalized User Metadata
const USERS_MAP = {
  'user_me': { name: 'You (Driver)', avatar: '🚗' },
  'user_rider': { name: 'Alex (Rider)', avatar: '🚶' }
};

// 2. Initial Mock Data (Deliberately unsorted to test ordering logic)
const INITIAL_MESSAGES = [
  { id: 'm2', senderId: 'user_rider', text: 'I am standing near the target.', timestamp: 1715843100000 },
  { id: 'm1', senderId: 'user_me', text: 'Hey there! I have arrived at your pickup location.', timestamp: 1715843000000 },
];

const ChatApp = () => {
  const [messages, setMessages] = useState(() => 
    // Guarantee correct chronological order on initialization
    [...INITIAL_MESSAGES].sort((a, b) => a.timestamp - b.timestamp)
  );
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // 3. Perfect Auto-Scroll Hook
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 4. Message Submission Handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: `m_${Date.now()}`,
      senderId: 'user_me',
      text: inputValue.trim(),
      timestamp: Date.now()
    };

    // Defensively sort again when appending to prevent unexpected race conditions
    setMessages((prevMessages) => 
      [...prevMessages, newMessage].sort((a, b) => a.timestamp - b.timestamp)
    );
    setInputValue('');
  };

  return (
    <div className="chat-container">
      {/* Messages Feed */}
      <div className="messages-window">
        {messages.map((msg) => {
          const sender = USERS_MAP[msg.senderId] || { name: 'Unknown' };
          const isMe = msg.senderId === 'user_me';

          return (
            <div key={msg.id} className={`message-bubble ${isMe ? 'me' : 'other'}`}>
              <span className="sender-name">{sender.name}</span>
              <span className="message-text">{msg.text}</span>
            </div>
          );
        })}
        {/* Invisible anchor element to target scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Action Area */}
      <form onSubmit={handleSendMessage} className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;