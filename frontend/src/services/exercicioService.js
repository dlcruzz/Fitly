import api from './api'

export async function getExerciciosByTreino(treinoId) {
  const { data } = await api.get(`/exercicios/treino/${treinoId}`)
  return data
}

export async function createExercicio(dadosExercicio) {
  const { data } = await api.post('/exercicios', dadosExercicio)
  return data
}

export async function updateExercicio(id, dadosExercicio) {
  const { data } = await api.put(`/exercicios/${id}`, dadosExercicio)
  return data
}

export async function deleteExercicio(id) {
  await api.delete(`/exercicios/${id}`)
}
