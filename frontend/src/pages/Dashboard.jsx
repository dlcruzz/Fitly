import { useState, useEffect } from 'react'
import { Play, TrendingUp, Calendar, Dumbbell, Target, X, ChevronUp } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import AppLayout from '../components/layout/AppLayout'

// Mock data — substituir por chamadas à API quando o backend estiver integrado
const USUARIO = {
  nome: 'Danilo Cruz',
  objetivo: 'Hipertrofia',
  nivel: 'Intermediário',
  streak: 12,
}

const TREINO_HOJE = {
  nome: 'Peito e Tríceps',
  exercicios: [
    { id: 1, nome: 'Supino Reto', series: '4x8-12', ultimaCarga: '80kg' },
    { id: 2, nome: 'Supino Inclinado', series: '4x10', ultimaCarga: '60kg' },
    { id: 3, nome: 'Crucifixo', series: '3x12', ultimaCarga: '16kg' },
    { id: 4, nome: 'Tríceps Pulley', series: '4x12', ultimaCarga: '35kg' },
    { id: 5, nome: 'Tríceps Francês', series: '3x12', ultimaCarga: '24kg' },
  ],
}

const FREQUENCIA_SEMANAL = [
  { dia: 'Seg', treinou: true, hoje: false },
  { dia: 'Ter', treinou: true, hoje: false },
  { dia: 'Qua', treinou: false, hoje: false },
  { dia: 'Qui', treinou: true, hoje: false },
  { dia: 'Sex', treinou: true, hoje: false },
  { dia: 'Sab', treinou: false, hoje: false },
  { dia: 'Dom', treinou: false, hoje: true },
]

const METAS = [
  { Icone: Calendar, titulo: '4 treinos esta semana', progresso: 3, total: 4, label: '3 de 4' },
  { Icone: Dumbbell, titulo: '100kg no Supino', progresso: 80, total: 100, label: '80kg / 100kg' },
  { Icone: Target, titulo: '20 treinos em Janeiro', progresso: 18, total: 20, label: '18 de 20' },
]

const RECORDES = [
  { exercicio: 'Supino Reto', carga: '82.5kg', tempo: 'há 3 dias' },
  { exercicio: 'Agachamento', carga: '100kg', tempo: 'há 3 dias' },
  { exercicio: 'Desenvolvimento', carga: '50kg', tempo: 'há 3 dias' },
]

const EVOLUCAO_PESO = [
  { semana: 'Sem 1', peso: 82.5 },
  { semana: 'Sem 2', peso: 82.1 },
  { semana: 'Sem 3', peso: 81.6 },
  { semana: 'Sem 4', peso: 81.0 },
  { semana: 'Sem 5', peso: 80.4 },
  { semana: 'Sem 6', peso: 79.9 },
  { semana: 'Sem 7', peso: 79.3 },
  { semana: 'Hoje', peso: 78.9 },
]

const PROGRESSAO_FORCA = [
  { nome: 'Supino Reto', cargaAtual: '80kg', ganhoKg: '+8.5kg', pct: '+12%' },
  { nome: 'Agachamento', cargaAtual: '100kg', ganhoKg: '+7.5kg', pct: '+8%' },
  { nome: 'Desenvolvimento', cargaAtual: '50kg', ganhoKg: '+6.5kg', pct: '+15%' },
  { nome: 'Remada Curvada', cargaAtual: '70kg', ganhoKg: '+6kg', pct: '+9%' },
]

const SENSACOES = [
  { id: 'excelente', label: 'Excelente' },
  { id: 'bem', label: 'Bem' },
  { id: 'cansado', label: 'Cansado' },
  { id: 'mal', label: 'Mal' },
]

function precisaCheckin() {
  const ultimo = localStorage.getItem('fitly_ultimo_checkin')
  if (!ultimo) return true
  const diasPassados = (Date.now() - Number(ultimo)) / (1000 * 60 * 60 * 24)
  return diasPassados >= 7
}

function TooltipCustom({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1A1A1A] border border-gray-700 rounded-xl px-3 py-2 shadow-lg">
      <p className="text-gray-400 text-xs mb-0.5">{label}</p>
      <p className="text-white text-sm font-bold">{payload[0].value} kg</p>
    </div>
  )
}

function CircularProgress({ value, total, size = 80 }) {
  const strokeWidth = 7
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - value / total)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#1A1A1A" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#F5C518" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="relative z-10 text-white font-extrabold text-base">{value}/{total}</span>
    </div>
  )
}

