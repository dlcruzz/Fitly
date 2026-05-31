import { useState, useMemo } from 'react'
import { Trophy, TrendingUp, ChevronDown } from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import AppLayout from '../components/layout/AppLayout'

const USUARIO = {
  nome: 'Danilo Cruz',
  objetivo: 'Hipertrofia',
  nivel: 'Intermediário',
  streak: 12,
}

const PERIODOS = ['7 dias', '30 dias', '3 meses', 'Todo período']

const DADOS_CARGA = {
  'Supino Reto': {
    '7 dias': [
      { data: '23 Jan', carga: 80 },
      { data: '25 Jan', carga: 80 },
      { data: '27 Jan', carga: 82.5 },
      { data: '29 Jan', carga: 82.5 },
    ],
    '30 dias': [
      { data: '01 Jan', carga: 70 },
      { data: '03 Jan', carga: 72.5 },
      { data: '06 Jan', carga: 72.5 },
      { data: '08 Jan', carga: 75 },
      { data: '10 Jan', carga: 75 },
      { data: '13 Jan', carga: 77.5 },
      { data: '15 Jan', carga: 80 },
      { data: '17 Jan', carga: 80 },
      { data: '20 Jan', carga: 80 },
      { data: '22 Jan', carga: 82.5 },
      { data: '24 Jan', carga: 82.5 },
      { data: '27 Jan', carga: 82.5 },
      { data: '29 Jan', carga: 82.5 },
    ],
    '3 meses': [
      { data: '01 Nov', carga: 60 },
      { data: '15 Nov', carga: 62.5 },
      { data: '01 Dez', carga: 65 },
      { data: '08 Dez', carga: 67.5 },
      { data: '16 Dez', carga: 70 },
      { data: '01 Jan', carga: 70 },
      { data: '08 Jan', carga: 75 },
      { data: '15 Jan', carga: 80 },
      { data: '22 Jan', carga: 82.5 },
      { data: '29 Jan', carga: 82.5 },
    ],
    'Todo período': [
      { data: 'Set', carga: 50 },
      { data: 'Out', carga: 55 },
      { data: 'Nov', carga: 62.5 },
      { data: 'Dez', carga: 70 },
      { data: 'Jan', carga: 82.5 },
    ],
  },
  'Agachamento': {
    '7 dias': [
      { data: '23 Jan', carga: 95 },
      { data: '26 Jan', carga: 100 },
      { data: '29 Jan', carga: 100 },
    ],
    '30 dias': [
      { data: '01 Jan', carga: 80 },
      { data: '06 Jan', carga: 82.5 },
      { data: '10 Jan', carga: 85 },
      { data: '14 Jan', carga: 87.5 },
      { data: '18 Jan', carga: 90 },
      { data: '22 Jan', carga: 95 },
      { data: '26 Jan', carga: 100 },
      { data: '29 Jan', carga: 100 },
    ],
    '3 meses': [
      { data: '01 Nov', carga: 65 },
      { data: '15 Nov', carga: 70 },
      { data: '01 Dez', carga: 75 },
      { data: '15 Dez', carga: 80 },
      { data: '01 Jan', carga: 85 },
      { data: '15 Jan', carga: 95 },
      { data: '29 Jan', carga: 100 },
    ],
    'Todo período': [
      { data: 'Set', carga: 50 },
      { data: 'Out', carga: 60 },
      { data: 'Nov', carga: 70 },
      { data: 'Dez', carga: 80 },
      { data: 'Jan', carga: 100 },
    ],
  },
  'Desenvolvimento': {
    '7 dias': [
      { data: '24 Jan', carga: 47.5 },
      { data: '27 Jan', carga: 50 },
      { data: '29 Jan', carga: 50 },
    ],
    '30 dias': [
      { data: '01 Jan', carga: 40 },
      { data: '06 Jan', carga: 42.5 },
      { data: '10 Jan', carga: 42.5 },
      { data: '15 Jan', carga: 45 },
      { data: '20 Jan', carga: 47.5 },
      { data: '24 Jan', carga: 47.5 },
      { data: '27 Jan', carga: 50 },
      { data: '29 Jan', carga: 50 },
    ],
    '3 meses': [
      { data: '01 Nov', carga: 30 },
      { data: '15 Nov', carga: 35 },
      { data: '01 Dez', carga: 37.5 },
      { data: '15 Dez', carga: 40 },
      { data: '01 Jan', carga: 42.5 },
      { data: '15 Jan', carga: 47.5 },
      { data: '29 Jan', carga: 50 },
    ],
    'Todo período': [
      { data: 'Set', carga: 20 },
      { data: 'Out', carga: 27.5 },
      { data: 'Nov', carga: 35 },
      { data: 'Dez', carga: 42.5 },
      { data: 'Jan', carga: 50 },
    ],
  },
}

