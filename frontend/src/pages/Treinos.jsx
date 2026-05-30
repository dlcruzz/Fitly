import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Calendar, MoreHorizontal, Pencil, Copy, Trash2, X } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'

const USUARIO = {
  nome: 'Danilo Cruz',
  objetivo: 'Hipertrofia',
  nivel: 'Intermediário',
  streak: 12,
}

const FILTROS = ['Todos', 'Peito', 'Costas', 'Pernas', 'Ombro', 'Braços', 'Cardio']

const TREINOS_INICIAIS = [
  {
    id: 1,
    nome: 'Treino A — Peito',
    grupo: 'Peito',
    tag: 'Peito e Tríceps',
    totalExercicios: 5,
    duracaoMin: 60,
    diaSemana: 'Segunda-feira',
    hoje: true,
    exercicios: [
      { nome: 'Supino Reto', series: '4x8-12' },
      { nome: 'Supino Inclinado', series: '4x10' },
      { nome: 'Crucifixo', series: '3x12' },
      { nome: 'Supino Fechado', series: '3x10' },
      { nome: 'Tríceps Pulley', series: '4x12' },
    ],
  },
  {
    id: 2,
    nome: 'Treino B — Costas',
    grupo: 'Costas',
    tag: 'Costas e Bíceps',
    totalExercicios: 6,
    duracaoMin: 70,
    diaSemana: 'Terça-feira',
    hoje: false,
    exercicios: [
      { nome: 'Puxada Frontal', series: '4x10' },
      { nome: 'Remada Curvada', series: '4x8-12' },
      { nome: 'Remada Unilateral', series: '3x12' },
      { nome: 'Pulldown', series: '3x12' },
      { nome: 'Rosca Direta', series: '3x10' },
      { nome: 'Rosca Martelo', series: '3x12' },
    ],
  },
  {
    id: 3,
    nome: 'Treino C — Pernas',
    grupo: 'Pernas',
    tag: 'Pernas',
    totalExercicios: 5,
    duracaoMin: 75,
    diaSemana: 'Quarta-feira',
    hoje: false,
    exercicios: [
      { nome: 'Agachamento Livre', series: '4x8-12' },
      { nome: 'Leg Press', series: '4x12' },
      { nome: 'Cadeira Extensora', series: '3x15' },
      { nome: 'Mesa Flexora', series: '3x12' },
      { nome: 'Panturrilha', series: '4x15' },
    ],
  },
  {
    id: 4,
    nome: 'Treino D — Ombro',
    grupo: 'Ombro',
    tag: 'Ombro e Trapézio',
    totalExercicios: 5,
    duracaoMin: 55,
    diaSemana: 'Quinta-feira',
    hoje: false,
    exercicios: [
      { nome: 'Desenvolvimento', series: '4x10' },
      { nome: 'Elevação Lateral', series: '4x12' },
      { nome: 'Elevação Frontal', series: '3x12' },
      { nome: 'Encolhimento', series: '3x15' },
      { nome: 'Face Pull', series: '3x15' },
    ],
  },
  {
    id: 5,
    nome: 'Treino E — Braços',
    grupo: 'Braços',
    tag: 'Braços',
    totalExercicios: 6,
    duracaoMin: 50,
    diaSemana: 'Sexta-feira',
    hoje: false,
    exercicios: [
      { nome: 'Rosca Direta', series: '4x10' },
      { nome: 'Rosca Martelo', series: '3x12' },
      { nome: 'Tríceps Pulley', series: '4x12' },
      { nome: 'Tríceps Francês', series: '3x12' },
      { nome: 'Rosca Concentrada', series: '3x12' },
      { nome: 'Mergulho', series: '3x10' },
    ],
  },
]

const PREVIEW_MAX = 3

function MenuDropdown({ onEditar, onDuplicar, onExcluir, onFechar }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClickFora(e) {
      if (ref.current && !ref.current.contains(e.target)) onFechar()
    }
    document.addEventListener('mousedown', handleClickFora)
    return () => document.removeEventListener('mousedown', handleClickFora)
  }, [onFechar])

  return (
    <div
      ref={ref}
      className="absolute right-0 top-8 z-20 bg-[#1E1E1E] border border-gray-700 rounded-xl shadow-xl overflow-hidden w-40"
    >
      <button
        onClick={onEditar}
        className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
      >
        <Pencil size={14} />
        Editar
      </button>
      <button
        onClick={onDuplicar}
        className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
      >
        <Copy size={14} />
        Duplicar
      </button>
      <button
        onClick={onExcluir}
        className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
      >
        <Trash2 size={14} />
        Excluir
      </button>
    </div>
  )
}

