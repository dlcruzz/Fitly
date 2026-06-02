import api from './api'

export async function getTreinos() {
  const { data } = await api.get('/treinos')
  return data
}

export async function getTreinoById(id) {
  const { data } = await api.get(`/treinos/${id}`)
  return data
}

export async function createTreino(dadosTreino) {
  const { data } = await api.post('/treinos', dadosTreino)
  return data
}

export async function updateTreino(id, dadosTreino) {
  const { data } = await api.put(`/treinos/${id}`, dadosTreino)
  return data
}

export async function deleteTreino(id) {
  await api.delete(`/treinos/${id}`)
}
