import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function RotaProtegida({ children }) {
  const { autenticado } = useAuth()
  return autenticado ? children : <Navigate to="/login" replace />
}

export function RotaPublica({ children }) {
  const { autenticado } = useAuth()
  return autenticado ? <Navigate to="/dashboard" replace /> : children
}
