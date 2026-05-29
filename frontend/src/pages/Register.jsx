import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

// ─── constants ────────────────────────────────────────────────────────────────

const BENEFICIOS = [
  'Progressão de carga automática',
  'Dashboard com gráficos reais',
  'Metas semanais e mensais',
]

// ─── sub-components ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <span style={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.5px' }}>
      <span style={{ color: '#F5C518' }}>Fitly</span>
      <span style={{ color: '#444444' }}>.</span>
    </span>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

function Register() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex"
      style={{ background: '#0D0D0D', fontFamily: 'Inter, system-ui, sans-serif' }}
    >

      {/* ── painel esquerdo ──────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col justify-between"
        style={{
          flex:     '0 0 52%',
          position: 'relative',
          padding:  '52px 64px 48px 72px',
          overflow: 'hidden',
        }}
      >
        {/* gradiente decorativo superior */}
        <div style={{
          position:      'absolute',
          top:           0,
          left:          0,
          width:         '800px',
          height:        '800px',
          background:    'radial-gradient(circle at 0% 0%, rgba(244,192,3,0.22) 0%, transparent 45%)',
          pointerEvents: 'none',
        }} />

        {/* gradiente decorativo inferior */}
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
          padding:    '40px 52px 28px',
          overflowY:  'auto',
        }}
      >
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
            marginBottom:  '28px',
            textAlign:     'center',
          }}>
            Criar conta
          </p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', color: '#A3A3A3', fontSize: '0.82rem', marginBottom: '7px' }}>Nome completo</label>
              <input
                type="text"
                placeholder="Nome completo"
                style={{ width: '100%', background: '#0D0D0D', border: '1.5px solid #2C2C2C', borderRadius: '10px', padding: '12px 16px', color: '#FFFFFF', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                autoComplete="name"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#A3A3A3', fontSize: '0.82rem', marginBottom: '7px' }}>E-mail</label>
              <input
                type="email"
                placeholder="E-mail"
                style={{ width: '100%', background: '#0D0D0D', border: '1.5px solid #2C2C2C', borderRadius: '10px', padding: '12px 16px', color: '#FFFFFF', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                autoComplete="email"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#A3A3A3', fontSize: '0.82rem', marginBottom: '7px' }}>Senha</label>
              <input
                type="password"
                placeholder="Senha"
                style={{ width: '100%', background: '#0D0D0D', border: '1.5px solid #2C2C2C', borderRadius: '10px', padding: '12px 16px', color: '#FFFFFF', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                autoComplete="new-password"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#A3A3A3', fontSize: '0.82rem', marginBottom: '7px' }}>Confirmar senha</label>
              <input
                type="password"
                placeholder="Confirmar senha"
                style={{ width: '100%', background: '#0D0D0D', border: '1.5px solid #2C2C2C', borderRadius: '10px', padding: '12px 16px', color: '#FFFFFF', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                autoComplete="new-password"
              />
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
              }}
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
              }}
            >
              Entrar com Google
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#525252', fontSize: '0.87rem', marginTop: '22px' }}>
            Já tem uma conta?{' '}
            <button
              onClick={() => navigate('/login')}
              style={{ background: 'none', border: 'none', color: '#F5C518', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: '0.87rem' }}
            >
              Entrar
            </button>
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#404040', fontSize: '0.75rem', marginTop: '16px' }}>
          Ao criar sua conta você concorda com nossos{' '}
          <span style={{ color: '#525252', textDecoration: 'underline', cursor: 'pointer' }}>Termos de Uso</span>
        </p>
      </main>
    </div>
  )
}

export default Register
