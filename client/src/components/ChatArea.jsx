import { useState, useEffect, useRef } from 'react';
import { useChatContext } from '../Context/ChatProvider.jsx';
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

const ChatArea = () => {
  const {activeChatMessages,activeChatUser} = useChatContext()
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeChatUser) {
      setMessages(activeChatMessages || []);
      console.log(activeChatMessages,activeChatUser)
    } else {
      setMessages([]);
    }
  }, [activeChatUser,activeChatMessages]);  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: prev.length + 1, sender: 'You', text: input }]);
    setInput('');
  };

  if (!activeChatUser) {
    return <div className="chatarea-empty">Select a chat to start messaging</div>;
  }

  return (
    <div className="chatarea-container">
      <div className="chatarea-header">
        <h3>{activeChatUser.username}</h3>
        <span className="chat-type">{activeChatUser.type === 'group' ? 'Group Chat' : 'Private Chat'}</span>
      </div>
      <div className="chatarea-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message${msg.sender.email === activeChatUser.email ? ' received' : ' sent'}`}>
            {/* <span className="sender">{msg.sender.username}:</span> */}
            <span className="text">{msg.content}</span>
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