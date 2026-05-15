import api from './api'

// Busca todas as metas do usuário autenticado
export async function getMetas() {
  // TODO: implementar GET /metas
  // TODO: retornar lista com metas ativas e concluídas
}

// Cria uma nova meta fitness
export async function createMeta(dadosMeta) {
  // TODO: implementar POST /metas
  // TODO: enviar titulo, descricao, tipo (peso/carga/frequencia), valorAlvo, dataLimite
  // TODO: retornar meta criada com ID e progresso inicial 0%
}

// Atualiza uma meta existente (dados ou progresso)
export async function updateMeta(id, dadosMeta) {
  // TODO: implementar PUT /metas/:id
  // TODO: atualizar campos e recalcular progresso percentual
}

// Remove uma meta pelo ID
export async function deleteMeta(id) {
  // TODO: implementar DELETE /metas/:id
}

// Busca o progresso atual de uma meta específica
export async function getProgressoMeta(id) {
  // TODO: implementar GET /metas/:id/progresso
  // TODO: retornar valorAtual, valorAlvo e percentualConcluido
}
