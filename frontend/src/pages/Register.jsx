import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Check } from 'lucide-react'

// ─── constants ────────────────────────────────────────────────────────────────

const BENEFICIOS = [
  'Progressão de carga automática',
  'Dashboard com gráficos reais',
  'Metas semanais e mensais',
]

// ─── helpers ──────────────────────────────────────────────────────────────────

function calcularForcaSenha(senha) {
  if (!senha) return { nivel: 0, label: '' }

  let pontos = 0
  if (senha.length >= 8)           pontos++
  if (/[A-Z]/.test(senha))         pontos++
  if (/[0-9]/.test(senha))         pontos++
  if (/[^A-Za-z0-9]/.test(senha))  pontos++

  const labels = ['', 'Fraca', 'Média', 'Boa', 'Forte']
  return { nivel: pontos, label: labels[pontos] }
}

function corDaForca(nivel) {
  if (nivel <= 1)  return '#EF4444'
  if (nivel === 2) return '#F59E0B'
  if (nivel === 3) return '#84CC16'
  return '#F5C518'
}

// ─── sub-components ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <span style={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.5px' }}>
      <span style={{ color: '#F5C518' }}>Fitly</span>
      <span style={{ color: '#444444' }}>.</span>
    </span>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome:           '',
    email:          '',
    senha:          '',
    confirmarSenha: '',
  })

  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [campoAtivo, setCampoAtivo]     = useState(null)
  const [erros, setErros]               = useState({})

  const { nivel: nivelSenha, label: labelSenha } = calcularForcaSenha(form.senha)

  function handleChange(campo) {
    return (e) => {
      setForm((prev) => ({ ...prev, [campo]: e.target.value }))
      if (erros[campo]) setErros((prev) => ({ ...prev, [campo]: null }))
    }
  }

  function validar() {
    const novosErros = {}

    if (!form.nome.trim())
      novosErros.nome = 'Nome obrigatório'

    if (!form.email.trim())
      novosErros.email = 'E-mail obrigatório'
    else if (!/\S+@\S+\.\S+/.test(form.email))
      novosErros.email = 'E-mail inválido'

    if (!form.senha)
      novosErros.senha = 'Senha obrigatória'
    else if (form.senha.length < 6)
      novosErros.senha = 'Mínimo 6 caracteres'

    if (form.confirmarSenha !== form.senha)
      novosErros.confirmarSenha = 'Senhas não coincidem'

    return novosErros
  }

  function handleSubmit(e) {
    e.preventDefault()
    const novosErros = validar()

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }

    // TODO: authService.register() → redirecionar para /onboarding
    navigate('/onboarding')
  }

  function inputStyle(campo) {
    const borderColor =
      campoAtivo === campo ? '#F5C518' :
      erros[campo]         ? '#EF4444' :
                             '#2C2C2C'

    return {
      width:        '100%',
      background:   '#0D0D0D',
      border:       `1.5px solid ${borderColor}`,
      borderRadius: '10px',
      padding:      '12px 16px',
      color:        '#FFFFFF',
      fontSize:     '0.95rem',
      outline:      'none',
      transition:   'border-color 0.2s',
      boxSizing:    'border-box',
    }
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: '#0D0D0D', fontFamily: 'Inter, system-ui, sans-serif' }}
    >

      {/* ── painel esquerdo — oculto em mobile ───────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col justify-between"
        style={{
          flex:     '0 0 52%',
          position: 'relative',
          padding:  '52px 64px 48px 72px',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position:      'absolute',
          top:           0,
          left:          0,
          width:         '800px',
          height:        '800px',
          background:    'radial-gradient(circle at 0% 0%, rgba(244,192,3,0.22) 0%, transparent 45%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position:      'absolute',
          bottom:        '10%',
          right:         '-60px',
          width:         '280px',
          height:        '280px',
          background:    'radial-gradient(circle, rgba(250,196,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Logo />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.6rem', fontWeight: 800, lineHeight: 1.12, marginBottom: '24px', color: '#FFFFFF' }}>
            Sua evolução<br />
            <span style={{ color: '#F5C518' }}>começa aqui.</span>
          </h1>

          <p style={{ color: '#A3A3A3', fontSize: '1.08rem', lineHeight: 1.75, marginBottom: '12px', maxWidth: '400px' }}>
            Cadastre-se gratuitamente e comece a acompanhar seu progresso hoje mesmo.
          </p>

          <p style={{ color: '#686868', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '36px', maxWidth: '400px' }}>
            Essas são as únicas informações que pedimos. A ideia é que seu treino e
            sua evolução fiquem com você — acessíveis em qualquer dispositivo, a
            qualquer momento.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {BENEFICIOS.map((item) => (
              <li
                key={item}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#E5E5E5', fontSize: '1rem' }}
              >
                <span style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  width:          '20px',
                  height:         '20px',
                  borderRadius:   '50%',
                  background:     'rgba(245,197,24,0.15)',
                  flexShrink:     0,
                }}>
                  <Check size={12} color="#F5C518" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p style={{ position: 'relative', zIndex: 1, color: '#525252', fontSize: '0.88rem', fontStyle: 'italic' }}>
          "Mais de 200 pessoas já pararam de usar planilha."
        </p>
      </aside>

      {/* ── painel direito — formulário ───────────────────────────────────────── */}
      <main
        className="flex flex-col flex-1"
        style={{
          background: '#111111',
          padding:    'clamp(28px, 5vh, 40px) clamp(24px, 6vw, 52px) 28px',
          overflowY:  'auto',
        }}
      >
        {/* logo visível apenas em mobile */}
        <div className="flex lg:hidden justify-center mb-8">
          <Logo />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border:     'none',
              color:      '#A3A3A3',
              fontSize:   '0.9rem',
              cursor:     'pointer',
              padding:    0,
            }}
          >
            Já tenho conta
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '420px', width: '100%', margin: '0 auto' }}>
          <p style={{
            color:         '#525252',
            fontSize:      '0.72rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight:    600,
            marginBottom:  '20px',
            textAlign:     'center',
          }}>
            Criar conta
          </p>

          {/* mensagem de privacidade — visível apenas em mobile */}
          <p className="lg:hidden" style={{
            color:        '#686868',
            fontSize:     '0.85rem',
            lineHeight:   1.65,
            marginBottom: '24px',
            textAlign:    'center',
          }}>
            Essas são as únicas informações que pedimos. A ideia é que seu treino e
            sua evolução fiquem com você — acessíveis em qualquer dispositivo, a
            qualquer momento.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            <div>
              <label style={{ display: 'block', color: '#A3A3A3', fontSize: '0.82rem', marginBottom: '7px' }}>Nome completo</label>
              <input
                type="text"
                placeholder="Nome completo"
                value={form.nome}
                onChange={handleChange('nome')}
                onFocus={() => setCampoAtivo('nome')}
                onBlur={() => setCampoAtivo(null)}
                style={inputStyle('nome')}
                autoComplete="name"
              />
              {erros.nome && (
                <p style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{erros.nome}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', color: '#A3A3A3', fontSize: '0.82rem', marginBottom: '7px' }}>E-mail</label>
              <input
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange('email')}
                onFocus={() => setCampoAtivo('email')}
                onBlur={() => setCampoAtivo(null)}
                style={inputStyle('email')}
                autoComplete="email"
              />
              {erros.email && (
                <p style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{erros.email}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', color: '#A3A3A3', fontSize: '0.82rem', marginBottom: '7px' }}>Senha</label>

              <div style={{ position: 'relative' }}>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Senha"
                  value={form.senha}
                  onChange={handleChange('senha')}
                  onFocus={() => setCampoAtivo('senha')}
                  onBlur={() => setCampoAtivo(null)}
                  style={{ ...inputStyle('senha'), paddingRight: '44px' }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  style={{
                    position:   'absolute',
                    right:      '14px',
                    top:        '50%',
                    transform:  'translateY(-50%)',
                    background: 'none',
                    border:     'none',
                    cursor:     'pointer',
                    color:      '#525252',
                    display:    'flex',
                    alignItems: 'center',
                  }}
                >
                  {mostrarSenha ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {form.senha.length > 0 && (
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flex: 1, height: '3px', background: '#2C2C2C', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width:        `${(nivelSenha / 4) * 100}%`,
                      height:       '100%',
                      background:   corDaForca(nivelSenha),
                      borderRadius: '4px',
                      transition:   'width 0.3s, background 0.3s',
                    }} />
                  </div>
                  <span style={{ color: corDaForca(nivelSenha), fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {labelSenha}
                  </span>
                </div>
              )}

              {erros.senha && (
                <p style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{erros.senha}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', color: '#A3A3A3', fontSize: '0.82rem', marginBottom: '7px' }}>Confirmar senha</label>
              <input
                type="password"
                placeholder="Confirmar senha"
                value={form.confirmarSenha}
                onChange={handleChange('confirmarSenha')}
                onFocus={() => setCampoAtivo('confirmarSenha')}
                onBlur={() => setCampoAtivo(null)}
                style={inputStyle('confirmarSenha')}
                autoComplete="new-password"
              />
              {erros.confirmarSenha && (
                <p style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>{erros.confirmarSenha}</p>
              )}
            </div>

            <button
              type="submit"
              style={{
                width:         '100%',
                padding:       '13px',
                marginTop:     '4px',
                background:    '#F5C518',
                color:         '#0D0D0D',
                border:        'none',
                borderRadius:  '10px',
                fontWeight:    700,
                fontSize:      '0.97rem',
                cursor:        'pointer',
                letterSpacing: '0.2px',
                transition:    'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Criar minha conta
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', background: '#2C2C2C' }} />
              <span style={{ color: '#525252', fontSize: '0.82rem' }}>ou</span>
              <div style={{ flex: 1, height: '1px', background: '#2C2C2C' }} />
            </div>

            <button
              type="button"
              style={{
                width:          '100%',
                padding:        '12px',
                background:     'transparent',
                border:         '1.5px solid #2C2C2C',
                borderRadius:   '10px',
                color:          '#FFFFFF',
                fontSize:       '0.95rem',
                fontWeight:     500,
                cursor:         'pointer',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            '10px',
                transition:     'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#404040')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2C2C2C')}
            >
              <GoogleIcon />
              Entrar com Google
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#525252', fontSize: '0.87rem', marginTop: '22px' }}>
            Já tem uma conta?{' '}
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border:     'none',
                color:      '#F5C518',
                fontWeight: 600,
                cursor:     'pointer',
                padding:    0,
                fontSize:   '0.87rem',
              }}
            >
              Entrar
            </button>
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#404040', fontSize: '0.75rem', marginTop: '16px' }}>
          Ao criar sua conta você concorda com nossos{' '}
          <span style={{ color: '#525252', textDecoration: 'underline', cursor: 'pointer' }}>
            Termos de Uso
          </span>
        </p>
      </main>
    </div>
  )
}

export default Register
