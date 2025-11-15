import { useChatContext } from '../Context/ChatProvider.jsx'
import { useState,useEffect } from 'react'

const AllChats = () => {
  const {chats,isLoading,getActiveChatMessages,activeChatUser,currentUser} = useChatContext()

  
  const [uniqueChats,setUniqueChats] = useState([])

  useEffect(() => {
    getUnique()
  },[chats])

  function getUnique(){
    let map = new Map()

    chats.forEach((item,index)=>{
        if(!map.has(item.sender._id ) && item.sender._id !== currentUser._id){
            map.set(item.sender._id,item.sender)
        }
    })
    
    let ar = Array.from(map.values())
    setUniqueChats(ar)
}

  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className="allchats-list">
      <h2 className="sidebar-title">Chats</h2>
      <ul>
        {uniqueChats.map(chat => (
          <li
            key={chat._id}
            className={`chat-item${chat?.email === activeChatUser?.email ? ' selected' : ''}`}
            onClick={() => getActiveChatMessages(chat)}
          >
            <span className={chat.type === 'group' ? 'group-chat' : 'private-chat'}>
              {chat.username}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllChats;