// Formata uma data ISO para o padrão brasileiro (DD/MM/AAAA)
export function formatDate(dataIso) {
  // TODO: implementar conversão de data ISO para formato pt-BR
  // Exemplo: "2024-06-15T10:30:00" → "15/06/2024"
}

// Formata uma data com horário para exibição completa
export function formatDateHora(dataIso) {
  // TODO: implementar conversão incluindo horário
  // Exemplo: "2024-06-15T10:30:00" → "15/06/2024 às 10:30"
}

// Formata o valor de carga em kg para exibição padronizada
export function formatCarga(cargaKg) {
  // TODO: implementar formatação de carga
  // Exemplo: 100 → "100 kg" | 0.5 → "500 g"
}

// Formata duração em segundos para formato legível
export function formatDuracao(segundos) {
  // TODO: implementar conversão de segundos para hh:mm:ss ou mm:ss
  // Exemplo: 3661 → "1h 01min" | 150 → "2min 30s"
}

// Calcula o percentual de progresso entre valor atual e alvo
export function calcularProgresso(valorAtual, valorAlvo) {
  // TODO: implementar cálculo do percentual
  // TODO: garantir que o resultado fique entre 0 e 100
  // Exemplo: calcularProgresso(75, 100) → 75
}

// Formata número com separador de milhar no padrão brasileiro
export function formatNumero(numero, casasDecimais = 0) {
  // TODO: implementar formatação numérica pt-BR
  // Exemplo: 1500.5 → "1.500,5"
}

// Retorna a saudação correta baseada no horário atual
export function saudacao() {
  // TODO: retornar "Bom dia", "Boa tarde" ou "Boa noite"
  // conforme a hora atual do sistema
}

// Formata volume total de treino (séries × repetições × carga)
export function formatVolumeTreino(series, repeticoes, cargaKg) {
  // TODO: calcular e formatar volume total
  // Exemplo: 3 séries × 10 reps × 80 kg = 2.400 kg de volume
}
