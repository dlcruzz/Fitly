import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Flame, Zap, Heart, Star, Award, Trophy, Check } from 'lucide-react'

const TOTAL_ETAPAS = 5

const ETAPAS_CONFIG = [
  { numero: '01', rotulo: 'PERFIL' },
  { numero: '02', rotulo: 'OBJETIVO' },
  { numero: '03', rotulo: 'EXPERIÊNCIA' },
  { numero: '04', rotulo: 'DADOS FÍSICOS' },
  { numero: '05', rotulo: 'FREQUÊNCIA' },
]

const SEXOS = [
  { id: 'masculino', titulo: 'Masculino' },
  { id: 'feminino', titulo: 'Feminino' },
  { id: 'outro', titulo: 'Prefiro não informar' },
]

const OBJETIVOS = [
  { id: 'hipertrofia', Icone: TrendingUp, titulo: 'Hipertrofia', descricao: 'Ganhar massa muscular e volume' },
  { id: 'emagrecimento', Icone: Flame, titulo: 'Emagrecimento', descricao: 'Perder gordura e definir o corpo' },
  { id: 'forca', Icone: Zap, titulo: 'Força', descricao: 'Aumentar cargas e performance' },
  { id: 'condicionamento', Icone: Heart, titulo: 'Condicionamento', descricao: 'Melhorar resistência e saúde' },
]

const NIVEIS = [
  { id: 'iniciante', Icone: Star, titulo: 'Iniciante', descricao: 'Menos de 1 ano treinando' },
  { id: 'intermediario', Icone: Award, titulo: 'Intermediário', descricao: 'Entre 1 e 3 anos treinando' },
  { id: 'avancado', Icone: Trophy, titulo: 'Avançado', descricao: 'Mais de 3 anos treinando' },
]

const FREQUENCIAS = [
  { id: '2-3', titulo: '2 — 3 dias', descricao: 'Começo de jornada' },
  { id: '3-4', titulo: '3 — 4 dias', descricao: 'Rotina consistente' },
  { id: '4-5', titulo: '4 — 5 dias', descricao: 'Alta dedicação' },
  { id: '6+', titulo: '6+ dias', descricao: 'Modo atleta' },
]

