import api from './api'

export async function iniciarSessao(treinoId) {
  const { data } = await api.post('/historico/iniciar', { treinoId })
  return data
}

export async function finalizarSessao(historicoId) {
  const { data } = await api.post(`/historico/finalizar/${historicoId}`)
  return data
}

export async function registrarCarga(dadosCarga) {
  const { data } = await api.post('/historico/carga', dadosCarga)
  return data
}

export async function getHistoricoUsuario() {
  const { data } = await api.get('/historico/usuario')
  return data
}

export async function getEvolucaoCarga(exercicioId) {
  const { data } = await api.get(`/historico/evolucao/${exercicioId}`)
  return data
}
