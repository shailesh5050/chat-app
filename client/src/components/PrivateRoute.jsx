import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        setLoading(true)
        // Using the full URL with the correct port (3000)
        const response = await axios.get("http://localhost:3000/api/user/verify", { 
          withCredentials: true 
        })
        setIsAuthenticated(response.status === 200)
      } catch (error) {
        console.error("Authentication error:", error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  if (loading) {
    return <div className="auth-loading">Verifying authentication...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}   

export default PrivateRoute