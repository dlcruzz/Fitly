import { useState, useEffect } from 'react'
import { Target, Trophy, Flame, Plus, Check, X, MoreHorizontal } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import { getMetas, createMeta, deleteMeta } from '../services/metasService'

const TIPOS_META = [
  { id: 'frequencia_semanal', label: 'Frequência semanal' },
  { id: 'frequencia_mensal', label: 'Meta mensal' },
  { id: 'carga', label: 'Meta de carga' },
  { id: 'peso_corporal', label: 'Peso corporal' },
]

const METAS_ATIVAS_INICIAL = [
  {
    id: 1,
    destaque: true,
    titulo: '4 treinos esta semana',
    tipo: 'Meta semanal · Frequência',
    badge: 'EM ANDAMENTO',
    prazo: 'Vence em 5 dias',
    progresso: 3,
    total: 4,
    unidade: 'treinos',
    circular: true,
    iniciada: '20 Jan',
    rodape: { esquerda: 'Iniciada em 20 Jan', direita: 'No caminho certo ✓', direitaCor: 'text-green-400' },
  },
  {
    id: 2,
    destaque: false,
    titulo: '100kg no Supino Reto',
    tipo: 'Meta de carga · Supino Reto',
    badge: 'EM ANDAMENTO',
    prazo: 'Sem prazo definido',
    progresso: 80,
    total: 100,
    unidade: 'kg',
    circular: false,
    labelEsquerda: '80kg atual',
    labelDireita: '100kg',
    subInfo: 'Faltam 20kg para atingir a meta',
    rodape: { esquerda: 'Recorde atual: 82.5kg', direita: '+2.5kg no último treino', direitaCor: 'text-primary' },
  },
  {
    id: 3,
    destaque: false,
    titulo: '20 treinos em Janeiro',
    tipo: 'Meta mensal · Frequência',
    badge: 'EM ANDAMENTO',
    prazo: 'Vence em 11 dias',
    progresso: 18,
    total: 20,
    unidade: 'treinos',
    circular: false,
    labelEsquerda: '18 treinos',
    labelDireita: '20',
    subInfo: 'Faltam apenas 2 treinos!',
    rodape: { esquerda: 'Iniciada em 01 Jan', direita: 'Quase lá! 🎯', direitaCor: 'text-green-400' },
  },
]

const METAS_CONCLUIDAS = [
  {
    id: 10,
    titulo: '3 treinos na semana passada',
    tipo: 'Meta semanal · Frequência',
    rodape: 'Concluída em 19 Jan · 7 dias antes do prazo',
  },
  {
    id: 11,
    titulo: '60kg no Supino Inclinado',
    tipo: 'Meta de carga · Supino Inclinado',
    rodape: 'Concluída em 15 Jan · Novo recorde! 🏆',
  },
]

function CircularProgressMeta({ value, total, size = 140 }) {
  const strokeWidth = 10
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
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-white font-extrabold text-3xl leading-none">{value}/{total}</span>
        <span className="text-gray-500 text-sm mt-1">treinos</span>
      </div>
    </div>
  )
}

function ModalNovaMeta({ onFechar, onSalvar }) {
  const [tipo, setTipo] = useState('')
  const [titulo, setTitulo] = useState('')
  const [alvo, setAlvo] = useState('')
  const [prazo, setPrazo] = useState('')

  function handleSalvar() {
    if (!tipo || !titulo.trim()) return
    onSalvar({ tipo, titulo: titulo.trim(), alvo, prazo })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onFechar} />
      <div className="relative bg-[#161616] border border-gray-800 rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 w-full sm:max-w-md shadow-2xl">

        <button onClick={onFechar} className="absolute top-5 right-5 text-gray-600 hover:text-gray-400 transition-colors">
          <X size={18} />
        </button>

        <h3 className="text-white font-extrabold text-xl mb-1">Nova meta</h3>
        <p className="text-gray-500 text-sm mb-6">Defina um objetivo claro para acompanhar seu progresso.</p>

        <div className="flex flex-col gap-4 mb-7">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Tipo de meta</label>
            <div className="grid grid-cols-2 gap-2">
              {TIPOS_META.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTipo(t.id)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all text-left ${
                    tipo === t.id
                      ? 'border-primary bg-primary/15 text-primary'
                      : 'border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Descrição da meta</label>
            <input
              type="text"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Ex.: 5 treinos esta semana"
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Valor alvo</label>
              <input
                type="number"
                value={alvo}
                onChange={e => setAlvo(e.target.value)}
                placeholder="Ex.: 100"
                className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Prazo (opcional)</label>
              <input
                type="date"
                value={prazo}
                onChange={e => setPrazo(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSalvar}
          disabled={!tipo || !titulo.trim()}
          className="w-full bg-primary text-[#0D0D0D] font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Criar meta
        </button>
      </div>
    </div>
  )
}

function CardMetaAtiva({ meta, onExcluir }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const pct = Math.round((meta.progresso / meta.total) * 100)

  return (
    <div className={`bg-[#161616] rounded-2xl p-5 lg:p-6 border-2 ${
      meta.destaque ? 'border-primary' : 'border-gray-800/60'
    }`}>

      {/* Topo */}
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-primary text-[#0D0D0D] text-xs font-extrabold px-2.5 py-1 rounded-lg">
            {meta.badge}
          </span>
          <span className="text-gray-500 text-sm">{meta.prazo}</span>
        </div>
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuAberto(v => !v)}
            className="text-gray-600 hover:text-gray-400 transition-colors p-1"
          >
            <MoreHorizontal size={18} />
          </button>
          {menuAberto && (
            <div className="absolute right-0 top-8 z-20 bg-[#1E1E1E] border border-gray-700 rounded-xl shadow-xl overflow-hidden w-36">
              <button
                onClick={() => { onExcluir(meta.id); setMenuAberto(false) }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <X size={14} />
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className={`font-extrabold leading-tight mb-1 ${meta.destaque ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'} text-white`}>
        {meta.titulo}
      </h3>
      <p className="text-gray-500 text-sm mb-5">{meta.tipo}</p>

      {/* Progresso circular (meta em destaque) */}
      {meta.circular ? (
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-5">
          <CircularProgressMeta value={meta.progresso} total={meta.total} />
          <div className="flex-1 w-full">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-500">Progresso</span>
              <span className="text-white font-semibold">{pct}%</span>
            </div>
            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-500">{meta.labelEsquerda}</span>
            <span className="text-white font-semibold">{meta.labelDireita}</span>
          </div>
          <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-gray-500 text-sm">{meta.subInfo}</p>
        </div>
      )}

      {/* Rodapé */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 gap-2 flex-wrap">
        <span className="text-gray-500 text-sm">{meta.rodape.esquerda}</span>
        <span className={`text-sm font-medium ${meta.rodape.direitaCor}`}>{meta.rodape.direita}</span>
      </div>
    </div>
  )
}

function CardMetaConcluida({ meta }) {
  return (
    <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3 gap-2">
        <span className="bg-green-500/20 text-green-400 text-xs font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Check size={11} strokeWidth={3} />
          CONCLUÍDA
        </span>
      </div>
      <h3 className="text-gray-300 font-bold text-base mb-4">{meta.titulo}</h3>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-green-500 rounded-full w-full" />
      </div>
      <p className="text-gray-600 text-xs">{meta.rodape}</p>
    </div>
  )
}

function adaptarMeta(m, idx) {
  const valorAtual = m.valorAtual ?? 0
  const valorAlvo  = m.valorAlvo  ?? 100
  const pct        = m.percentualConcluido ?? ((valorAtual / valorAlvo) * 100)
  return {
    id:       m.id,
    destaque: idx === 0,
    titulo:   m.titulo,
    tipo:     TIPOS_META.find(t => t.id === m.tipo)?.label ?? m.tipo,
    badge:    m.status === 'CONCLUIDA' ? 'CONCLUÍDA' : 'EM ANDAMENTO',
    prazo:    m.dataLimite ? `Vence em ${m.dataLimite}` : 'Sem prazo definido',
    progresso: valorAtual,
    total:     valorAlvo,
    unidade:   '',
    circular:  m.tipo === 'frequencia_semanal',
    labelEsquerda: `${valorAtual} atual`,
    labelDireita:  String(valorAlvo),
    subInfo: `Faltam ${Math.max(0, valorAlvo - valorAtual)} para atingir a meta`,
    rodape: { esquerda: m.dataCriacao ? `Iniciada em ${m.dataCriacao.substring(0, 10)}` : '', direita: `${Math.round(pct)}% concluído`, direitaCor: pct >= 80 ? 'text-green-400' : 'text-primary' },
    status: m.status,
  }
}

function Metas() {
  const [metasAtivas, setMetasAtivas]       = useState([])
  const [metasConcluidas, setMetasConcluidas] = useState([])
  const [carregando, setCarregando]         = useState(true)
  const [modalAberto, setModalAberto]       = useState(false)

  useEffect(() => {
    getMetas()
      .then(data => {
        const todas = data ?? []
        const ativas    = todas.filter(m => m.status !== 'CONCLUIDA').map(adaptarMeta)
        const concluidas = todas.filter(m => m.status === 'CONCLUIDA').map((m, i) => ({
          id:    m.id,
          titulo: m.titulo,
          tipo:   TIPOS_META.find(t => t.id === m.tipo)?.label ?? m.tipo,
          rodape: `Concluída em ${m.dataConclusao?.substring(0, 10) ?? '—'}`,
        }))
        setMetasAtivas(ativas)
        setMetasConcluidas(concluidas)
      })
      .catch(() => {})
      .finally(() => setCarregando(false))
  }, [])

  async function handleCriarMeta({ tipo, titulo, alvo, prazo }) {
    try {
      const nova = await createMeta({
        titulo,
        tipo,
        valorAlvo: parseFloat(alvo) || 100,
        dataLimite: prazo || null,
      })
      setMetasAtivas(prev => [...prev, adaptarMeta(nova, 0)])
    } catch { /* silencioso */ }
    setModalAberto(false)
  }

  async function handleExcluir(id) {
    try {
      await deleteMeta(id)
      setMetasAtivas(prev => prev.filter(m => m.id !== id))
    } catch { /* silencioso */ }
  }

  return (
    <AppLayout>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl">Minhas Metas</h1>
          <p className="text-gray-400 text-sm mt-1">
            {metasAtivas.length} metas ativas · {metasConcluidas.length} concluídas
          </p>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="flex items-center justify-center gap-2 bg-primary text-[#0D0D0D] font-bold px-5 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all shrink-0 w-full sm:w-auto"
        >
          <Plus size={18} />
          Nova meta
        </button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-4 lg:p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Target size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Metas ativas</p>
            <p className="text-primary font-extrabold text-2xl leading-none">{metasAtivas.length}</p>
            <p className="text-gray-600 text-xs mt-0.5">em andamento agora</p>
          </div>
        </div>

        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-4 lg:p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
            <Trophy size={18} className="text-green-400" />
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Concluídas</p>
            <p className="text-green-400 font-extrabold text-2xl leading-none">2</p>
            <p className="text-green-400/60 text-xs mt-0.5">este mês</p>
          </div>
        </div>

        <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-4 lg:p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Flame size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Sequência atual</p>
            <p className="text-primary font-extrabold text-2xl leading-none">12</p>
            <p className="text-gray-600 text-xs mt-0.5">dias treinando</p>
          </div>
        </div>
      </div>

      {/* Metas ativas */}
      <div className="mb-8">
        <div className="mb-5">
          <h2 className="text-white font-bold text-xl">Metas ativas</h2>
          <p className="text-gray-500 text-sm mt-0.5">Acompanhe seu progresso em tempo real</p>
        </div>

        {carregando ? (
          <p className="text-gray-500 text-sm text-center py-8">Carregando metas...</p>
        ) : metasAtivas.length === 0 ? (
          <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-10 text-center">
            <Target size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Nenhuma meta ativa</p>
            <p className="text-gray-600 text-sm mt-1">Crie sua primeira meta para começar a acompanhar seu progresso.</p>
            <button
              onClick={() => setModalAberto(true)}
              className="mt-4 bg-primary text-[#0D0D0D] font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm"
            >
              Criar primeira meta
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {metasAtivas.map(meta => (
              <CardMetaAtiva key={meta.id} meta={meta} onExcluir={handleExcluir} />
            ))}
          </div>
        )}
      </div>

      {/* Metas concluídas */}
      <div className="mb-8">
        <div className="mb-5">
          <h2 className="text-white font-bold text-xl">Concluídas</h2>
          <p className="text-gray-500 text-sm mt-0.5">Metas que você já bateu</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metasConcluidas.length === 0 ? (
            <p className="text-gray-600 text-sm col-span-2">Nenhuma meta concluída ainda.</p>
          ) : metasConcluidas.map(meta => (
            <CardMetaConcluida key={meta.id} meta={meta} />
          ))}
        </div>
      </div>

      {/* Banner de criação */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161616] border-l-4 border-primary rounded-2xl px-6 py-5">
        <div>
          <p className="text-white font-bold text-base">Crie uma nova meta</p>
          <p className="text-gray-500 text-sm mt-0.5">
            Defina objetivos claros e acompanhe cada passo da sua jornada
          </p>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="flex items-center gap-2 bg-primary text-[#0D0D0D] font-bold px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shrink-0 w-full sm:w-auto justify-center"
        >
          <Plus size={16} />
          Criar meta
        </button>
      </div>

      {/* Modal de nova meta */}
      {modalAberto && (
        <ModalNovaMeta
          onFechar={() => setModalAberto(false)}
          onSalvar={handleCriarMeta}
        />
      )}

    </AppLayout>
  )
}

export default Metas
