import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ChatContext from './Context/ChatProvider.jsx'
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <ChatContext>
    <App />
    </ChatContext>
  </StrictMode>,
)
