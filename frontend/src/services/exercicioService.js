import api from './api'

// Busca todos os exercícios disponíveis (catálogo + exercícios do usuário)
export async function getExercicios(filtros = {}) {
  // TODO: implementar GET /exercicios com parâmetros de filtro (grupo muscular, nome)
  // TODO: retornar lista de exercícios paginada
}

// Cria um exercício personalizado para o usuário
export async function createExercicio(dadosExercicio) {
  // TODO: implementar POST /exercicios
  // TODO: enviar nome, grupoMuscular, descricao, equipamento
  // TODO: retornar exercício criado com ID
}

// Atualiza um exercício existente
export async function updateExercicio(id, dadosExercicio) {
  // TODO: implementar PUT /exercicios/:id
  // TODO: apenas exercícios criados pelo próprio usuário podem ser editados
}

// Remove um exercício personalizado
export async function deleteExercicio(id) {
  // TODO: implementar DELETE /exercicios/:id
  // TODO: verificar se o exercício não está vinculado a treinos ativos
}
