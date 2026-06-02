import { createContext, useContext, useState, useEffect } from 'react'
import {
  login as serviceLogin,
  register as serviceRegister,
  logout as serviceLogout,
  obterUsuario,
  estaAutenticado,
} from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => obterUsuario())
  const [autenticado, setAutenticado] = useState(() => estaAutenticado())

  useEffect(() => {
    setAutenticado(estaAutenticado())
    setUsuario(obterUsuario())
  }, [])

  async function login(email, senha) {
    const data = await serviceLogin(email, senha)
    setUsuario(obterUsuario())
    setAutenticado(true)
    return data
  }

  async function register(dadosUsuario) {
    const data = await serviceRegister(dadosUsuario)
    setUsuario(obterUsuario())
    setAutenticado(true)
    return data
  }

  function logout() {
    serviceLogout()
    setUsuario(null)
    setAutenticado(false)
  }

  return (
    <AuthContext.Provider value={{ usuario, autenticado, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return ctx
}
