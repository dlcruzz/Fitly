import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Trophy,
  X,
} from 'lucide-react'

// Mock — substituir por treinoService.getTreinoById(id) quando o backend estiver integrado
const TREINO = {
  id: 1,
  nome: 'Treino A — Peito e Tríceps',
  exercicios: [
    {
      id: 1,
      nome: 'Supino Reto',
      equipamento: 'Barra livre',
      grupo: 'Peito',
      numSeries: 4,
      repsAlvo: '8-12 reps',
      descansoSeg: 60,
      ultimaCarga: 80,
    },
    {
      id: 2,
      nome: 'Supino Inclinado',
      equipamento: 'Halteres',
      grupo: 'Peito',
      numSeries: 4,
      repsAlvo: '4x10',
      descansoSeg: 60,
      ultimaCarga: 60,
    },
    {
      id: 3,
      nome: 'Crucifixo',
      equipamento: 'Halteres',
      grupo: 'Peito',
      numSeries: 4,
      repsAlvo: '3x12',
      descansoSeg: 45,
      ultimaCarga: 14,
    },
    {
      id: 4,
      nome: 'Tríceps Pulley',
      equipamento: 'Cabo',
      grupo: 'Tríceps',
      numSeries: 4,
      repsAlvo: '4x12',
      descansoSeg: 45,
      ultimaCarga: 32,
    },
    {
      id: 5,
      nome: 'Tríceps Francês',
      equipamento: 'Halteres',
      grupo: 'Tríceps',
      numSeries: 3,
      repsAlvo: '3x12',
      descansoSeg: 45,
      ultimaCarga: 22,
    },
  ],
}