function ModalNovoTreino({ onFechar, onSalvar }) {
  const [nome, setNome] = useState('')
  const [grupo, setGrupo] = useState('')
  const [diaSemana, setDiaSemana] = useState('')

  const grupos = ['Peito', 'Costas', 'Pernas', 'Ombro', 'Braços', 'Cardio']
  const dias = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']

  function handleSalvar() {
    if (!nome.trim() || !grupo || !diaSemana) return
    onSalvar({ nome: nome.trim(), grupo, diaSemana })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onFechar} />
      <div className="relative bg-[#161616] border border-gray-800 rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 w-full sm:max-w-md shadow-2xl">

        <button
          onClick={onFechar}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-400 transition-colors"
        >
          <X size={18} />
        </button>

        <h3 className="text-white font-extrabold text-xl mb-1">Novo treino</h3>
        <p className="text-gray-500 text-sm mb-6">Preencha as informações para criar seu treino.</p>

        <div className="flex flex-col gap-4 mb-7">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Nome do treino</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex.: Treino F — Cardio"
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Grupo muscular</label>
            <div className="grid grid-cols-3 gap-2">
              {grupos.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrupo(g)}
                  className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                    grupo === g
                      ? 'border-primary bg-primary/15 text-primary'
                      : 'border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Dia da semana</label>
            <select
              value={diaSemana}
              onChange={e => setDiaSemana(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none"
            >
              <option value="" disabled>Selecionar dia</option>
              {dias.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSalvar}
          disabled={!nome.trim() || !grupo || !diaSemana}
          className="w-full bg-primary text-[#0D0D0D] font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Criar treino
        </button>
      </div>
    </div>
  )
}

function CardTreino({ treino, onIniciar, onVerTreino, onEditar, onDuplicar, onExcluir }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const extras = treino.totalExercicios - PREVIEW_MAX

  return (
    <div className={`bg-[#161616] border rounded-2xl p-5 flex flex-col ${
      treino.hoje ? 'border-primary/40' : 'border-gray-800/60'
    }`}>

      {/* Topo do card */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {treino.hoje && (
            <span className="bg-primary text-[#0D0D0D] text-xs font-extrabold px-2.5 py-0.5 rounded-lg">
              HOJE
            </span>
          )}
          <span className="bg-[#2A2A2A] text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700">
            {treino.tag}
          </span>
        </div>
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuAberto(v => !v)}
            className="text-gray-600 hover:text-gray-300 transition-colors p-1"
          >
            <MoreHorizontal size={18} />
          </button>
          {menuAberto && (
            <MenuDropdown
              onEditar={() => { onEditar(treino); setMenuAberto(false) }}
              onDuplicar={() => { onDuplicar(treino); setMenuAberto(false) }}
              onExcluir={() => { onExcluir(treino.id); setMenuAberto(false) }}
              onFechar={() => setMenuAberto(false)}
            />
          )}
        </div>
      </div>

      {/* Nome e info */}
      <h3 className="text-white font-bold text-lg leading-snug mb-0.5">{treino.nome}</h3>
      <p className="text-gray-500 text-sm mb-4">
        {treino.totalExercicios} exercícios · ~{treino.duracaoMin} min
      </p>

      {/* Preview de exercícios */}
      <div className="flex-1 flex flex-col gap-1.5 mb-4">
        {treino.exercicios.slice(0, PREVIEW_MAX).map(ex => (
          <div key={ex.nome} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-gray-300 text-sm truncate">{ex.nome}</span>
            </div>
            <span className="text-gray-600 text-xs shrink-0 ml-2">{ex.series}</span>
          </div>
        ))}
        {extras > 0 && (
          <p className="text-gray-600 text-xs mt-1">e mais {extras} exercício{extras > 1 ? 's' : ''}</p>
        )}
      </div>

      {/* Rodapé */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 gap-3">
        <div className="flex items-center gap-1.5 text-gray-500 text-sm min-w-0">
          <Calendar size={13} className="shrink-0" />
          <span className="truncate">{treino.diaSemana}</span>
        </div>
        {treino.hoje ? (
          <button
            onClick={() => onIniciar(treino.id)}
            className="bg-primary text-[#0D0D0D] font-bold text-sm px-4 py-2 rounded-xl hover:opacity-90 active:scale-95 transition-all shrink-0"
          >
            Iniciar
          </button>
        ) : (
          <button
            onClick={() => onVerTreino(treino.id)}
            className="border border-gray-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:border-gray-400 transition-all shrink-0"
          >
            Ver treino
          </button>
        )}
      </div>
    </div>
  )
}

function Treinos() {
  const navigate = useNavigate()
  const [treinos, setTreinos] = useState(TREINOS_INICIAIS)
  const [filtroAtivo, setFiltroAtivo] = useState('Todos')
  const [modalAberto, setModalAberto] = useState(false)

  const treinosFiltrados = filtroAtivo === 'Todos'
    ? treinos
    : treinos.filter(t => t.grupo === filtroAtivo)

  const totalExercicios = treinos.reduce((acc, t) => acc + t.totalExercicios, 0)
  const volumeSemanal = treinos.reduce((acc, t) => acc + t.duracaoMin, 0)
  const diasSemana = treinos.length

  function handleIniciar(id) {
    navigate(`/treinos/${id}/executar`)
  }

  function handleVerTreino(id) {
    // TODO: navegar para detalhe do treino
  }

  function handleEditar(treino) {
    // TODO: abrir modal de edição com dados do treino
  }

  function handleDuplicar(treino) {
    const novoTreino = {
      ...treino,
      id: Date.now(),
      nome: `${treino.nome} (cópia)`,
      hoje: false,
    }
    setTreinos(prev => [...prev, novoTreino])
  }

  function handleExcluir(id) {
    setTreinos(prev => prev.filter(t => t.id !== id))
  }

  function handleCriarTreino({ nome, grupo, diaSemana }) {
    const novo = {
      id: Date.now(),
      nome,
      grupo,
      tag: grupo,
      totalExercicios: 0,
      duracaoMin: 0,
      diaSemana,
      hoje: false,
      exercicios: [],
    }
    setTreinos(prev => [...prev, novo])
    setModalAberto(false)
  }

  return (
    <AppLayout usuario={USUARIO}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl">Meus Treinos</h1>
          <p className="text-gray-400 text-sm mt-1">
            {treinos.length} treinos cadastrados · {diasSemana} dias por semana
          </p>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="flex items-center justify-center gap-2 bg-primary text-[#0D0D0D] font-bold px-5 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all shrink-0 w-full sm:w-auto"
        >
          <Plus size={18} />
          Novo treino
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {FILTROS.map(f => (
          <button
            key={f}
            onClick={() => setFiltroAtivo(f)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              filtroAtivo === f
                ? 'bg-primary text-[#0D0D0D] border-primary'
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {treinosFiltrados.map(treino => (
          <CardTreino
            key={treino.id}
            treino={treino}
            onIniciar={handleIniciar}
            onVerTreino={handleVerTreino}
            onEditar={handleEditar}
            onDuplicar={handleDuplicar}
            onExcluir={handleExcluir}
          />
        ))}

        {/* Card de adicionar novo treino */}
        <button
          onClick={() => setModalAberto(true)}
          className="border-2 border-dashed border-gray-700 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 min-h-[260px] hover:border-gray-500 hover:bg-gray-800/20 transition-all duration-200 group"
        >
          <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Plus size={24} className="text-primary" />
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-base">Novo treino</p>
            <p className="text-gray-500 text-sm mt-1">Adicionar um novo treino à sua rotina</p>
          </div>
        </button>
      </div>

      {/* Barra de stats */}
      <div className="bg-[#161616] border border-gray-800/60 rounded-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total de exercícios', valor: totalExercicios, cor: 'text-primary' },
            { label: 'Volume semanal', valor: `~${volumeSemanal} min`, cor: 'text-primary' },
            { label: 'Último treino', valor: 'há 1 dia', cor: 'text-primary' },
            { label: 'Treinos este mês', valor: 18, cor: 'text-primary' },
          ].map(({ label, valor, cor }, i, arr) => (
            <div
              key={label}
              className={`p-5 lg:p-6 text-center ${
                i < arr.length - 1
                  ? 'border-b lg:border-b-0 lg:border-r border-gray-800/60 col-span-1'
                  : ''
              } ${i === 1 ? 'border-r border-gray-800/60 lg:border-r' : ''}`}
            >
              <p className="text-gray-500 text-xs sm:text-sm mb-1">{label}</p>
              <p className={`font-extrabold text-2xl sm:text-3xl ${cor}`}>{valor}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de novo treino */}
      {modalAberto && (
        <ModalNovoTreino
          onFechar={() => setModalAberto(false)}
          onSalvar={handleCriarTreino}
        />
      )}

    </AppLayout>
  )
}

export default Treinos