const EXERCICIOS_DISPONIVEIS = Object.keys(DADOS_CARGA)

const DADOS_FREQUENCIA = [
  { semana: 'Sem 1', treinos: 3 },
  { semana: 'Sem 2', treinos: 4 },
  { semana: 'Sem 3', treinos: 3 },
  { semana: 'Sem 4', treinos: 5 },
  { semana: 'Sem 5', treinos: 4 },
  { semana: 'Sem 6', treinos: 4 },
]

const TOP_EXERCICIOS = [
  { rank: '01', nome: 'Agachamento', grupo: 'Pernas', ganho: '+20kg', valor: 20, max: 20 },
  { rank: '02', nome: 'Supino Reto', grupo: 'Peito', ganho: '+12.5kg', valor: 12.5, max: 20 },
  { rank: '03', nome: 'Desenvolvimento', grupo: 'Ombro', ganho: '+10kg', valor: 10, max: 20 },
  { rank: '04', nome: 'Remada Curvada', grupo: 'Costas', ganho: '+8kg', valor: 8, max: 20 },
  { rank: '05', nome: 'Rosca Direta', grupo: 'Bíceps', ganho: '+6kg', valor: 6, max: 20 },
]

// Gera heatmap de 13 semanas (Nov, Dez, Jan)
const DIAS_TREINO = new Set([
  '2024-11-04','2024-11-05','2024-11-06','2024-11-11','2024-11-12',
  '2024-11-13','2024-11-18','2024-11-19','2024-11-20','2024-11-25',
  '2024-11-26','2024-12-02','2024-12-03','2024-12-04','2024-12-09',
  '2024-12-10','2024-12-11','2024-12-16','2024-12-17','2024-12-18',
  '2024-12-23','2024-12-30','2025-01-06','2025-01-07','2025-01-08',
  '2025-01-09','2025-01-13','2025-01-14','2025-01-15','2025-01-16',
  '2025-01-20','2025-01-21','2025-01-22','2025-01-23','2025-01-27',
  '2025-01-28','2025-01-29',
])

function gerarHeatmap() {
  const inicio = new Date(2024, 10, 4) // começa numa segunda-feira (Nov 4)
  const semanas = []
  for (let s = 0; s < 13; s++) {
    const semana = []
    for (let d = 0; d < 7; d++) {
      const data = new Date(inicio)
      data.setDate(inicio.getDate() + s * 7 + d)
      const iso = data.toISOString().split('T')[0]
      semana.push({
        date: iso,
        treinou: DIAS_TREINO.has(iso),
        mes: data.getMonth(),
      })
    }
    semanas.push(semana)
  }
  return semanas
}

const HEATMAP = gerarHeatmap()

const MESES_LABEL = { 10: 'Nov', 11: 'Dez', 0: 'Jan' }
const DIAS_LABEL = ['Seg', '', 'Qua', '', 'Sex', '', '']

function TooltipCarga({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-white text-sm font-bold">{payload[0].value}kg</p>
      <p className="text-gray-500 text-xs mt-0.5">4 séries</p>
    </div>
  )
}

function TooltipFrequencia({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-white text-sm font-bold">{payload[0].value} treinos</p>
    </div>
  )
}

function SeletorExercicio({ exercicio, onChange }) {
  const [aberto, setAberto] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setAberto(v => !v)}
        className="flex items-center gap-2 bg-[#1A1A1A] border border-gray-700 rounded-xl px-3 py-2 text-white text-sm font-medium hover:border-gray-500 transition-all"
      >
        {exercicio}
        <ChevronDown size={14} className="text-gray-500" />
      </button>
      {aberto && (
        <div className="absolute right-0 top-10 z-10 bg-[#1E1E1E] border border-gray-700 rounded-xl shadow-xl overflow-hidden w-44">
          {EXERCICIOS_DISPONIVEIS.map(ex => (
            <button
              key={ex}
              onClick={() => { onChange(ex); setAberto(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                ex === exercicio
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Evolucao() {
  const [periodo, setPeriodo] = useState('30 dias')
  const [exercicio, setExercicio] = useState('Supino Reto')

  const dadosCarga = DADOS_CARGA[exercicio]?.[periodo] ?? []
  const mediaFrequencia = (
    DADOS_FREQUENCIA.reduce((acc, d) => acc + d.treinos, 0) / DADOS_FREQUENCIA.length
  ).toFixed(1)

  // Rótulos de mês no heatmap
  const labelsMes = useMemo(() => {
    const labels = []
    let mesAtual = null
    HEATMAP.forEach((semana, i) => {
      const mes = semana[0].mes
      if (mes !== mesAtual) {
        labels.push({ idx: i, label: MESES_LABEL[mes] })
        mesAtual = mes
      }
    })
    return labels
  }, [])

  return (
    <AppLayout usuario={USUARIO}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl">Minha Evolução</h1>
          <p className="text-gray-400 text-sm mt-1">Acompanhe sua progressão de carga e frequência</p>
        </div>
        {/* Seletor de período */}
        <div className="flex items-center gap-2 flex-wrap">
          {PERIODOS.map(p => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                periodo === p
                  ? 'bg-primary text-[#0D0D0D] border-primary'
                  : 'text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de recordes pessoais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'RECORDE · SUPINO RETO', valor: '82.5kg', ganho: '+12.5kg desde o início' },
          { label: 'RECORDE · AGACHAMENTO', valor: '100kg', ganho: '+20kg desde o início' },
          { label: 'RECORDE · DESENVOLVIMENTO', valor: '50kg', ganho: '+10kg desde o início' },
        ].map(({ label, valor, ganho }) => (
          <div key={label} className="bg-[#161616] border border-gray-800/60 rounded-2xl p-4 lg:p-5 relative">
            <Trophy size={14} className="text-primary absolute top-4 right-4" />
            <p className="text-gray-500 text-xs font-semibold tracking-wider mb-2 pr-5">{label}</p>
            <p className="text-primary font-extrabold text-3xl lg:text-4xl mb-1">{valor}</p>
            <p className="text-green-400 text-xs flex items-center gap-1">
              <TrendingUp size={11} />
              {ganho}
            </p>
          </div>
        ))}

        {/* Card de frequência com progress bar */}
        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-4 lg:p-5">
          <p className="text-gray-500 text-xs font-semibold tracking-wider mb-2">FREQUÊNCIA DO MÊS</p>
          <p className="text-primary font-extrabold text-3xl lg:text-4xl mb-1">18</p>
          <p className="text-gray-500 text-xs mb-3">treinos em Janeiro</p>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '90%' }} />
          </div>
        </div>
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">

        {/* Progressão de carga (65%) */}
        <div className="lg:col-span-3 bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
          <div className="flex items-start justify-between mb-5 gap-3">
            <div>
              <h2 className="text-white font-bold text-lg">Progressão de Carga</h2>
              <p className="text-gray-500 text-xs mt-0.5">Evolução do peso por exercício</p>
            </div>
            <SeletorExercicio exercicio={exercicio} onChange={setExercicio} />
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dadosCarga} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradCarga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5C518" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
              <XAxis
                dataKey="data"
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 5', 'dataMax + 5']}
                tickFormatter={v => `${v}kg`}
              />
              <Tooltip content={<TooltipCarga />} cursor={{ stroke: '#F5C518', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area
                type="monotone"
                dataKey="carga"
                stroke="#F5C518"
                strokeWidth={2.5}
                fill="url(#gradCarga)"
                dot={{ fill: '#F5C518', r: 3.5, strokeWidth: 0 }}
                activeDot={{ fill: '#F5C518', r: 5.5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Frequência semanal (35%) */}
        <div className="lg:col-span-2 bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
          <div className="mb-5">
            <h2 className="text-white font-bold text-lg">Frequência Semanal</h2>
            <p className="text-gray-500 text-xs mt-0.5">Treinos por semana</p>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DADOS_FREQUENCIA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
              <XAxis
                dataKey="semana"
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6B7280', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 6]}
                ticks={[0, 1, 2, 3, 4, 5, 6]}
              />
              <Tooltip content={<TooltipFrequencia />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <ReferenceLine
                y={parseFloat(mediaFrequencia)}
                stroke="#4B5563"
                strokeDasharray="5 4"
                label={{ value: `Média: ${mediaFrequencia}`, fill: '#6B7280', fontSize: 11, position: 'insideTopRight' }}
              />
              <Bar
                dataKey="treinos"
                fill="#F5C518"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Grid inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Heatmap de atividade */}
        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
          <div className="mb-5">
            <h2 className="text-white font-bold text-lg">Mapa de atividade</h2>
            <p className="text-gray-500 text-xs mt-0.5">Últimos 3 meses</p>
          </div>

          <div className="overflow-x-auto">
            {/* Rótulos de meses */}
            <div className="flex mb-1 ml-8">
              {HEATMAP.map((_, i) => {
                const label = labelsMes.find(l => l.idx === i)
                return (
                  <div key={i} className="flex-1 text-center" style={{ minWidth: 14 }}>
                    {label && (
                      <span className="text-gray-500 text-xs">{label.label}</span>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex gap-0.5">
              {/* Rótulos de dias */}
              <div className="flex flex-col gap-0.5 mr-1.5">
                {DIAS_LABEL.map((d, i) => (
                  <div key={i} className="h-3 flex items-center">
                    <span className="text-gray-600 text-[10px] w-7 text-right">{d}</span>
                  </div>
                ))}
              </div>

              {/* Grid de semanas */}
              {HEATMAP.map((semana, si) => (
                <div key={si} className="flex flex-col gap-0.5">
                  {semana.map((dia, di) => (
                    <div
                      key={di}
                      title={dia.date}
                      className="w-3 h-3 rounded-sm"
                      style={{
                        backgroundColor: dia.treinou
                          ? `rgba(245, 197, 24, ${0.4 + Math.random() * 0.6})`
                          : '#1F1F1F',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legenda */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-gray-600 text-xs">Menos</span>
              {[0.2, 0.4, 0.6, 0.8, 1].map(op => (
                <div
                  key={op}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: `rgba(245, 197, 24, ${op})` }}
                />
              ))}
              <span className="text-gray-600 text-xs">Mais</span>
            </div>
          </div>
        </div>

        {/* Exercícios mais evoluídos */}
        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
          <div className="mb-5">
            <h2 className="text-white font-bold text-lg">Exercícios mais evoluídos</h2>
            <p className="text-gray-500 text-xs mt-0.5">Maior progressão de carga no período</p>
          </div>

          <div className="flex flex-col">
            {TOP_EXERCICIOS.map(({ rank, nome, grupo, ganho, valor, max }, i) => (
              <div
                key={rank}
                className={`py-4 ${i < TOP_EXERCICIOS.length - 1 ? 'border-b border-gray-800/50' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-extrabold text-sm w-6">{rank}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">{nome}</p>
                      <p className="text-gray-500 text-xs">{grupo}</p>
                    </div>
                  </div>
                  <span className="text-green-400 font-bold text-sm">{ganho}</span>
                </div>
                <div className="ml-9 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(valor / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </AppLayout>
  )
}

export default Evolucao