function CardOpcao({ selecionado, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-5 border bg-[#1A1A1A] transition-all duration-200 active:scale-[0.98] ${
        selecionado ? 'border-primary' : 'border-gray-800 hover:border-gray-600'
      }`}
    >
      {children}
    </button>
  )
}

function Onboarding() {
  const navigate = useNavigate()
  const [etapa, setEtapa] = useState(1)
  const [dados, setDados] = useState({
    sexo: '',
    objetivo: '',
    nivel: '',
    peso: '',
    altura: '',
    idade: '',
    frequencia: '',
  })

  const config = ETAPAS_CONFIG[etapa - 1]
  const progressoPct = (etapa / TOTAL_ETAPAS) * 100

  function avancar() {
    if (etapa < TOTAL_ETAPAS) {
      setEtapa(e => e + 1)
    } else {
      concluir()
    }
  }

  function voltar() {
    if (etapa > 1) setEtapa(e => e - 1)
  }

  async function concluir() {
    // Dados salvos localmente — endpoint de perfil será adicionado ao backend futuramente
    localStorage.setItem('fitly_perfil', JSON.stringify(dados))
    navigate('/dashboard')
  }

  function podeContinuar() {
    switch (etapa) {
      case 1: return !!dados.sexo
      case 2: return !!dados.objetivo
      case 3: return !!dados.nivel
      case 4: return !!dados.peso && !!dados.altura && !!dados.idade
      case 5: return !!dados.frequencia
      default: return false
    }
  }

  function renderEtapa() {
    switch (etapa) {
      case 1: return renderPerfil()
      case 2: return renderObjetivo()
      case 3: return renderNivel()
      case 4: return renderDadosFisicos()
      case 5: return renderFrequencia()
      default: return null
    }
  }

  function renderPerfil() {
    return (
      <>
        <h2 className="text-white font-extrabold text-4xl sm:text-5xl leading-tight mb-3 text-center">
          Como você se <span className="text-primary">identifica?</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg text-center mb-10 max-w-md mx-auto">
          Usamos essa informação para calcular seus resultados com mais precisão.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
          {SEXOS.map(({ id, titulo }) => (
            <CardOpcao
              key={id}
              selecionado={dados.sexo === id}
              onClick={() => setDados(d => ({ ...d, sexo: id }))}
            >
              <span className="text-white font-semibold text-base">{titulo}</span>
            </CardOpcao>
          ))}
        </div>
      </>
    )
  }

  function renderObjetivo() {
    return (
      <>
        <h2 className="text-white font-extrabold text-4xl sm:text-5xl leading-tight mb-3 text-center">
          O que você quer <span className="text-primary">conquistar?</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg text-center mb-10 max-w-md mx-auto">
          Isso vai nos ajudar a personalizar sua experiência no Fitly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
          {OBJETIVOS.map(({ id, Icone, titulo, descricao }) => (
            <CardOpcao
              key={id}
              selecionado={dados.objetivo === id}
              onClick={() => setDados(d => ({ ...d, objetivo: id }))}
            >
              <Icone size={28} className="text-primary mb-3" />
              <p className="text-white font-bold text-base">{titulo}</p>
              <p className="text-gray-400 text-sm mt-1">{descricao}</p>
            </CardOpcao>
          ))}
        </div>
      </>
    )
  }

  function renderNivel() {
    return (
      <>
        <h2 className="text-white font-extrabold text-4xl sm:text-5xl leading-tight mb-3 text-center">
          Qual é o seu nível de <span className="text-primary">experiência?</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg text-center mb-10 max-w-md mx-auto">
          Isso ajuda a adaptar a intensidade dos seus treinos.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
          {NIVEIS.map(({ id, Icone, titulo, descricao }) => (
            <CardOpcao
              key={id}
              selecionado={dados.nivel === id}
              onClick={() => setDados(d => ({ ...d, nivel: id }))}
            >
              <div className="flex items-center gap-4">
                <Icone size={28} className="text-primary shrink-0" />
                <div>
                  <p className="text-white font-bold text-base">{titulo}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{descricao}</p>
                </div>
              </div>
            </CardOpcao>
          ))}
        </div>
      </>
    )
  }

  function renderDadosFisicos() {
    const campos = [
      { campo: 'peso', label: 'Peso', unidade: 'kg', placeholder: 'Ex.: 75' },
      { campo: 'altura', label: 'Altura', unidade: 'cm', placeholder: 'Ex.: 178' },
      { campo: 'idade', label: 'Idade', unidade: 'anos', placeholder: 'Ex.: 24' },
    ]

    return (
      <>
        <h2 className="text-white font-extrabold text-4xl sm:text-5xl leading-tight mb-3 text-center">
          Nos conte sobre <span className="text-primary">você.</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg text-center mb-10 max-w-md mx-auto">
          Esses dados tornam seu plano ainda mais preciso.
        </p>
        <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
          {campos.map(({ campo, label, unidade, placeholder }) => (
            <div key={campo}>
              <label className="block text-white text-sm font-medium mb-2">{label}</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={dados[campo]}
                  onChange={e => setDados(d => ({ ...d, [campo]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all duration-200 pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  {unidade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  function renderFrequencia() {
    return (
      <>
        <h2 className="text-white font-extrabold text-4xl sm:text-5xl leading-tight mb-3 text-center">
          Quantos dias por semana <span className="text-primary">você treina?</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg text-center mb-10 max-w-md mx-auto">
          Vamos montar sua grade semanal com base nisso.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
          {FREQUENCIAS.map(({ id, titulo, descricao }) => (
            <CardOpcao
              key={id}
              selecionado={dados.frequencia === id}
              onClick={() => setDados(d => ({ ...d, frequencia: id }))}
            >
              <p className="text-primary font-extrabold text-2xl">{titulo}</p>
              <p className="text-gray-400 text-sm mt-1">{descricao}</p>
            </CardOpcao>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col relative overflow-hidden">

      {/* Glow central */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(245,197,24,0.1) 0%, transparent 60%)',
        }}
      />

      {/* Watermark número da etapa */}
      <div
        className="absolute -left-8 top-1/2 -translate-y-1/2 font-extrabold leading-none select-none pointer-events-none"
        style={{ fontSize: '22rem', color: 'rgba(255,255,255,0.03)' }}
      >
        {config.numero}
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5">
        <span className="text-primary font-bold text-2xl tracking-tight">
          Fitly<span className="text-white">.</span>
        </span>
        <span className="text-gray-400 text-sm font-medium">
          Passo {etapa} de {TOTAL_ETAPAS}
        </span>
      </header>

      {/* Barra de progresso */}
      <div className="relative z-10 h-[3px] bg-gray-800">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressoPct}%` }}
        />
      </div>

      {/* Indicadores de etapa */}
      <div className="relative z-10 flex items-center justify-center py-8">
        {Array.from({ length: TOTAL_ETAPAS }, (_, i) => {
          const n = i + 1
          const concluido = n < etapa
          const atual = n === etapa
          return (
            <div key={n} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  concluido
                    ? 'bg-primary border-primary'
                    : atual
                    ? 'border-primary bg-transparent'
                    : 'border-gray-700 bg-transparent'
                }`}
              >
                {concluido && (
                  <Check size={14} className="text-[#0D0D0D]" strokeWidth={3} />
                )}
                {atual && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              {n < TOTAL_ETAPAS && (
                <div
                  className={`h-px w-14 sm:w-20 transition-all duration-300 ${
                    n < etapa ? 'bg-primary' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Conteúdo principal */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 sm:px-10 pb-6 w-full">

        {/* Rótulo da etapa */}
        <div className="mb-6 text-center">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {config.numero} — {config.rotulo}
          </span>
          <div className="mt-2 h-[2px] w-10 bg-primary mx-auto" />
        </div>

        {renderEtapa()}
      </main>

      {/* Rodapé com navegação */}
      <footer className="relative z-10 px-6 sm:px-10 pb-8 pt-4">
        <div className="flex gap-4 w-full max-w-2xl mx-auto">
          {etapa > 1 && (
            <button
              type="button"
              onClick={voltar}
              className="flex-1 border border-gray-700 text-white font-bold py-3.5 rounded-xl hover:border-gray-500 transition-all duration-200 active:scale-95"
            >
              Voltar
            </button>
          )}
          <button
            type="button"
            onClick={avancar}
            disabled={!podeContinuar()}
            className="flex-1 bg-primary text-[#0D0D0D] font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {etapa === TOTAL_ETAPAS ? 'Finalizar' : 'Continuar'}
          </button>
        </div>
        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-gray-500 text-sm underline hover:text-gray-300 transition-colors"
          >
            Pular configuração por agora
          </button>
        </div>
      </footer>

    </div>
  )
}

export default Onboarding
