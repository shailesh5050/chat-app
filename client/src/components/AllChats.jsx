
import React from 'react';

const dummyChats = [
  { id: 1, name: 'Family Group', type: 'group' },
  { id: 2, name: 'Work Friends', type: 'group' },
  { id: 3, name: 'Alice', type: 'private' },
  { id: 4, name: 'Bob', type: 'private' },
];

const AllChats = ({ selectedChat, setSelectedChat }) => {
  return (
    <div className="allchats-list">
      <h2 className="sidebar-title">Chats</h2>
      <ul>
        {dummyChats.map(chat => (
          <li
            key={chat.id}
            className={`chat-item${selectedChat?.id === chat.id ? ' selected' : ''}`}
            onClick={() => setSelectedChat(chat)}
          >
            <span className={chat.type === 'group' ? 'group-chat' : 'private-chat'}>
              {chat.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllChats;