import { useState } from 'react'
import { Eye, EyeOff, Check, Download, Trash2 } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'

const USUARIO = {
  nome: 'Danilo Cruz',
  objetivo: 'Hipertrofia',
  nivel: 'Intermediário',
  streak: 12,
}

const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const OBJETIVOS = ['Hipertrofia', 'Emagrecimento', 'Força', 'Condicionamento']
const NIVEIS = ['Iniciante', 'Intermediário', 'Avançado']

function calcularForca(senha) {
  if (!senha) return 0
  let pts = 0
  if (senha.length >= 8) pts++
  if (/[A-Z]/.test(senha)) pts++
  if (/[0-9]/.test(senha)) pts++
  if (/[^A-Za-z0-9]/.test(senha)) pts++
  return pts
}

const FORCA_CONFIG = [
  { label: 'Muito fraca', cor: 'bg-red-500' },
  { label: 'Fraca', cor: 'bg-orange-500' },
  { label: 'Regular', cor: 'bg-yellow-500' },
  { label: 'Forte', cor: 'bg-green-500' },
  { label: 'Muito forte', cor: 'bg-green-400' },
]

function Toggle({ ativo, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!ativo)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
        ativo ? 'bg-primary' : 'bg-gray-700'
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          ativo ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function CampoSenha({ label, value, onChange, placeholder = '••••••••' }) {
  const [visivel, setVisivel] = useState(false)
  return (
    <div>
      <label className="block text-gray-500 text-sm mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={visivel ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-primary transition-all pr-11"
        />
        <button
          type="button"
          onClick={() => setVisivel(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
        >
          {visivel ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  )
}

function Perfil() {
  // Dados pessoais
  const [dados, setDados] = useState({
    nome: 'Danilo Cruz',
    nascimento: '15/03/2004',
    email: 'danilo@email.com',
    telefone: '(11) 99999-9999',
    objetivo: 'Hipertrofia',
    nivel: 'Intermediário',
  })

  // Senha
  const [senha, setSenha] = useState({ atual: '', nova: '', confirmar: '' })
  const forca = calcularForca(senha.nova)
  const forcaConfig = FORCA_CONFIG[forca] ?? FORCA_CONFIG[0]

  // Preferências
  const [diasAtivos, setDiasAtivos] = useState(new Set(['Seg', 'Ter', 'Qua', 'Qui']))
  const [descanso, setDescanso] = useState(60)
  const [unidadePeso, setUnidadePeso] = useState('kg')

  // Notificações
  const [notificacoes, setNotificacoes] = useState({
    lembreTreino: true,
    novosPRs: true,
    metasVencendo: true,
    resumoSemanal: false,
  })

  function toggleDia(dia) {
    setDiasAtivos(prev => {
      const novo = new Set(prev)
      novo.has(dia) ? novo.delete(dia) : novo.add(dia)
      return novo
    })
  }

  function toggleNotif(chave) {
    setNotificacoes(prev => ({ ...prev, [chave]: !prev[chave] }))
  }

  function handleSalvar() {
    // TODO: PUT /perfil com dados
    alert('Alterações salvas! (mock)')
  }

  return (
    <AppLayout usuario={USUARIO}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl">Meu Perfil</h1>
          <p className="text-gray-400 text-sm mt-1">Gerencie seus dados e preferências</p>
        </div>
        <button
          onClick={handleSalvar}
          className="flex items-center justify-center gap-2 bg-primary text-[#0D0D0D] font-bold px-5 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all shrink-0 w-full sm:w-auto"
        >
          Salvar alterações
        </button>
      </div>

      {/* Card de cabeçalho do perfil */}
      <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 lg:gap-8">

          {/* Avatar */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[#0D0D0D] font-extrabold text-3xl">DC</span>
            </div>
            <button className="text-white text-xs font-medium border border-gray-700 px-3 py-1.5 rounded-lg hover:border-gray-500 transition-all">
              Alterar foto
            </button>
          </div>

          {/* Info central */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-white font-extrabold text-2xl">{dados.nome}</h2>
            <p className="text-gray-500 text-sm mt-0.5 mb-3">{dados.email}</p>
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className="bg-primary text-[#0D0D0D] text-xs font-extrabold px-2.5 py-1 rounded-lg">
                {dados.nivel}
              </span>
              <span className="bg-[#2A2A2A] text-gray-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-700">
                {dados.objetivo}
              </span>
              <span className="bg-[#2A2A2A] text-gray-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-700">
                Membro desde Jan 2024
              </span>
            </div>
          </div>

          {/* Stats de vida na plataforma */}
          <div className="flex items-center gap-0 shrink-0 border border-gray-800/60 rounded-2xl overflow-hidden">
            {[
              { valor: '47', label: 'Treinos totais' },
              { valor: '12', label: 'Dias seguidos' },
              { valor: '3 meses', label: 'Na plataforma' },
            ].map(({ valor, label }, i, arr) => (
              <div
                key={label}
                className={`px-5 py-4 text-center ${i < arr.length - 1 ? 'border-r border-gray-800/60' : ''}`}
              >
                <p className="text-primary font-extrabold text-2xl leading-none">{valor}</p>
                <p className="text-gray-500 text-xs mt-1 whitespace-nowrap">{label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Coluna esquerda */}
        <div className="lg:col-span-3 flex flex-col gap-5">

          {/* Dados pessoais */}
          <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
            <h2 className="text-white font-bold text-lg mb-5">Dados pessoais</h2>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-sm mb-1.5">Nome completo</label>
                  <input
                    type="text"
                    value={dados.nome}
                    onChange={e => setDados(d => ({ ...d, nome: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1.5">Data de nascimento</label>
                  <input
                    type="text"
                    value={dados.nascimento}
                    onChange={e => setDados(d => ({ ...d, nascimento: e.target.value }))}
                    placeholder="DD/MM/AAAA"
                    className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-sm mb-1.5">E-mail</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={dados.email}
                      onChange={e => setDados(d => ({ ...d, email: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all pr-28"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-400">
                      <Check size={13} strokeWidth={3} />
                      <span className="text-xs font-medium">Verificado</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1.5">Telefone</label>
                  <input
                    type="tel"
                    value={dados.telefone}
                    onChange={e => setDados(d => ({ ...d, telefone: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-sm mb-1.5">Objetivo</label>
                  <select
                    value={dados.objetivo}
                    onChange={e => setDados(d => ({ ...d, objetivo: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none"
                  >
                    {OBJETIVOS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1.5">Nível</label>
                  <select
                    value={dados.nivel}
                    onChange={e => setDados(d => ({ ...d, nivel: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none"
                  >
                    {NIVEIS.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Alterar senha */}
          <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
            <h2 className="text-white font-bold text-lg mb-5">Alterar senha</h2>
            <div className="flex flex-col gap-4">
              <CampoSenha
                label="Senha atual"
                value={senha.atual}
                onChange={v => setSenha(s => ({ ...s, atual: v }))}
              />
              <div>
                <CampoSenha
                  label="Nova senha"
                  value={senha.nova}
                  onChange={v => setSenha(s => ({ ...s, nova: v }))}
                  placeholder="Mínimo 8 caracteres"
                />
                {senha.nova && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map(i => (
                        <div
                          key={i}
                          className={`flex-1 h-1 rounded-full transition-all ${
                            i <= forca ? forcaConfig.cor : 'bg-gray-800'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${forcaConfig.cor.replace('bg-', 'text-')}`}>
                      {forcaConfig.label}
                    </p>
                  </div>
                )}
              </div>
              <CampoSenha
                label="Confirmar nova senha"
                value={senha.confirmar}
                onChange={v => setSenha(s => ({ ...s, confirmar: v }))}
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                disabled={!senha.atual || !senha.nova || senha.nova !== senha.confirmar}
                className="bg-primary text-[#0D0D0D] font-bold px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                Atualizar senha
              </button>
            </div>
          </div>

        </div>

        {/* Coluna direita */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Preferências de treino */}
          <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
            <h2 className="text-white font-bold text-lg mb-5">Preferências de treino</h2>

            {/* Dias de treino */}
            <div className="mb-6">
              <label className="block text-gray-500 text-sm mb-3">Dias de treino</label>
              <div className="flex flex-wrap gap-2">
                {DIAS_SEMANA.map(dia => (
                  <button
                    key={dia}
                    type="button"
                    onClick={() => toggleDia(dia)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      diasAtivos.has(dia)
                        ? 'bg-primary text-[#0D0D0D] border-primary'
                        : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {dia}
                  </button>
                ))}
              </div>
            </div>

            {/* Descanso padrão */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-500 text-sm">Descanso padrão entre séries</label>
                <span className="text-primary font-bold text-sm">{descanso}s</span>
              </div>
              <input
                type="range"
                min={30}
                max={120}
                step={15}
                value={descanso}
                onChange={e => setDescanso(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>30s</span>
                <span>60s</span>
                <span>90s</span>
                <span>120s</span>
              </div>
            </div>

            {/* Unidade de peso */}
            <div>
              <label className="block text-gray-500 text-sm mb-3">Unidade de peso</label>
              <div className="flex items-center gap-1 bg-[#1A1A1A] border border-gray-800 rounded-xl p-1 w-fit">
                {['kg', 'lb'].map(u => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnidadePeso(u)}
                    className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                      unidadePeso === u
                        ? 'bg-primary text-[#0D0D0D]'
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="bg-[#161616] border border-gray-800/60 rounded-2xl p-5 lg:p-6">
            <h2 className="text-white font-bold text-lg mb-5">Notificações</h2>
            <div className="flex flex-col gap-0">
              {[
                { chave: 'lembreTreino', label: 'Lembrete de treino diário', desc: 'Aviso para não perder o treino do dia' },
                { chave: 'novosPRs', label: 'Novos recordes pessoais', desc: 'Celebre cada PR conquistado' },
                { chave: 'metasVencendo', label: 'Metas próximas do vencimento', desc: 'Alerta antes de vencer o prazo' },
                { chave: 'resumoSemanal', label: 'Resumo semanal', desc: 'Relatório dos seus treinos da semana' },
              ].map(({ chave, label, desc }, i, arr) => (
                <div
                  key={chave}
                  className={`flex items-center justify-between gap-4 py-4 ${
                    i < arr.length - 1 ? 'border-b border-gray-800/50' : ''
                  }`}
                >
                  <div>
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{desc}</p>
                  </div>
                  <Toggle ativo={notificacoes[chave]} onChange={() => toggleNotif(chave)} />
                </div>
              ))}
            </div>
          </div>

          {/* Zona de perigo */}
          <div className="bg-[#161616] border border-red-900/40 rounded-2xl p-5 lg:p-6">
            <h2 className="text-red-500 font-bold text-lg mb-5">Zona de perigo</h2>
            <div className="flex flex-col gap-0">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-800/50">
                <div>
                  <p className="text-white text-sm font-medium">Exportar meus dados</p>
                  <p className="text-gray-600 text-xs mt-0.5">Baixe todo seu histórico em formato JSON</p>
                </div>
                <button className="flex items-center gap-1.5 border border-gray-600 text-gray-400 text-xs font-medium px-3 py-2 rounded-xl hover:border-gray-400 hover:text-white transition-all shrink-0">
                  <Download size={13} />
                  Exportar
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 pt-4">
                <div>
                  <p className="text-white text-sm font-medium">Excluir minha conta</p>
                  <p className="text-gray-600 text-xs mt-0.5">Esta ação é permanente e não pode ser desfeita</p>
                </div>
                <button className="flex items-center gap-1.5 border border-red-700 text-red-500 text-xs font-medium px-3 py-2 rounded-xl hover:bg-red-500/10 transition-all shrink-0">
                  <Trash2 size={13} />
                  Excluir conta
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </AppLayout>
  )
}

export default Perfil
