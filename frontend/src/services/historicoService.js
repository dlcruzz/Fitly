import api from './api'

// Busca o histórico de sessões de treino do usuário
export async function getHistorico(pagina = 0, tamanhoPagina = 10) {
  // TODO: implementar GET /historico com paginação
  // TODO: retornar lista de sessões com data, duração e treino realizado
}

// Registra uma sessão de treino concluída
export async function registrarSessao(dadosSessao) {
  // TODO: implementar POST /historico
  // TODO: enviar treinoId, dataInicio, dataFim, seriesRealizadas[]
  // TODO: cada série deve conter exercicioId, series, repeticoes, cargaKg
}

// Busca a evolução de carga de um exercício específico
export async function getEvolucaoCarga(exercicioId, periodo = '30d') {
  // TODO: implementar GET /historico/evolucao?exercicioId=X&periodo=Y
  // TODO: retornar array de { data, cargaMaxima, volumeTotal } para alimentar os gráficos
}

// Busca o resumo de treinos da semana atual
export async function getResumoSemana() {
  // TODO: implementar GET /historico/resumo-semana
  // TODO: retornar contagem de treinos, volume total e frequência semanal
}
