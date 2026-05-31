import api from './api'

const TOKEN_KEY = 'fitly_token'
const USUARIO_KEY = 'fitly_usuario'

export async function login(email, senha) {
  const { data } = await api.post('/auth/login', { email, senha })
  localStorage.setItem(TOKEN_KEY, data.token)
  if (data.usuario) {
    localStorage.setItem(USUARIO_KEY, JSON.stringify(data.usuario))
  }
  return data
}

export async function register(dadosUsuario) {
  const { data } = await api.post('/auth/register', dadosUsuario)
  localStorage.setItem(TOKEN_KEY, data.token)
  if (data.usuario) {
    localStorage.setItem(USUARIO_KEY, JSON.stringify(data.usuario))
  }
  return data
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USUARIO_KEY)
}

export async function refreshToken() {
  const { data } = await api.post('/auth/refresh')
  localStorage.setItem(TOKEN_KEY, data.token)
  return data
}

export function estaAutenticado() {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return false
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export function obterToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function obterUsuario() {
  try {
    return JSON.parse(localStorage.getItem(USUARIO_KEY) ?? 'null')
  } catch {
    return null
  }
}
