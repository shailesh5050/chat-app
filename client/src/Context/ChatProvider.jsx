import { createContext, useContext, useState, useEffect,useRef } from 'react'
import axios from 'axios'
import {io} from 'socket.io-client'

// Create context outside the component
const ChatContext = createContext(null)

// Rename component to ChatProvider
const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([])
    const [activeChatUser, setActiveChatUser] = useState({})
    const [activeChatMessages, setActiveChatMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const socketRef = useRef(null)

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
    }, [currentUser]) // Empty dependency array - runs only once on mount

    useEffect(() => {
        if(!currentUser){
            return
        }
        socketRef.current = io('http://localhost:3000',{
           withCredentials: true
        })
        return () => {
            socketRef.current.disconnect()
        }
    }, [currentUser])

    function getActiveChatMessages(user) {
        const chat = chats.filter(chat => chat.sender._id === user._id || chat.recipient._id === user._id)
        setActiveChatMessages(chat)
        setActiveChatUser(user)
        
        return chat
    }

    function sendPrivateMessage(user, message) {
        socketRef.current.emit("private-message", {
            recipientId: user,
            content: message
        })
    }
    if(socketRef.current){
        socketRef.current.on("new-message", (msg) => {
            console.log("New message:", msg);
            // handle new message events
            let message = {
                sender: msg.sender,
                recipient: msg.recipient,
                content: msg.message,
                createdAt: msg.createdAt
            }
        });
    }

    return (
        <ChatContext.Provider value={{ 
            chats, 
            activeChatUser, 
            activeChatMessages, 
            isLoading, 
            getActiveChatMessages,
            setActiveChatUser,
            currentUser,
            setCurrentUser,
            sendPrivateMessage
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => useContext(ChatContext)

export default ChatProvider
