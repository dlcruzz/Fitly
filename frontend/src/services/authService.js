import api from './api'

// Realiza login e armazena o token JWT no localStorage
export async function login(email, senha) {
  // TODO: implementar chamada POST /auth/login
  // TODO: armazenar token retornado com localStorage.setItem('fitly_token', token)
  // TODO: retornar dados do usuário
}

// Realiza o cadastro de um novo usuário
export async function register(dadosUsuario) {
  // TODO: implementar chamada POST /auth/register
  // TODO: fazer login automático após cadastro bem-sucedido
}

// Remove o token e dados do usuário da sessão
export function logout() {
  // TODO: remover token do localStorage
  // TODO: limpar contexto de autenticação
  // TODO: redirecionar para /login
}

// Renova o token JWT usando o refresh token
export async function refreshToken() {
  // TODO: implementar chamada POST /auth/refresh
  // TODO: atualizar token no localStorage com o novo token retornado
}

// Verifica se o usuário está autenticado
export function estaAutenticado() {
  // TODO: verificar existência e validade do token no localStorage
  return false
}

// Retorna o token atual do localStorage
export function obterToken() {
  return localStorage.getItem('fitly_token')
}
