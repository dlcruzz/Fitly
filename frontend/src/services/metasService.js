import api from './api'

export async function getMetas() {
  const { data } = await api.get('/metas')
  return data
}

export async function createMeta(dadosMeta) {
  const { data } = await api.post('/metas', dadosMeta)
  return data
}

export async function updateMeta(id, dadosMeta) {
  const { data } = await api.put(`/metas/${id}`, dadosMeta)
  return data
}

export async function deleteMeta(id) {
  await api.delete(`/metas/${id}`)
}
