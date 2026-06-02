import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Dumbbell,
  CirclePlay,
  TrendingUp,
  Target,
  User,
  Flame,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', Icone: LayoutDashboard },
  { to: '/treinos', label: 'Treinos', Icone: Dumbbell },
  { to: '/execucao', label: 'Execução', Icone: CirclePlay },
  { to: '/evolucao', label: 'Evolução', Icone: TrendingUp },
  { to: '/metas', label: 'Metas', Icone: Target },
  { to: '/perfil', label: 'Perfil', Icone: User },
]

function AppLayout({ children }) {
  const { usuario } = useAuth()
  const nome    = usuario?.nome  ?? 'Usuário'
  const objetivo = ''
  const nivel    = ''
  const streak   = 0
  const [sidebarAberta, setSidebarAberta] = useState(false)

  const iniciais = nome
    .split(' ')
    .map(p => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  function fecharSidebar() {
    setSidebarAberta(false)
  }

  const conteudoSidebar = (
    <>
      {/* Logo + botão fechar mobile */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <span className="text-primary font-bold text-2xl tracking-tight">
          Fitly<span className="text-white">.</span>
        </span>
        <button
          onClick={fecharSidebar}
          className="lg:hidden text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Perfil do usuário */}
      <div className="flex flex-col items-center text-center px-6 py-5">
        <div className="w-16 h-16 rounded-full border-2 border-gray-700 bg-[#1A1A1A] flex items-center justify-center mb-3">
          <span className="text-white font-bold text-lg">{iniciais}</span>
        </div>
        <p className="text-white font-semibold text-sm">{nome}</p>
        {objetivo && nivel && (
          <p className="text-gray-500 text-xs mt-1">{objetivo} · {nivel}</p>
        )}
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3">
        {NAV_ITEMS.map(({ to, label, Icone }) => (
          <NavLink
            key={to}
            to={to}
            onClick={fecharSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/15 text-primary'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
              }`
            }
          >
            <Icone size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Contador de sequência */}
      <div className="px-4 pb-5">
        <button className="w-full flex items-center justify-between bg-[#1A1A1A] rounded-xl px-4 py-3 hover:bg-[#222] transition-colors">
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-primary" />
            <span className="text-white text-sm font-medium">{streak} dias seguidos</span>
          </div>
          <ChevronRight size={16} className="text-gray-500" />
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">

      {/* Overlay mobile */}
      {sidebarAberta && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={fecharSidebar}
        />
      )}

      {/* Sidebar desktop — sempre visível */}
      <aside className="hidden lg:flex w-60 shrink-0 fixed h-full flex-col border-r border-gray-800/60 bg-[#0D0D0D]">
        {conteudoSidebar}
      </aside>

      {/* Sidebar mobile — desliza da esquerda */}
      <aside
        className={`lg:hidden fixed h-full z-40 flex flex-col w-72 border-r border-gray-800/60 bg-[#0D0D0D] transition-transform duration-300 ease-in-out ${
          sidebarAberta ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {conteudoSidebar}
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">

        {/* Topbar mobile */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-gray-800/60 sticky top-0 bg-[#0D0D0D] z-20">
          <span className="text-primary font-bold text-xl tracking-tight">
            Fitly<span className="text-white">.</span>
          </span>
          <button
            onClick={() => setSidebarAberta(true)}
            className="text-white hover:text-primary transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>

        <main className="flex-1 p-5 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  )
}

export default AppLayout