function Dashboard() {
  const primeiroNome = USUARIO.nome.split(' ')[0]

  const [mostrarBannerCheckin, setMostrarBannerCheckin] = useState(false)
  const [modalCheckinAberto, setModalCheckinAberto] = useState(false)
  const [checkinDados, setCheckinDados] = useState({ peso: '', sensacao: '' })

  useEffect(() => {
    setMostrarBannerCheckin(precisaCheckin())
  }, [])

  function salvarCheckin() {
    if (!checkinDados.peso || !checkinDados.sensacao) return
    localStorage.setItem('fitly_ultimo_checkin', Date.now().toString())
    // TODO: POST /checkins com checkinDados
    setModalCheckinAberto(false)
    setMostrarBannerCheckin(false)
    setCheckinDados({ peso: '', sensacao: '' })
  }

  const variacaoPeso =
    EVOLUCAO_PESO[EVOLUCAO_PESO.length - 1].peso - EVOLUCAO_PESO[0].peso

  return (
    <AppLayout usuario={USUARIO}>

      {/* Banner de check-in semanal */}
      {mostrarBannerCheckin && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161616] border border-primary/40 rounded-2xl px-5 py-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">Hora do check-in semanal</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Registre seu peso para acompanhar sua evolucao corporal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => setModalCheckinAberto(true)}
              className="bg-primary text-[#0D0D0D] font-bold text-sm px-4 py-2 rounded-xl hover:opacity-90 transition-all active:scale-95"
            >
              Fazer check-in
            </button>
            <button
              onClick={() => setMostrarBannerCheckin(false)}
              className="text-gray-600 hover:text-gray-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl">
            Bom dia, {primeiroNome} 👋
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Hoje é dia de {TREINO_HOJE.nome}</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary text-[#0D0D0D] font-bold px-5 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 shrink-0 w-full sm:w-auto">
          <Play size={15} fill="currentColor" />
          Iniciar treino de hoje
        </button>
      </div>

      {/* Cards de stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-4 lg:p-5">
          <p className="text-gray-400 text-xs lg:text-sm mb-2 lg:mb-3">Treinos esse mês</p>
          <p className="text-primary font-extrabold text-3xl lg:text-4xl">18</p>
          <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
            <TrendingUp size={12} />
            vs 14 mês passado
          </p>
        </div>

        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-4 lg:p-5">
          <p className="text-gray-400 text-xs lg:text-sm mb-2 lg:mb-3">Sequência atual</p>
          <p className="text-primary font-extrabold text-3xl lg:text-4xl">12</p>
          <p className="text-gray-500 text-xs mt-2">dias consecutivos 🔥</p>
        </div>

        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-4 lg:p-5">
          <p className="text-gray-400 text-xs lg:text-sm mb-2 lg:mb-3">Meta semanal</p>
          <div className="flex items-center gap-2 lg:gap-3 mt-1">
            <CircularProgress value={3} total={4} size={70} />
            <p className="text-gray-500 text-xs leading-snug">treinos esta semana</p>
          </div>
        </div>

        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-4 lg:p-5">
          <p className="text-gray-400 text-xs lg:text-sm mb-2 lg:mb-3">Carga média</p>
          <p className="text-primary font-extrabold text-3xl lg:text-4xl">+8kg</p>
          <p className="text-gray-500 text-xs mt-2">evolução este mês</p>
        </div>

      </div>

      {/* Linha 1: Treino de hoje + Metas ativas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">

        <div className="lg:col-span-3">
          <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <h2 className="text-white font-bold text-lg">Treino de Hoje</h2>
              <span className="bg-[#2A2A2A] text-primary text-xs font-semibold px-3 py-1 rounded-full border border-gray-700">
                {TREINO_HOJE.nome}
              </span>
            </div>
            <div className="flex flex-col mb-5">
              {TREINO_HOJE.exercicios.map((ex, i) => (
                <div
                  key={ex.id}
                  className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0 gap-2"
                >
                  <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                    <span className="text-gray-600 text-sm w-4 text-center shrink-0">{i + 1}</span>
                    <Dumbbell size={14} className="text-gray-600 shrink-0" />
                    <span className="text-white text-sm font-medium truncate">{ex.nome}</span>
                  </div>
                  <div className="flex items-center gap-3 lg:gap-5 shrink-0">
                    <span className="text-gray-500 text-xs lg:text-sm">{ex.series}</span>
                    <span className="text-gray-400 text-xs lg:text-sm whitespace-nowrap">
                      última: <span className="text-primary font-semibold">{ex.ultimaCarga}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-primary text-[#0D0D0D] font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200">
              Iniciar treino agora
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
            <h2 className="text-white font-bold text-lg mb-5">Metas ativas</h2>
            <div className="flex flex-col gap-5">
              {METAS.map(({ Icone, titulo, progresso, total, label }) => (
                <div key={titulo}>
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icone size={14} className="text-primary shrink-0" />
                      <span className="text-white text-sm truncate">{titulo}</span>
                    </div>
                    <span className="text-gray-500 text-xs shrink-0">{label}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(progresso / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Linha 2: Evolução corporal + Progressão de força */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">

        <div className="lg:col-span-3 bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
          <div className="flex items-start justify-between mb-5 gap-4">
            <div>
              <h2 className="text-white font-bold text-lg">Evolução corporal</h2>
              <p className="text-gray-500 text-xs mt-0.5">Últimas 8 semanas — peso registrado</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-green-400 font-extrabold text-xl flex items-center gap-1 justify-end">
                <ChevronUp size={18} />
                {Math.abs(variacaoPeso).toFixed(1)}kg
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                {variacaoPeso < 0 ? 'perdidos' : 'ganhos'} no período
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={EVOLUCAO_PESO} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
              <XAxis
                dataKey="semana"
                tick={{ fill: '#6B7280', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6B7280', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip
                content={<TooltipCustom />}
                cursor={{ stroke: '#F5C518', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Line
                type="monotone"
                dataKey="peso"
                stroke="#F5C518"
                strokeWidth={2.5}
                dot={{ fill: '#F5C518', r: 3, strokeWidth: 0 }}
                activeDot={{ fill: '#F5C518', r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-4 border-t border-gray-800/50">
            <div>
              <p className="text-gray-500 text-xs">Peso inicial</p>
              <p className="text-white font-semibold text-sm mt-0.5">{EVOLUCAO_PESO[0].peso} kg</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Peso atual</p>
              <p className="text-white font-semibold text-sm mt-0.5">
                {EVOLUCAO_PESO[EVOLUCAO_PESO.length - 1].peso} kg
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Último check-in</p>
              <p className="text-white font-semibold text-sm mt-0.5">há 6 dias</p>
            </div>
            <button
              onClick={() => setModalCheckinAberto(true)}
              className="ml-auto text-primary text-xs font-semibold underline hover:opacity-80 transition-opacity self-end"
            >
              Atualizar peso
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
          <div className="mb-5">
            <h2 className="text-white font-bold text-lg">Progressão de força</h2>
            <p className="text-gray-500 text-xs mt-0.5">Ganhos nos últimos 30 dias</p>
          </div>
          <div className="flex flex-col">
            {PROGRESSAO_FORCA.map(({ nome, cargaAtual, ganhoKg, pct }) => (
              <div
                key={nome}
                className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0 gap-2"
              >
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{nome}</p>
                  <p className="text-gray-500 text-xs mt-0.5">Atual: {cargaAtual}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-green-400 font-bold text-sm">{ganhoKg}</p>
                  <p className="text-green-400/70 text-xs mt-0.5">{pct} este mês</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Linha 3: Frequência semanal + Recordes recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        <div className="lg:col-span-3 bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
          <h2 className="text-white font-bold text-lg mb-5 lg:mb-6">Frequência semanal</h2>
          <div className="flex items-end justify-between gap-1.5" style={{ height: '88px' }}>
            {FREQUENCIA_SEMANAL.map(({ dia, treinou, hoje }) => (
              <div key={dia} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center" style={{ height: '64px' }}>
                  {hoje ? (
                    <div className="w-full rounded-lg border-2 border-primary" style={{ height: '64px' }} />
                  ) : (
                    <div
                      className={`w-full rounded-lg ${treinou ? 'bg-primary' : 'bg-gray-800'}`}
                      style={{ height: treinou ? '64px' : '24px' }}
                    />
                  )}
                </div>
                <span className={`text-xs ${hoje ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  {dia}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
          <h2 className="text-white font-bold text-lg mb-5">Recordes recentes 🏆</h2>
          <div className="flex flex-col gap-4">
            {RECORDES.map(({ exercicio, carga, tempo }) => (
              <div key={exercicio} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-[#0D0D0D] font-extrabold text-xs">PR</span>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {exercicio} — {carga} 🏆
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">{tempo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal de check-in semanal */}
      {modalCheckinAberto && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalCheckinAberto(false)}
          />
          <div className="relative bg-[#161616] border border-gray-800 rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 w-full sm:max-w-md shadow-2xl">

            <button
              onClick={() => setModalCheckinAberto(false)}
              className="absolute top-5 right-5 text-gray-600 hover:text-gray-400 transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-white font-extrabold text-xl mb-1">Check-in semanal</h3>
            <p className="text-gray-500 text-sm mb-6">
              Registrar esses dados nos ajuda a medir sua evolucao real ao longo do tempo.
            </p>

            <div className="mb-5">
              <label className="block text-white text-sm font-medium mb-2">Peso atual</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={checkinDados.peso}
                  onChange={e => setCheckinDados(d => ({ ...d, peso: e.target.value }))}
                  placeholder="Ex.: 79.5"
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all pr-14"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">kg</span>
              </div>
            </div>

            <div className="mb-7">
              <label className="block text-white text-sm font-medium mb-3">
                Como você está se sentindo?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SENSACOES.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCheckinDados(d => ({ ...d, sensacao: id }))}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                      checkinDados.sensacao === id
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={salvarCheckin}
              disabled={!checkinDados.peso || !checkinDados.sensacao}
              className="w-full bg-primary text-[#0D0D0D] font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Salvar check-in
            </button>

          </div>
        </div>
      )}

    </AppLayout>
  )
}

export default Dashboard
