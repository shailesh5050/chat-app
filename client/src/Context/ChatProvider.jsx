import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

// Create context outside the component
const ChatContext = createContext(null)

// Rename component to ChatProvider
const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([])
    const [activeChatUser, setActiveChatUser] = useState({})
    const [activeChatMessages, setActiveChatMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // Remove chats from dependency array to prevent infinite loop
    useEffect(() => {
        setIsLoading(true)
        async function getAllChats() {
            try {
                const { data } = await axios.get('http://localhost:3000/api/message/allchats', {
                    withCredentials: true
                })
                setChats(data.messages)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        getAllChats()
    }, []) // Empty dependency array - runs only once on mount

    function getActiveChatMessages(user) {
        const chat = chats.filter(chat => chat.sender._id === user._id || chat.recipient._id === user._id)
        console.log(chat)
        setActiveChatMessages(chat)
        setActiveChatUser(user)
        
        return chat
    }

    return (
        <ChatContext.Provider value={{ 
            chats, 
            activeChatUser, 
            activeChatMessages, 
            isLoading, 
            getActiveChatMessages,
            setActiveChatUser,
            
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => useContext(ChatContext)

export default ChatProvider
