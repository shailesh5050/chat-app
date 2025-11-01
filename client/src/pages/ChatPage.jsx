
import React, { useState } from 'react';
import AllChats from '../components/AllChats';
import ChatArea from '../components/ChatArea';
import './ChatPage.css';

const ChatPage = () => {
  // State for selected chat (group or private)
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="chatpage-container">
      <aside className="sidebar">
        <AllChats selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      </aside>
      <main className="chat-area">
        <ChatArea selectedChat={selectedChat} />
      </main>
    </div>
  );
};

export default ChatPage