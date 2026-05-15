import api from './api'

// Busca todos os treinos do usuário autenticado
export async function getTreinos() {
  // TODO: implementar GET /treinos
  // TODO: retornar lista de treinos
}

// Busca um treino específico pelo ID
export async function getTreinoById(id) {
  // TODO: implementar GET /treinos/:id
  // TODO: retornar treino com exercícios associados
}

// Cria um novo treino
export async function createTreino(dadosTreino) {
  // TODO: implementar POST /treinos
  // TODO: enviar nome, descricao, diasSemana, exercicios
  // TODO: retornar treino criado com ID
}

// Atualiza um treino existente
export async function updateTreino(id, dadosTreino) {
  // TODO: implementar PUT /treinos/:id
  // TODO: atualizar campos alterados
  // TODO: retornar treino atualizado
}

// Remove um treino pelo ID
export async function deleteTreino(id) {
  // TODO: implementar DELETE /treinos/:id
  // TODO: confirmar exclusão antes de chamar a API
}
