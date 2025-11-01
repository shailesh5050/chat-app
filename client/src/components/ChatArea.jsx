
import React, { useState, useRef, useEffect } from 'react';

const dummyMessages = {
  1: [
    { id: 1, sender: 'You', text: 'Hi family!' },
    { id: 2, sender: 'Mom', text: 'Hello!' },
  ],
  2: [
    { id: 1, sender: 'You', text: 'Work update?' },
    { id: 2, sender: 'Sam', text: 'Meeting at 3pm.' },
  ],
  3: [
    { id: 1, sender: 'You', text: 'Hey Alice!' },
    { id: 2, sender: 'Alice', text: 'Hi!' },
  ],
  4: [
    { id: 1, sender: 'You', text: 'Hey Bob!' },
    { id: 2, sender: 'Bob', text: 'Yo!' },
  ],
};

const ChatArea = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      setMessages(dummyMessages[selectedChat.id] || []);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: prev.length + 1, sender: 'You', text: input }]);
    setInput('');
  };

  if (!selectedChat) {
    return <div className="chatarea-empty">Select a chat to start messaging</div>;
  }

  return (
    <div className="chatarea-container">
      <div className="chatarea-header">
        <h3>{selectedChat.name}</h3>
        <span className="chat-type">{selectedChat.type === 'group' ? 'Group Chat' : 'Private Chat'}</span>
      </div>
      <div className="chatarea-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message${msg.sender === 'You' ? ' sent' : ' received'}`}>
            <span className="sender">{msg.sender}:</span>
            <span className="text">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chatarea-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatArea;