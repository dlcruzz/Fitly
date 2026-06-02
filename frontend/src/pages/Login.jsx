import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      await login(email, senha)
      navigate('/dashboard')
    } catch (err) {
      setErro('E-mail ou senha incorretos. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  function handleGoogle() {
    // TODO: implementar OAuth Google
  }

  return (
    <div className="min-h-screen flex">

      {/* Lado esquerdo — formulário */}
      <div className="w-full lg:w-1/2 flex flex-col bg-[#0D0D0D]">

        {/* Navbar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5">
          <span className="text-primary font-bold text-2xl tracking-tight">Fitly<span className="text-white">.</span></span>
          <Link
            to="/cadastro"
            className="border border-white text-white text-sm font-medium px-5 py-2 rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
          >
            Criar conta
          </Link>
        </div>

        {/* Formulário centralizado */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8 py-8">
          <div className="w-full max-w-sm">

            {/* Título */}
            <div className="mb-8 text-center">
              <h1 className="text-white font-bold text-xl tracking-widest uppercase">
                Bem-vindo de volta
              </h1>
              <div className="mt-2 h-[2px] w-16 bg-primary mx-auto" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Campo e-mail */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Ex.: joao@email.com"
                  required
                  className="w-full bg-transparent border border-primary rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all duration-200"
                />
              </div>

              {/* Campo senha */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    placeholder="••••••••••••••••"
                    required
                    className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Erro */}
              {erro && (
                <p className="text-red-400 text-sm text-center">{erro}</p>
              )}

              {/* Esqueci a senha */}
              <div className="text-right">
                <Link
                  to="/recuperar-senha"
                  className="text-sm text-gray-400 underline hover:text-white transition-colors"
                >
                  Esqueci minha senha
                </Link>
              </div>

              {/* Botão entrar */}
              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-primary text-[#0D0D0D] font-bold py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-60"
              >
                {carregando ? 'Entrando...' : 'Entrar'}
              </button>

            </form>

            {/* Separador */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-800" />
              <span className="text-gray-500 text-sm">ou</span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>

            {/* Botão Google */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 border border-gray-700 rounded-xl py-3 text-white font-medium hover:border-gray-500 transition-all duration-200 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Entrar com Google
            </button>

            {/* Link cadastro */}
            <p className="text-center text-gray-500 text-sm mt-6">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="text-primary font-medium hover:underline">
                Criar conta grátis
              </Link>
            </p>

          </div>
        </div>
      </div>

      {/* Lado direito — painel de marketing */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D0D0D] relative overflow-hidden flex-col p-12">

        {/* Glow dourado no canto inferior direito */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 100% 100%, rgba(245,197,24,0.35) 0%, transparent 55%)',
          }}
        />

        {/* Logo topo direito */}
        <div className="relative z-10 flex justify-end">
          <span className="text-primary font-extrabold text-3xl tracking-tight">Fitly<span className="text-white">.</span></span>
        </div>

        {/* Conteúdo central */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <h2 className="text-white font-extrabold text-5xl leading-tight mb-4">
            Seu progresso{' '}
            <span className="text-primary">te espera.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-sm">
            Continue de onde parou. Seus treinos, cargas e metas estão todos aqui.
          </p>

          {/* Cards de stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-gray-800">
              <p className="text-primary font-extrabold text-3xl">847</p>
              <p className="text-gray-400 text-sm mt-1 leading-snug">Treinos registrados</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-gray-800">
              <p className="text-primary font-extrabold text-3xl">23kg</p>
              <p className="text-gray-400 text-sm mt-1 leading-snug">Progressão média de carga</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-gray-800">
              <p className="text-primary font-extrabold text-3xl">91%</p>
              <p className="text-gray-400 text-sm mt-1 leading-snug">Meta de frequência atingida</p>
            </div>
          </div>

          <p className="text-gray-500 text-sm italic">Números reais de usuários do beta.</p>
        </div>

      </div>

    </div>
  )
}

export default Login