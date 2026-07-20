import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "../../lib/authStore"

const RequireAuth = () => {
  const location = useLocation()
  const { user, initialized, checkAuth } = useAuthStore()

  useEffect(() => { if (!initialized) checkAuth() }, [initialized, checkAuth])

  if (!initialized) return <div className="min-h-screen bg-background" />
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}

export default RequireAuth