function formatarTempo(seg) {
  const h = Math.floor(seg / 3600).toString().padStart(2, '0')
  const m = Math.floor((seg % 3600) / 60).toString().padStart(2, '0')
  const s = (seg % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

function formatarMMSS(seg) {
  const m = Math.floor(seg / 60).toString().padStart(2, '0')
  const s = (seg % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function CircularTimer({ segundosRestantes, totalSegundos }) {
  const size = 120
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = totalSegundos > 0 ? segundosRestantes / totalSegundos : 0
  const offset = circumference * (1 - progress)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#1A1A1A" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={segundosRestantes > 0 ? '#F5C518' : '#374151'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <span className="relative z-10 text-white font-extrabold text-2xl">
        {formatarMMSS(segundosRestantes)}
      </span>
    </div>
  )
}

function ExecucaoTreino() {
  const navigate = useNavigate()
  const totalExercicios = TREINO.exercicios.length

  // Índices
  const [exIdx, setExIdx] = useState(0)

  // Dados de cada série por exercício: dadosSeries[exIdx][serieIdx]
  const [dadosSeries, setDadosSeries] = useState(() =>
    TREINO.exercicios.map(ex =>
      Array.from({ length: ex.numSeries }, () => ({
        carga: String(ex.ultimaCarga),
        reps: '',
        concluida: false,
      }))
    )
  )

  // Série ativa dentro do exercício atual
  const serieAtiva = dadosSeries[exIdx].findIndex(s => !s.concluida)

  // Timer total (conta pra cima)
  const [tempoTotal, setTempoTotal] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTempoTotal(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  // Timer de descanso (conta pra baixo)
  const [timerSeg, setTimerSeg] = useState(0)
  const [timerTotal, setTimerTotal] = useState(0)
  const [timerAtivo, setTimerAtivo] = useState(false)
  useEffect(() => {
    if (!timerAtivo) return
    if (timerSeg <= 0) { setTimerAtivo(false); return }
    const id = setInterval(() => setTimerSeg(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timerAtivo, timerSeg])

  // Observações
  const [observacoes, setObservacoes] = useState('')

  // PR detectado
  const [pr, setPr] = useState(null)

  // Expandido no painel lateral
  const [expandido, setExpandido] = useState(null)

  // Modal de encerrar
  const [modalEncerrar, setModalEncerrar] = useState(false)

  const exercicioAtual = TREINO.exercicios[exIdx]

  function atualizarSerie(campo, valor) {
    setDadosSeries(prev => {
      const novo = prev.map(ex => ex.map(s => ({ ...s })))
      if (serieAtiva >= 0) novo[exIdx][serieAtiva][campo] = valor
      return novo
    })
  }

  function concluirSerie() {
    if (serieAtiva < 0) return
    const cargaAtual = parseFloat(dadosSeries[exIdx][serieAtiva].carga) || 0
    setDadosSeries(prev => {
      const novo = prev.map(ex => ex.map(s => ({ ...s })))
      novo[exIdx][serieAtiva].concluida = true
      return novo
    })
    // Detectar PR
    if (cargaAtual > exercicioAtual.ultimaCarga) {
      setPr({
        nome: exercicioAtual.nome,
        nova: cargaAtual,
        anterior: exercicioAtual.ultimaCarga,
      })
    }
    // Iniciar descanso se ainda há séries
    const temMais = serieAtiva < exercicioAtual.numSeries - 1
    if (temMais) {
      const desc = exercicioAtual.descansoSeg
      setTimerSeg(desc)
      setTimerTotal(desc)
      setTimerAtivo(true)
    }
  }

  function proximoExercicio() {
    if (exIdx < totalExercicios - 1) {
      setExIdx(i => i + 1)
      setTimerAtivo(false)
      setTimerSeg(0)
      setPr(null)
      setObservacoes('')
    }
  }

  function exercicioAnterior() {
    if (exIdx > 0) {
      setExIdx(i => i - 1)
      setTimerAtivo(false)
      setTimerSeg(0)
      setPr(null)
      setObservacoes('')
    }
  }

  function pularDescanso() {
    setTimerAtivo(false)
    setTimerSeg(0)
  }

  function ajustarTimer(delta) {
    setTimerSeg(t => Math.max(0, t + delta))
  }

  function finalizarTreino() {
    // TODO: historicoService.registrarSessao() com dadosSeries
    navigate('/treinos')
  }

  // Estatísticas da sessão
  const seriesConcluidas = dadosSeries.flat().filter(s => s.concluida).length
  const volumeTotal = dadosSeries.flat()
    .filter(s => s.concluida)
    .reduce((acc, s) => acc + (parseFloat(s.carga) || 0) * (parseInt(s.reps) || 0), 0)
  const exerciciosConcluidos = dadosSeries.filter(exSeries =>
    exSeries.every(s => s.concluida)
  ).length
  const tudoConcluido = exerciciosConcluidos === totalExercicios

  // Status de cada exercício para o painel lateral
  function statusExercicio(i) {
    const series = dadosSeries[i]
    if (series.every(s => s.concluida)) return 'concluido'
    if (i === exIdx) return 'andamento'
    return 'pendente'
  }

  function melhorCargaExercicio(i) {
    const series = dadosSeries[i].filter(s => s.concluida && s.carga)
    if (!series.length) return null
    return Math.max(...series.map(s => parseFloat(s.carga) || 0))
  }

  const progressoPct = ((exIdx + 1) / totalExercicios) * 100

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">

      {/* Topbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800/60 gap-3">
        <button
          onClick={() => setModalEncerrar(true)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors shrink-0"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:block text-sm font-medium truncate max-w-[180px]">{TREINO.nome}</span>
        </button>

        {/* Progresso central */}
        <div className="flex flex-col items-center flex-1 min-w-0 max-w-xs">
          <span className="text-gray-300 text-sm font-medium mb-1.5">
            Exercício {exIdx + 1} de {totalExercicios}
          </span>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressoPct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-primary font-extrabold text-lg sm:text-xl font-mono">
            {formatarTempo(tempoTotal)}
          </span>
          <button
            onClick={() => setModalEncerrar(true)}
            className="hidden sm:block border border-red-500 text-red-400 text-sm font-medium px-3 py-1.5 rounded-xl hover:bg-red-500/10 transition-all"
          >
            Encerrar treino
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-1 overflow-hidden">

        {/* Coluna esquerda — exercício ativo */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          {/* Badge + nome */}
          <div className="mb-5">
            <span className="bg-primary text-[#0D0D0D] text-xs font-extrabold px-2.5 py-1 rounded-lg">
              EXERCÍCIO ATUAL
            </span>
            <h2 className="text-white font-extrabold text-3xl sm:text-4xl mt-3 leading-tight">
              {exercicioAtual.nome}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {exercicioAtual.equipamento} · {exercicioAtual.grupo}
            </p>
          </div>

          {/* Tabela de séries */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="text-gray-600 text-xs font-semibold tracking-wider uppercase">
                  <th className="text-left pb-3 w-12">Série</th>
                  <th className="text-left pb-3">Meta</th>
                  <th className="text-left pb-3">Última vez</th>
                  <th className="text-left pb-3">Carga (kg)</th>
                  <th className="text-left pb-3 w-24">Reps</th>
                  <th className="pb-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {dadosSeries[exIdx].map((serie, i) => {
                  const isAtiva = i === serieAtiva
                  const isConcluida = serie.concluida
                  const isPendente = !isConcluida && !isAtiva

                  return (
                    <tr
                      key={i}
                      className={`border-t border-gray-800/50 transition-colors ${
                        isAtiva ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="py-3 pr-3">
                        <span className={`text-sm font-semibold ${isAtiva ? 'text-primary' : 'text-gray-400'}`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-gray-400 text-sm">{exercicioAtual.repsAlvo}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-gray-400 text-sm">{exercicioAtual.ultimaCarga}kg</span>
                      </td>
                      <td className="py-3 pr-3">
                        {isAtiva ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={serie.carga}
                              onChange={e => atualizarSerie('carga', e.target.value)}
                              className="w-20 bg-[#1A1A1A] border border-primary rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none"
                            />
                            <span className="text-gray-500 text-sm">kg</span>
                          </div>
                        ) : isConcluida ? (
                          <span className="text-white text-sm font-medium">{serie.carga}kg</span>
                        ) : (
                          <span className="text-gray-700 text-sm">—</span>
                        )}
                      </td>
                      <td className="py-3 pr-3">
                        {isAtiva ? (
                          <input
                            type="number"
                            value={serie.reps}
                            onChange={e => atualizarSerie('reps', e.target.value)}
                            placeholder="—"
                            className="w-16 bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-primary"
                          />
                        ) : isConcluida ? (
                          <span className="text-white text-sm font-medium">{serie.reps}</span>
                        ) : (
                          <span className="text-gray-700 text-sm">—</span>
                        )}
                      </td>
                      <td className="py-3">
                        {isConcluida ? (
                          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                            <Check size={14} className="text-white" strokeWidth={3} />
                          </div>
                        ) : isAtiva ? (
                          <button
                            onClick={concluirSerie}
                            className="flex items-center gap-1 bg-primary text-[#0D0D0D] text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
                          >
                            <Check size={12} strokeWidth={3} />
                            Concluir
                          </button>
                        ) : (
                          <div className="w-7 h-7 rounded-full border-2 border-gray-700" />
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Timer de descanso */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 p-5 bg-[#161616] border border-gray-800/60 rounded-2xl">
            <CircularTimer segundosRestantes={timerSeg} totalSegundos={timerTotal} />
            <div className="flex flex-col items-center sm:items-start gap-3">
              <p className="text-gray-400 text-sm">
                Descanso recomendado: {exercicioAtual.descansoSeg}s
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => ajustarTimer(-15)}
                  className="border border-gray-700 text-white text-sm font-medium px-4 py-2 rounded-xl hover:border-gray-500 transition-all"
                >
                  -15s
                </button>
                <button
                  onClick={() => ajustarTimer(15)}
                  className="border border-gray-700 text-white text-sm font-medium px-4 py-2 rounded-xl hover:border-gray-500 transition-all"
                >
                  +15s
                </button>
              </div>
              {timerAtivo && (
                <button
                  onClick={pularDescanso}
                  className="text-primary text-sm font-semibold hover:opacity-80 transition-opacity flex items-center gap-1"
                >
                  Pular descanso <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Observações */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm mb-2">Observações desta série</label>
            <textarea
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              placeholder="Ex.: senti leve dor no ombro..."
              rows={3}
              className="w-full bg-[#161616] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-700 text-sm focus:outline-none focus:border-gray-600 resize-none transition-all"
            />
          </div>

          {/* Navegação entre exercícios */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={exercicioAnterior}
              disabled={exIdx === 0}
              className="flex items-center gap-2 border border-gray-700 text-white text-sm font-medium px-4 py-3 rounded-xl hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:block">Exercício anterior</span>
            </button>

            {/* Dots de progresso */}
            <div className="flex items-center gap-2">
              {TREINO.exercicios.map((_, i) => {
                const status = statusExercicio(i)
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-center rounded-full transition-all ${
                      status === 'concluido'
                        ? 'w-7 h-7 bg-green-500'
                        : status === 'andamento'
                        ? 'w-7 h-7 border-2 border-primary bg-primary/20'
                        : 'w-5 h-5 border-2 border-gray-700 bg-transparent'
                    }`}
                  >
                    {status === 'concluido' && <Check size={12} className="text-white" strokeWidth={3} />}
                    {status === 'andamento' && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                )
              })}
            </div>

            <button
              onClick={proximoExercicio}
              disabled={exIdx === totalExercicios - 1}
              className="flex items-center gap-2 bg-primary text-[#0D0D0D] font-bold text-sm px-4 py-3 rounded-xl hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
            >
              <span className="hidden sm:block">Próximo exercício</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* PR card — mobile (aparece abaixo do conteúdo) */}
          {pr && (
            <div className="mt-5 flex items-start gap-3 bg-[#161616] border-l-4 border-primary rounded-2xl p-4 lg:hidden">
              <Trophy size={22} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-primary font-bold text-sm">Novo recorde pessoal!</p>
                <p className="text-white text-sm font-medium mt-0.5">{pr.nome} — {pr.nova}kg</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Seu anterior era {pr.anterior}kg. Evolução de +{(pr.nova - pr.anterior).toFixed(1)}kg
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Coluna direita — progresso (desktop only) */}
        <div className="hidden lg:flex lg:w-80 xl:w-96 shrink-0 flex-col border-l border-gray-800/60 overflow-y-auto p-6 gap-5">

          {/* Lista de exercícios */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Progresso do treino</h3>
            <div className="flex flex-col">
              {TREINO.exercicios.map((ex, i) => {
                const status = statusExercicio(i)
                const melhor = melhorCargaExercicio(i)
                const seriesConcl = dadosSeries[i].filter(s => s.concluida).length

                return (
                  <div key={ex.id} className="flex gap-3">
                    {/* Linha de progresso + número */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                          status === 'concluido'
                            ? 'bg-green-500 text-white'
                            : status === 'andamento'
                            ? 'bg-primary text-[#0D0D0D]'
                            : 'bg-gray-800 text-gray-500'
                        }`}
                      >
                        {status === 'concluido' ? <Check size={13} strokeWidth={3} /> : i + 1}
                      </div>
                      {i < TREINO.exercicios.length - 1 && (
                        <div className={`w-px flex-1 my-1 min-h-[24px] ${
                          status === 'concluido' ? 'bg-green-500/40' : 'bg-gray-800'
                        }`} />
                      )}
                    </div>

                    {/* Info do exercício */}
                    <div className="flex-1 pb-4">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpandido(expandido === i ? null : i)}
                      >
                        <span className={`text-sm font-semibold ${
                          status === 'andamento' ? 'text-white' : 'text-gray-400'
                        }`}>
                          {ex.nome}
                        </span>
                        {expandido === i
                          ? <ChevronUp size={14} className="text-gray-600" />
                          : <ChevronDown size={14} className="text-gray-600" />
                        }
                      </div>
                      <p className={`text-xs mt-0.5 ${
                        status === 'concluido' ? 'text-green-400' :
                        status === 'andamento' ? 'text-primary' : 'text-gray-600'
                      }`}>
                        {status === 'concluido'
                          ? `Concluído · ${seriesConcl} séries${melhor ? ` · melhor: ${melhor}kg` : ''}`
                          : status === 'andamento'
                          ? `Em andamento · série ${seriesConcl + 1}/${ex.numSeries}`
                          : 'Pendente'
                        }
                      </p>

                      {/* Detalhe expandido */}
                      {expandido === i && status !== 'pendente' && (
                        <div className="mt-2 flex flex-col gap-1">
                          {dadosSeries[i].map((s, si) => (
                            <div key={si} className="flex items-center gap-2 text-xs text-gray-500">
                              <span>Série {si + 1}:</span>
                              {s.concluida
                                ? <span className="text-gray-300">{s.carga}kg × {s.reps} reps</span>
                                : <span>—</span>
                              }
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* PR card */}
          {pr && (
            <div className="flex items-start gap-3 bg-[#161616] border-l-4 border-primary rounded-2xl p-4">
              <Trophy size={22} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-primary font-bold text-sm">Novo recorde pessoal!</p>
                <p className="text-white text-sm font-medium mt-0.5">{pr.nome} — {pr.nova}kg</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Seu anterior era {pr.anterior}kg. Evolução de +{(pr.nova - pr.anterior).toFixed(1)}kg
                </p>
              </div>
            </div>
          )}

          {/* Volume da sessão */}
          <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5">
            <h3 className="text-white font-bold text-base mb-4">Volume desta sessão</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-gray-500 text-xs mb-1">Séries concluídas</p>
                <p className="text-white font-extrabold text-2xl">{seriesConcluidas}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Volume total</p>
                <p className="text-primary font-extrabold text-2xl">
                  {volumeTotal >= 1000
                    ? `${(volumeTotal / 1000).toFixed(2).replace('.', ',')}t`
                    : `${volumeTotal}kg`}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Tempo ativo</p>
                <p className="text-primary font-extrabold text-2xl">
                  {Math.floor(tempoTotal / 60)} min
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Barra de status inferior */}
      <div className="border-t border-gray-800/60 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-gray-500 text-xs sm:text-sm">Auto-save ativo</span>
        </div>
        <span className="text-gray-500 text-xs sm:text-sm">
          {exerciciosConcluidos} de {totalExercicios} exercícios concluídos
        </span>
        <button
          onClick={finalizarTreino}
          disabled={!tudoConcluido}
          className={`flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl transition-all ${
            tudoConcluido
              ? 'bg-primary text-[#0D0D0D] hover:opacity-90 active:scale-95'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          Finalizar treino
          {!tudoConcluido && <span className="text-gray-600">🔒</span>}
        </button>
      </div>

      {/* Modal de confirmação — encerrar treino */}
      {modalEncerrar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModalEncerrar(false)} />
          <div className="relative bg-[#161616] border border-gray-800 rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl">
            <button onClick={() => setModalEncerrar(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-400">
              <X size={18} />
            </button>
            <h3 className="text-white font-extrabold text-lg mb-2">Encerrar treino?</h3>
            <p className="text-gray-500 text-sm mb-6">
              O progresso registrado até agora será salvo. Você pode retomar depois.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setModalEncerrar(false)}
                className="flex-1 border border-gray-700 text-white font-medium py-3 rounded-xl hover:border-gray-500 transition-all"
              >
                Continuar
              </button>
              <button
                onClick={finalizarTreino}
                className="flex-1 border border-red-500 text-red-400 font-bold py-3 rounded-xl hover:bg-red-500/10 transition-all"
              >
                Encerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ExecucaoTreino
