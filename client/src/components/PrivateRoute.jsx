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
        const response = await axios.get("/api/user/verify", { withCredentials: true })
        setIsAuthenticated(response.status === 200)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}   

export default PrivateRoute