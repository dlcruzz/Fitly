import axios from 'axios'

// Instância base do Axios apontando para o backend Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requisição — injeta o token JWT no header Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fitly_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (erro) => {
    return Promise.reject(erro)
  }
)

// Interceptor de resposta — trata erros globais (ex: token expirado)
api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    if (erro.response?.status === 401) {
      // Token expirado ou inválido — redirecionar para login
      localStorage.removeItem('fitly_token')
      window.location.href = '/login'
    }
    return Promise.reject(erro)
  }
)

export default api
