// React — sempre o primeiro import
import { useEffect, useRef, useState } from 'react'

// Roteamento
import { useNavigate } from 'react-router-dom'

// Imagem de fundo do hero
import imgFundoHero from '../assets/images/ChatGPT Image 18 de mai. de 2026, 00_30_40.png'


// ─────────────────────────────────────────────────────────────────────────────
// Constantes de conteúdo
// Declaradas fora do componente para não recriar a cada render
// ─────────────────────────────────────────────────────────────────────────────

const BADGES_TECNOLOGIA = [
  { id: 'react',  rotulo: 'React'       },
  { id: 'spring', rotulo: 'Spring Boot' },
  { id: 'oracle', rotulo: 'Oracle SQL'  },
]

const PASSOS_JORNADA = [
  {
    numero:    '01',
    titulo:    'Crie sua conta',
    descricao: 'Email e senha. Menos de 30 segundos.',
  },
  {
    numero:    '02',
    titulo:    'Defina seus objetivos',
    descricao: 'Hipertrofia, força ou condicionamento — você decide.',
  },
  {
    numero:    '03',
    titulo:    'Monte seus treinos',
    descricao: 'Organize por grupo muscular e dia da semana.',
  },
  {
    numero:    '04',
    titulo:    'Execute e registre',
    descricao: 'Cada carga, cada série, em tempo real.',
  },
  {
    numero:    '05',
    titulo:    'Acompanhe a evolução',
    descricao: 'Gráficos reais de progressão de carga.',
  },
  {
    numero:    '06',
    titulo:    'Bata suas metas',
    descricao: 'Acompanhamento automático semana a semana.',
  },
]

const DIFERENCIAIS = [
  {
    codigo:    '01',
    titulo:    'Progressão inteligente de carga',
    descricao:
      'Veja o que você levantou na última sessão ' +
      'e decida quanto avançar com dados reais.',
  },
  {
    codigo:    '02',
    titulo:    'Dashboard com dados reais',
    descricao:
      'Gráficos de frequência, volume e evolução ' +
      'de cada exercício — seus dados, não estimativas.',
  },
  {
    codigo:    '03',
    titulo:    'Metas com streak tracking',
    descricao:
      'Defina metas semanais e veja sua sequência ' +
      'de dias treinados. Simples e motivador.',
  },
]


// ─────────────────────────────────────────────────────────────────────────────
// Estilos globais
// Tudo que Tailwind não resolve: cursor, keyframes, pseudo-elementos
// ─────────────────────────────────────────────────────────────────────────────

const ESTILOS_GLOBAIS = `

  /* ── Reset necessário para o cursor customizado ─── */
  *, *::before, *::after {
    box-sizing: border-box;
    cursor: none !important;
  }

  html { scroll-behavior: smooth; }

  body {
    background:  #0D0D0D;
    color:       #FFFFFF;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    overflow-x:  hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track  { background: #0D0D0D; }
  ::-webkit-scrollbar-thumb  {
    background:    #2A2A35;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(245, 197, 24, 0.4);
  }


  /* ── Cursor ──────────────────────────────────────── */

  .cursor-anel {
    position:      fixed;
    border:        1.5px solid rgba(245, 197, 24, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index:       99999;
    transform:     translate(-50%, -50%);
    /* transição só no tamanho — posição via JS */
    transition:    width 0.15s, height 0.15s;
  }

  .cursor-ponto {
    position:      fixed;
    width:         4px;
    height:        4px;
    background:    #F5C518;
    border-radius: 50%;
    pointer-events: none;
    z-index:       99999;
    transform:     translate(-50%, -50%);
  }


  /* ── Barra de progresso de scroll ──────────────── */

  .barra-progresso {
    position:   fixed;
    top: 0; left: 0;
    height:     2px;
    background: #F5C518;
    z-index:    9999;
    box-shadow: 0 0 8px rgba(245, 197, 24, 0.5);
    transition: width 0.1s linear;
  }


  /* ── Navegação ───────────────────────────────────── */

  .nav-flutuante {
    position:    fixed;
    top:         16px;
    left:        50%;
    transform:   translateX(-50%);
    z-index:     1000;
    background:  rgba(13, 13, 13, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border:        1px solid #2A2A35;
    border-radius: 100px;
    padding:       10px 24px;
    display:       flex;
    align-items:   center;
    gap:           36px;
    white-space:   nowrap;
  }

  .nav-link {
    color:           #A0A0B0;
    text-decoration: none;
    font-size:       0.875rem;
    font-weight:     500;
    transition:      color 0.2s;
  }
  .nav-link:hover { color: #FFFFFF; }


  /* ── Botões ──────────────────────────────────────── */

  /* 6px de radius — parece sério, não playground */
  .btn-primario {
    display:       inline-flex;
    align-items:   center;
    gap:           8px;
    background:    #F5C518;
    color:         #0D0D0D;
    font-weight:   700;
    font-size:     0.95rem;
    padding:       13px 28px;
    border-radius: 6px;
    border:        none;
    transition:    transform 0.2s ease, box-shadow 0.2s ease;
  }
  .btn-primario:hover {
    /* sobe 2px com sombra amarela — não só muda cor */
    transform:  translateY(-2px);
    box-shadow: 0 8px 25px rgba(245, 197, 24, 0.3);
  }
  .btn-primario:active {
    transform:  translateY(0);
    box-shadow: none;
  }

  .btn-secundario {
    display:       inline-flex;
    align-items:   center;
    gap:           8px;
    background:    transparent;
    color:         #FFFFFF;
    font-weight:   500;
    font-size:     0.95rem;
    padding:       13px 28px;
    border-radius: 6px;
    border:        1px solid #2A2A35;
    transition:    border-color 0.2s ease, transform 0.2s ease;
  }
  .btn-secundario:hover {
    border-color: rgba(245, 197, 24, 0.45);
    transform:    translateY(-2px);
  }


  /* ── Hero: headline linha por linha ─────────────────
     Cada linha aparece de baixo com stagger de 200ms.
     Wrapper com overflow:hidden esconde o translateY.  */

  .headline-linha-wrapper {
    display:    block;
    overflow:   hidden;
    /* padding evita corte nos descenders */
    padding-bottom: 4px;
  }

  @keyframes revelarLinha {
    from {
      transform: translateY(108%);
      opacity:   0;
    }
    to {
      transform: translateY(0%);
      opacity:   1;
    }
  }

  .headline-linha {
    display:         block;
    transform:       translateY(108%);
    opacity:         0;
    /* animation-delay injetado inline por linha */
    animation:
      revelarLinha 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }


  /* ── Elemento visual hero: anel girando devagar ─── */
  @keyframes girarDevagar {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .anel-orbital {
    animation:      girarDevagar 30s linear infinite;
    transform-origin: center;
  }

  .anel-orbital-inverso {
    animation:      girarDevagar 20s linear infinite reverse;
    transform-origin: center;
  }


  /* ── Reveal genérico ao scroll ───────────────────── */

  .revelar {
    opacity:    0;
    transform:  translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .revelar-esq {
    opacity:    0;
    transform:  translateX(-32px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .revelar-dir {
    opacity:    0;
    transform:  translateX(32px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .revelar.visivel,
  .revelar-esq.visivel,
  .revelar-dir.visivel {
    opacity:   1;
    transform: translate(0);
  }


  /* ── Steps da jornada ────────────────────────────── */

  .step-revelar {
    opacity:    0;
    transform:  translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .step-revelar.visivel {
    opacity:   1;
    transform: translateY(0);
  }


  /* ── Badge de status com ponto piscando ─────────── */

  @keyframes piscar {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  .ponto-status {
    animation: piscar 2s ease-in-out infinite;
  }


  /* ── Separador entre seções ──────────────────────── */

  .separador-secao {
    height:     1px;
    background: #2A2A35;
    max-width:  1140px;
    margin:     0 auto;
  }


  /* ── Responsivo ──────────────────────────────────── */

  @media (max-width: 900px) {
    .nav-links-desktop { display: none !important; }
  }

  @media (max-width: 768px) {
    .hero-split        { flex-direction: column !important; }
    .hero-visual-lado  { display: none !important; }
    .porque-split      { flex-direction: column !important; }
    .cta-split         { flex-direction: column !important; gap: 24px !important; }
    .jornada-grid      { grid-template-columns: 1fr !important; }
  }
`


// ─────────────────────────────────────────────────────────────────────────────
// ElementoVisualHero
// Composição CSS/SVG de um halter estilizado com geometria agressiva.
// Sem imagem real — feito 100% com shapes e gradientes.
// ─────────────────────────────────────────────────────────────────────────────

function ElementoVisualHero() {

  // grade de pontos de fundo — dá textura sem poluir
  const gradePontos = Array.from({ length: 8 }, (_, linha) =>
    Array.from({ length: 7 }, (_, col) => ({
      id: `${linha}-${col}`,
      cx: 60 + col * 52,
      cy: 80 + linha * 52,
    }))
  ).flat()

  // glow radial — cria sensação de luz vindo de trás do halter
  const fundoGlow = (
    <div style={{
      position:      'absolute',
      inset:         0,
      background:
        'radial-gradient(' +
        'ellipse 75% 80% at 52% 50%, ' +
        'rgba(245, 197, 24, 0.18) 0%, ' +
        'transparent 68%)',
      pointerEvents: 'none',
    }} />
  )

  const svgComposicao = (
    <svg
      viewBox="0 0 440 480"
      style={{
        width:    '90%',
        maxWidth: 440,
        position: 'relative',
        zIndex:   1,
      }}
      aria-hidden="true"
    >
      <defs>

        {/* Gradiente da barra do halter */}
        <linearGradient
          id="gradBarra"
          x1="0%" y1="0%"
          x2="100%" y2="0%"
        >
          <stop offset="0%"   stopColor="#111116" />
          <stop offset="35%"  stopColor="#F5C518" stopOpacity="0.9" />
          <stop offset="65%"  stopColor="#F5C518" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#111116" />
        </linearGradient>

        {/* Glow desfocado atrás de tudo */}
        <radialGradient id="gradGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"
            stopColor="#F5C518"
            stopOpacity="0.22"
          />
          <stop offset="100%"
            stopColor="#F5C518"
            stopOpacity="0"
          />
        </radialGradient>

        <filter
          id="desfoque"
          x="-30%" y="-30%"
          width="160%" height="160%"
        >
          <feGaussianBlur stdDeviation="14" />
        </filter>

      </defs>

      {/* Halo difuso atrás da composição */}
      <ellipse
        cx="220" cy="240"
        rx="190" ry="200"
        fill="url(#gradGlow)"
        filter="url(#desfoque)"
      />

      {/* Grade de pontos — textura de fundo */}
      {gradePontos.map(({ id, cx, cy }) => (
        <circle
          key={id}
          cx={cx} cy={cy}
          r="1.2"
          fill="#2A2A35"
        />
      ))}

      {/* Hexágono externo girando — moldura dinâmica */}
      <polygon
        points="220,28 368,112 368,280 220,364 72,280 72,112"
        fill="none"
        stroke="#F5C518"
        strokeWidth="0.8"
        strokeOpacity="0.22"
        className="anel-orbital"
        style={{ transformOrigin: '220px 196px' }}
      />

      {/* Losango médio girando no sentido inverso */}
      <polygon
        points="220,110 308,200 220,290 132,200"
        fill="none"
        stroke="#F5C518"
        strokeWidth="1"
        strokeOpacity="0.35"
        className="anel-orbital-inverso"
        style={{ transformOrigin: '220px 200px' }}
      />

      {/* Losango interno preenchido escuro — profundidade */}
      <polygon
        points="220,148 272,200 220,252 168,200"
        fill="#0D0D0D"
        stroke="#F5C518"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />

      {/* ─ Halter ─────────────────────────────────── */}

      {/* Barra principal */}
      <rect
        x="52" y="218"
        width="336" height="8"
        rx="4"
        fill="url(#gradBarra)"
      />

      {/* Placa grande — esquerda */}
      <rect
        x="64" y="188"
        width="22" height="68"
        rx="4"
        fill="#111116"
        stroke="#F5C518"
        strokeWidth="1.5"
      />

      {/* Placa pequena — extremo esquerdo */}
      <rect
        x="44" y="200"
        width="22" height="44"
        rx="3"
        fill="#0D0D0D"
        stroke="#F5C518"
        strokeWidth="1"
        strokeOpacity="0.7"
      />

      {/* Placa grande — direita */}
      <rect
        x="354" y="188"
        width="22" height="68"
        rx="4"
        fill="#111116"
        stroke="#F5C518"
        strokeWidth="1.5"
      />

      {/* Placa pequena — extremo direito */}
      <rect
        x="374" y="200"
        width="22" height="44"
        rx="3"
        fill="#0D0D0D"
        stroke="#F5C518"
        strokeWidth="1"
        strokeOpacity="0.7"
      />

      {/* Ponto central de equilíbrio */}
      <circle
        cx="220" cy="222"
        r="7"
        fill="#F5C518"
        fillOpacity="0.9"
      />
      <circle
        cx="220" cy="222"
        r="14"
        fill="none"
        stroke="#F5C518"
        strokeWidth="1"
        strokeOpacity="0.35"
      />

      {/* Linhas de velocidade — tensão visual */}
      <line x1="130" y1="172"
        x2="178" y2="172"
        stroke="#F5C518"
        strokeWidth="1"
        strokeOpacity="0.28"
      />
      <line x1="126" y1="182"
        x2="168" y2="182"
        stroke="#F5C518"
        strokeWidth="0.8"
        strokeOpacity="0.18"
      />
      <line x1="262" y1="172"
        x2="310" y2="172"
        stroke="#F5C518"
        strokeWidth="1"
        strokeOpacity="0.28"
      />
      <line x1="272" y1="182"
        x2="314" y2="182"
        stroke="#F5C518"
        strokeWidth="0.8"
        strokeOpacity="0.18"
      />

      {/* Marca d'água do produto */}
      <text
        x="220" y="420"
        textAnchor="middle"
        fill="#F5C518"
        fillOpacity="0.07"
        fontSize="56"
        fontWeight="900"
        letterSpacing="14"
        fontFamily="Inter, sans-serif"
      >
        FITLY
      </text>

    </svg>
  )

  return (
    <div style={{
      position:       'relative',
      width:          '100%',
      height:         '100%',
      minHeight:      480,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
    }}>
      {fundoGlow}
      {svgComposicao}
    </div>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// HeroSection
// Split screen: 55% texto / 45% visual.
// Headline animada linha por linha com stagger CSS de 200ms.
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {

  const navigate = useNavigate()

  const irParaCadastro = () => navigate('/cadastro')

  const rolarParaJornada = () => {
    document
      .getElementById('jornada')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const badgeEntrada = (
    <div
      className="revelar"
      style={{ marginBottom: 28 }}
    >
      <span style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           6,
        padding:       '4px 12px',
        borderRadius:  100,
        border:        '1px solid rgba(245, 197, 24, 0.3)',
        background:    'rgba(245, 197, 24, 0.05)',
        color:         'rgba(245, 197, 24, 0.85)',
        fontSize:      '0.72rem',
        fontWeight:    600,
        letterSpacing: '0.05em',
      }}>
        Beta gratuito · Sem cartão
      </span>
    </div>
  )

  // Cada linha do headline tem animationDelay crescente de 200ms
  const linhasHeadline = [
    { texto: 'Chega de planilha.',   cor: '#FFFFFF', atraso: '0.1s' },
    { texto: 'Seu treino merece',    cor: '#F5C518', atraso: '0.3s' },
    { texto: 'tecnologia.',          cor: '#FFFFFF', atraso: '0.5s' },
  ]

  const headline = (
    <h1 style={{
      // headline maior — agora tem toda a largura para respirar
      fontSize:       'clamp(3rem, 8vw, 7rem)',
      fontWeight:     900,
      lineHeight:     1.08,
      letterSpacing:  '-0.03em',
      marginBottom:   24,
    }}>
      {linhasHeadline.map(({ texto, cor, atraso }) => (
        <span
          key={texto}
          className="headline-linha-wrapper"
        >
          <span
            className="headline-linha"
            style={{
              color:          cor,
              animationDelay: atraso,
            }}
          >
            {texto}
          </span>
        </span>
      ))}
    </h1>
  )

  const subtitulo = (
    <p
      className="revelar"
      data-atraso="0.7"
      style={{
        fontSize:    'clamp(1rem, 1.8vw, 1.1rem)',
        color:       '#A0A0B0',
        lineHeight:  1.78,
        maxWidth:    500,
        marginBottom: 36,
      }}
    >
      O Fitly transforma sua rotina de academia
      em dados, progresso e resultado real.
    </p>
  )

  // Badges de stack — igual ao vpldev, pequenos e discretos
  const stackTecnologias = (
    <div
      className="revelar"
      data-atraso="0.8"
      style={{ marginBottom: 40 }}
    >
      <span style={{
        fontSize:       '0.68rem',
        fontWeight:     700,
        color:          '#3A3A45',
        letterSpacing:  '0.1em',
        textTransform:  'uppercase',
        marginRight:    12,
      }}>
        Feito com
      </span>
      {BADGES_TECNOLOGIA.map(({ id, rotulo }) => (
        <span
          key={id}
          style={{
            display:       'inline-block',
            padding:       '3px 10px',
            background:    '#111116',
            border:        '1px solid #2A2A35',
            borderRadius:  4,
            fontSize:      '0.72rem',
            fontWeight:    500,
            color:         '#A0A0B0',
            marginRight:   6,
            marginBottom:  4,
          }}
        >
          {rotulo}
        </span>
      ))}
    </div>
  )

  const botoesCta = (
    <div
      className="revelar"
      data-atraso="0.9"
      style={{
        display:        'flex',
        gap:            14,
        flexWrap:       'wrap',
        justifyContent: 'center',
      }}
    >
      <button
        className="btn-primario"
        onClick={irParaCadastro}
      >
        Começar agora →
      </button>

      <button
        className="btn-secundario"
        onClick={rolarParaJornada}
      >
        Ver como funciona
      </button>
    </div>
  )

  return (
    <section style={{
      position:  'relative',
      minHeight: '100vh',
      overflow:  'hidden',
    }}>

      {/* Imagem de fundo com opacidade reduzida — mantém estética escura */}
      <img
        src={imgFundoHero}
        alt=""
        aria-hidden="true"
        style={{
          position:       'absolute',
          inset:          0,
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center',
          opacity:        0.3,
          pointerEvents:  'none',
        }}
      />

      {/* Overlay escuro sobre a imagem — preserva legibilidade */}
      <div style={{
        position:      'absolute',
        inset:         0,
        background:    'rgba(13, 13, 13, 0.55)',
        pointerEvents: 'none',
      }} />

      {/* Gradiente radial vindo de baixo — foco de energia */}
      <div style={{
        position:      'absolute',
        bottom:        '-20%',
        left:          '-5%',
        width:         '70%',
        height:        '80%',
        background:
          'radial-gradient(' +
          'ellipse 80% 70% at 30% 80%, ' +
          'rgba(245, 197, 24, 0.07) 0%, ' +
          'transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Conteúdo full-width com margem lateral mínima */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        minHeight:      '100vh',
      }}>
        <div style={{
          width:          '100%',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          textAlign:      'center',
          padding:        '120px clamp(24px, 5vw, 72px)',
        }}>

          {headline}
          {subtitulo}
          {botoesCta}

        </div>
      </div>

    </section>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// PorQueSection
// Visual CSS fullscreen à esquerda, card escuro à direita.
// Inspirado no "Sobre" do vpldev mas com identidade fitness.
// ─────────────────────────────────────────────────────────────────────────────

function PorQueSection() {

  // Padrão de pontos — textura de academia sem imagem real
  const texturaDeFundo = (
    <div style={{
      position: 'absolute',
      inset:    0,
      backgroundImage:
        'radial-gradient(' +
        'circle, #2A2A35 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      opacity:        0.55,
    }} />
  )

  // Glow radial central — o "foco de luz" da seção
  const glowCentral = (
    <div style={{
      position:  'absolute',
      top:       '50%',
      left:      '50%',
      transform: 'translate(-50%, -50%)',
      width:     500,
      height:    500,
      background:
        'radial-gradient(' +
        'circle, ' +
        'rgba(245, 197, 24, 0.1) 0%, ' +
        'transparent 65%)',
      borderRadius:  '50%',
      pointerEvents: 'none',
    }} />
  )

  // Linhas diagonais — referência às barras e grades de academia
  const linhasDiagonais = (
    <>
      <div style={{
        position:   'absolute',
        top:        '25%',
        left:       '5%',
        width:      '45%',
        height:     1,
        background: 'linear-gradient(' +
          '90deg, ' +
          'transparent, ' +
          'rgba(245, 197, 24, 0.25), ' +
          'transparent)',
        transform:  'rotate(-28deg)',
      }} />
      <div style={{
        position:   'absolute',
        bottom:     '30%',
        right:      '8%',
        width:      '35%',
        height:     1,
        background: 'linear-gradient(' +
          '90deg, ' +
          'transparent, ' +
          'rgba(245, 197, 24, 0.2), ' +
          'transparent)',
        transform:  'rotate(-28deg)',
      }} />
    </>
  )

  // Card escuro com o conteúdo textual
  const cardConteudo = (
    <div
      className="revelar-dir"
      style={{
        background:   '#111116',
        border:       '1px solid #2A2A35',
        borderRadius: 16,
        padding:      'clamp(32px, 5vw, 56px)',
        position:     'relative',
        zIndex:       1,
      }}
    >

      {/* "PORQUE FITLY EXISTE" — título em dois tons */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontSize:      'clamp(2rem, 3.5vw, 2.8rem)',
          fontWeight:    900,
          letterSpacing: '-0.02em',
          color:         '#F5C518',
          lineHeight:    1,
        }}>
          PORQUE
        </div>
        <div style={{
          fontSize:      'clamp(2rem, 3.5vw, 2.8rem)',
          fontWeight:    900,
          letterSpacing: '-0.02em',
          color:         '#FFFFFF',
          lineHeight:    1.1,
        }}>
          FITLY EXISTE
        </div>
      </div>

      {/* Linha divisória amarela curta */}
      <div style={{
        width:        40,
        height:       3,
        background:   '#F5C518',
        borderRadius: 2,
        marginBottom: 24,
      }} />

      <p style={{
        color:        '#A0A0B0',
        lineHeight:   1.82,
        fontSize:     '0.975rem',
        marginBottom: 20,
      }}>
        Criado porque planilha não motiva ninguém.
        Cadernos se perdem, apps genéricos não focam
        em progressão real. O Fitly foi construído
        para mudar isso.
      </p>

      {/* Frase de impacto em itálico */}
      <p style={{
        fontStyle:    'italic',
        color:        'rgba(245, 197, 24, 0.6)',
        fontSize:     '0.9rem',
        marginBottom: 28,
        letterSpacing: '0.02em',
      }}>
        "Centralizar. Automatizar. Evoluir."
      </p>


    </div>
  )

  return (
    <section
      id="por-que"
      style={{ padding: '0' }}
    >

      <div
        className="porque-split"
        style={{ display: 'flex', minHeight: 560 }}
      >

        {/* ── Lado esquerdo — imagem com bordas arredondadas ── */}
        <div style={{
          flex:       '0 0 60%',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding:    'clamp(24px, 4vw, 56px)',
        }}>
          <img
            src={imgFundoHero}
            alt="Fitly — treino com tecnologia"
            style={{
              width:        '100%',
              height:       '100%',
              maxHeight:    480,
              objectFit:    'cover',
              objectPosition: 'center',
              borderRadius: 20,
              display:      'block',
            }}
          />
        </div>

        {/* ── Lado direito — card de conteúdo (40%) ── */}
        <div style={{
          flex:           1,
          display:        'flex',
          alignItems:     'center',
          padding:        'clamp(40px, 5vw, 72px)',
          background:     '#0D0D0D',
        }}>
          {cardConteudo}
        </div>

      </div>

    </section>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// JornadaSection
// Vertical timeline com 6 passos.
// Número decorativo gigante em #1A1A1A atrás de cada passo.
// IntersectionObserver com stagger de 150ms entre passos.
// ─────────────────────────────────────────────────────────────────────────────

function JornadaSection() {

  // IntersectionObserver específico desta seção
  useEffect(() => {

    const itens = document.querySelectorAll('.step-revelar')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return

          const indice   = parseInt(target.dataset.indice || 0)
          // stagger de 150ms — intencional, não genérico
          const atrasoMs = indice * 150

          setTimeout(
            () => target.classList.add('visivel'),
            atrasoMs,
          )

          observer.unobserve(target)
        })
      },
      { threshold: 0.15 },
    )

    itens.forEach((el) => observer.observe(el))

    return () => observer.disconnect()

  }, [])

  // Ícone SVG simples para cada passo
  const iconesPasso = [
    // 01 — conta
    <svg key="01" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#F5C518" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>,
    // 02 — objetivos
    <svg key="02" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#F5C518" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>,
    // 03 — treinos
    <svg key="03" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#F5C518" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>,
    // 04 — registrar
    <svg key="04" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#F5C518" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 15 15"/>
    </svg>,
    // 05 — evolução
    <svg key="05" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#F5C518" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>,
    // 06 — metas
    <svg key="06" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#F5C518" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>,
  ]

  return (
    <section
      id="jornada"
      style={{ padding: '130px 24px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Cabeçalho com número gigante decorativo */}
        <div style={{ position: 'relative', marginBottom: 80 }}>

          {/* "01" enorme quase invisível — profundidade visual */}
          <span style={{
            position:      'absolute',
            top:           -48,
            left:          -16,
            fontSize:      '160px',
            fontWeight:    900,
            color:         '#1A1A1A',
            lineHeight:    1,
            userSelect:    'none',
            pointerEvents: 'none',
            letterSpacing: '-0.05em',
          }}
            aria-hidden="true"
          >
            02
          </span>

          <div
            className="revelar"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <span style={{
              display:        'block',
              fontSize:       '0.7rem',
              fontWeight:     700,
              color:          '#3A3A45',
              letterSpacing:  '0.12em',
              textTransform:  'uppercase',
              marginBottom:   16,
            }}>
              02 — Jornada completa
            </span>

            <h2 style={{
              fontSize:      'clamp(1.9rem, 4vw, 3rem)',
              fontWeight:    900,
              lineHeight:    1.1,
              letterSpacing: '-0.025em',
              maxWidth:      480,
              marginBottom:  12,
            }}>
              A jornada{' '}
              <span style={{ color: '#F5C518' }}>completa.</span>
            </h2>

            <p style={{
              color:    '#A0A0B0',
              fontSize: '1rem',
            }}>
              Do cadastro ao gráfico de evolução.
            </p>
          </div>
        </div>


        {/* Grid de passos — 2 colunas desktop */}
        <div
          className="jornada-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '0 72px',
          }}
        >
          {PASSOS_JORNADA.map(
            ({ numero, titulo, descricao }, indice) => (

              <div
                key={numero}
                className="step-revelar"
                data-indice={indice}
                style={{
                  display:      'flex',
                  alignItems:   'flex-start',
                  gap:          20,
                  padding:      '28px 0',
                  borderBottom: '1px solid #1A1A20',
                  position:     'relative',
                }}
              >

                {/* Número grande em amarelo */}
                <span style={{
                  fontSize:      '2.8rem',
                  fontWeight:    900,
                  color:         '#F5C518',
                  lineHeight:    1,
                  letterSpacing: '-0.03em',
                  flexShrink:    0,
                  minWidth:      56,
                  opacity:       0.85,
                }}>
                  {numero}
                </span>

                {/* Conteúdo textual */}
                <div style={{ paddingTop: 4 }}>
                  <h3 style={{
                    fontSize:     '1.02rem',
                    fontWeight:   700,
                    marginBottom: 6,
                    lineHeight:   1.3,
                  }}>
                    {titulo}
                  </h3>
                  <p style={{
                    fontSize:   '0.875rem',
                    color:      '#A0A0B0',
                    lineHeight: 1.72,
                  }}>
                    {descricao}
                  </p>
                </div>

                {/* Ícone à direita */}
                <div style={{
                  marginLeft:     'auto',
                  paddingTop:     4,
                  flexShrink:     0,
                  opacity:        0.6,
                }}>
                  {iconesPasso[indice]}
                </div>

              </div>

            ),
          )}
        </div>

      </div>
    </section>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// DiferenciaisSection
// Lista com separadores — não cards flutuantes.
// 3D mouse tracking em cada item.
// ─────────────────────────────────────────────────────────────────────────────

function DiferenciaisSection() {

  // 3D tilt — captura posição relativa e aplica rotateX/Y
  useEffect(() => {

    const itens   = document.querySelectorAll('.diferencial-3d')
    const limpeza = []

    itens.forEach((item) => {

      const aoMover = (e) => {
        const { left, top, width, height } =
          item.getBoundingClientRect()
        const nx = (e.clientX - left) / width  - 0.5
        const ny = (e.clientY - top)  / height - 0.5

        item.style.transform =
          `perspective(800px) ` +
          `rotateX(${-ny * 6}deg) ` +
          `rotateY(${nx * 6}deg)`
      }

      const aoSair = () => {
        item.style.transform =
          'perspective(800px) rotateX(0) rotateY(0)'
      }

      item.addEventListener('mousemove',  aoMover)
      item.addEventListener('mouseleave', aoSair)
      limpeza.push({ item, aoMover, aoSair })

    })

    return () => {
      limpeza.forEach(({ item, aoMover, aoSair }) => {
        item.removeEventListener('mousemove',  aoMover)
        item.removeEventListener('mouseleave', aoSair)
      })
    }

  }, [])

  // Reveal dos itens ao scroll
  useEffect(() => {

    const itens = document.querySelectorAll('.diferencial-revelar')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return

          const atrasoMs =
            parseFloat(target.dataset.atraso || 0) * 1000

          setTimeout(
            () => target.classList.add('visivel'),
            atrasoMs,
          )

          observer.unobserve(target)
        })
      },
      { threshold: 0.15 },
    )

    itens.forEach((el) => observer.observe(el))

    return () => observer.disconnect()

  }, [])

  return (
    <section
      id="diferenciais"
      style={{ padding: '130px 24px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Cabeçalho da seção */}
        <div style={{ position: 'relative', marginBottom: 72 }}>

          <span style={{
            position:      'absolute',
            top:           -48,
            left:          -16,
            fontSize:      '160px',
            fontWeight:    900,
            color:         '#1A1A1A',
            lineHeight:    1,
            userSelect:    'none',
            pointerEvents: 'none',
            letterSpacing: '-0.05em',
          }}
            aria-hidden="true"
          >
            03
          </span>

          <div
            className="revelar"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <span style={{
              display:        'block',
              fontSize:       '0.7rem',
              fontWeight:     700,
              color:          '#3A3A45',
              letterSpacing:  '0.12em',
              textTransform:  'uppercase',
              marginBottom:   16,
            }}>
              03 — Diferenciais
            </span>

            <h2 style={{
              fontSize:      'clamp(1.9rem, 4vw, 3rem)',
              fontWeight:    900,
              lineHeight:    1.1,
              letterSpacing: '-0.025em',
              maxWidth:      420,
            }}>
              O que faz o{' '}
              <span style={{ color: '#F5C518' }}>Fitly</span>
              {' '}diferente.
            </h2>
          </div>
        </div>


        {/* Lista com separadores */}
        <div>
          {DIFERENCIAIS.map(
            ({ codigo, titulo, descricao }, i) => (

              <div
                key={codigo}
                className={
                  `diferencial-revelar ` +
                  `diferencial-3d revelar`
                }
                data-atraso={`${i * 0.12}`}
                style={{
                  display:          'flex',
                  alignItems:       'flex-start',
                  gap:              44,
                  padding:          '36px 16px',
                  borderBottom:     '1px solid #2A2A35',
                  borderTop:        i === 0 ? '1px solid #2A2A35' : 'none',
                  transformStyle:   'preserve-3d',
                  willChange:       'transform',
                  transition:       'transform 0.12s ease',
                }}
              >

                {/* Código em amarelo */}
                <span style={{
                  fontSize:      'clamp(2.2rem, 3.5vw, 3.2rem)',
                  fontWeight:    900,
                  color:         '#F5C518',
                  letterSpacing: '-0.03em',
                  lineHeight:    1,
                  flexShrink:    0,
                  minWidth:      56,
                  paddingTop:    4,
                  opacity:       0.75,
                }}>
                  {codigo}
                </span>

                {/* Conteúdo */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize:     '1.1rem',
                    fontWeight:   700,
                    marginBottom: 10,
                    lineHeight:   1.3,
                  }}>
                    {titulo}
                  </h3>
                  <p style={{
                    fontSize:   '0.9rem',
                    color:      '#A0A0B0',
                    lineHeight: 1.75,
                    maxWidth:   560,
                  }}>
                    {descricao}
                  </p>
                </div>

                {/* Seta → em amarelo */}
                <div style={{
                  flexShrink: 0,
                  paddingTop: 4,
                  opacity:    0.35,
                }}>
                  <svg
                    width="20" height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4 10h12M12 5l5 5-5 5"
                      stroke="#F5C518"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

              </div>

            ),
          )}
        </div>

      </div>
    </section>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// CtaSection
// Alinhado à esquerda. Título + botão lado a lado em desktop.
// Gradiente radial sutil no fundo.
// ─────────────────────────────────────────────────────────────────────────────

function CtaSection() {

  const navigate    = useNavigate()
  const irParaCadastro = () => navigate('/cadastro')

  return (
    <section style={{
      padding:  '130px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Gradiente 5% de opacidade — quase imperceptível */}
      <div style={{
        position:      'absolute',
        inset:         0,
        background:
          'radial-gradient(' +
          'ellipse 70% 60% at 30% 60%, ' +
          'rgba(245, 197, 24, 0.05) 0%, ' +
          'transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth:  1100,
        margin:    '0 auto',
        position:  'relative',
        zIndex:    1,
      }}>

        {/* Rótulo de seção */}
        <span
          className="revelar"
          style={{
            display:        'block',
            fontSize:       '0.7rem',
            fontWeight:     700,
            color:          '#3A3A45',
            letterSpacing:  '0.12em',
            textTransform:  'uppercase',
            marginBottom:   24,
          }}
        >
          04 — Comece hoje
        </span>

        {/* Título + botão na mesma linha em desktop */}
        <div
          className="cta-split"
          style={{
            display:     'flex',
            alignItems:  'center',
            gap:         56,
          }}
        >

          {/* Texto alinhado à esquerda — não centralizado */}
          <div style={{ flex: 1 }}>
            <h2
              className="revelar"
              data-atraso="0.1"
              style={{
                fontSize:       'clamp(2rem, 5vw, 4.2rem)',
                fontWeight:     900,
                lineHeight:     1.08,
                letterSpacing:  '-0.03em',
                textTransform:  'uppercase',
                marginBottom:   12,
              }}
            >
              Pronto para parar
              <br />
              de{' '}
              <span style={{ color: '#F5C518' }}>adivinhar?</span>
            </h2>

            <p
              className="revelar"
              data-atraso="0.18"
              style={{
                color:     '#A0A0B0',
                fontSize:  '0.975rem',
                lineHeight: 1.8,
                maxWidth:   540,
              }}
            >
              A conta existe por um motivo simples: garantir que seus treinos,
              cargas e evoluções sejam sempre seus — acessíveis de qualquer
              dispositivo, a qualquer hora.
              <br /><br />
              Não coletamos CPF, localização nem nenhum dado sensível.
              Apenas um nome de usuário e uma senha. Nenhum administrador
              do Fitly tem acesso às suas evoluções. Só você.
            </p>
          </div>

          {/* Botão ao lado do texto */}
          <div
            className="revelar"
            data-atraso="0.28"
            style={{ flexShrink: 0 }}
          >
            <button
              className="btn-primario"
              style={{
                fontSize: '1.05rem',
                padding:  '16px 44px',
              }}
              onClick={irParaCadastro}
            >
              Criar conta grátis →
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// RodapeSection
// Uma única linha. Border-top 1px #2A2A35.
// Link LinkedIn abre em nova aba.
// ─────────────────────────────────────────────────────────────────────────────

function RodapeSection() {
  return (
    <footer style={{
      borderTop: '1px solid #2A2A35',
      padding:   '22px 24px',
    }}>
      <div style={{
        maxWidth:       1100,
        margin:         '0 auto',
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        flexWrap:       'wrap',
        gap:            10,
      }}>

        <span style={{ color: '#3A3A45', fontSize: '0.8rem' }}>
          Fitly © 2026
        </span>

        <span style={{ color: '#3A3A45', fontSize: '0.8rem' }}>
          Desenvolvido por{' '}
          <a
            href="https://www.linkedin.com/in/danilo-cruz-218b9b2bb/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color:          '#F5C518',
              textDecoration: 'none',
              fontWeight:     500,
              transition:     'text-decoration 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            Danilo Cruz
          </a>
        </span>

      </div>
    </footer>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// NavBar
// Flutuante com blur. Usa useNavigate internamente.
// ─────────────────────────────────────────────────────────────────────────────

function NavBar() {

  const navigate = useNavigate()

  return (
    <nav className="nav-flutuante">

      <span style={{
        fontSize:      '1.3rem',
        fontWeight:    900,
        letterSpacing: '-0.03em',
      }}>
        Fitly
        <span style={{ color: '#F5C518' }}>.</span>
      </span>

      <div
        className="nav-links-desktop"
        style={{ display: 'flex', gap: 24 }}
      >
        <a href="#por-que"      className="nav-link">Por que Fitly</a>
        <a href="#jornada"      className="nav-link">Como funciona</a>
        <a href="#diferenciais" className="nav-link">Recursos</a>
      </div>

      <button
        className="btn-primario"
        style={{ padding: '9px 20px', fontSize: '0.85rem' }}
        onClick={() => navigate('/login')}
      >
        Entrar
      </button>

    </nav>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// LandingPage — componente raiz
// Gerencia estado global: scroll progress e cursor customizado.
// Monta o IntersectionObserver de reveal genérico.
// ─────────────────────────────────────────────────────────────────────────────

export default function LandingPage() {

  const [percentualScroll, setPercentualScroll] = useState(0)

  const [posicaoCursor, setPosicaoCursor] = useState({
    x: -100,
    y: -100,
  })

  const [cursorAtivo, setCursorAtivo] = useState(false)


  // ── Effect: barra de progresso ─────────────────────────────────────────

  useEffect(() => {

    const calcularProgresso = () => {
      const alturaTotal =
        document.documentElement.scrollHeight - window.innerHeight

      const pct =
        alturaTotal > 0
          ? (window.scrollY / alturaTotal) * 100
          : 0

      setPercentualScroll(pct)
    }

    window.addEventListener('scroll', calcularProgresso, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', calcularProgresso)
    }

  }, [])


  // ── Effect: cursor customizado ─────────────────────────────────────────

  useEffect(() => {

    const mover    = (e) =>
      setPosicaoCursor({ x: e.clientX, y: e.clientY })
    const ativar   = () => setCursorAtivo(true)
    const desativar = () => setCursorAtivo(false)

    window.addEventListener('mousemove',  mover)
    window.addEventListener('mousedown',  ativar)
    window.addEventListener('mouseup',    desativar)

    return () => {
      window.removeEventListener('mousemove',  mover)
      window.removeEventListener('mousedown',  ativar)
      window.removeEventListener('mouseup',    desativar)
    }

  }, [])


  // ── Effect: reveal genérico ao scroll ──────────────────────────────────

  useEffect(() => {

    const seletores = '.revelar, .revelar-esq, .revelar-dir'
    const elementos = document.querySelectorAll(seletores)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return

          const atrasoMs =
            parseFloat(target.dataset.atraso || 0) * 1000

          setTimeout(
            () => target.classList.add('visivel'),
            atrasoMs,
          )

          observer.unobserve(target)
        })
      },
      { threshold: 0.12 },
    )

    elementos.forEach((el) => observer.observe(el))

    return () => observer.disconnect()

  }, [])


  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      <style>{ESTILOS_GLOBAIS}</style>

      {/* Cursor: anel + ponto */}
      <div
        className="cursor-anel"
        style={{
          left:   posicaoCursor.x,
          top:    posicaoCursor.y,
          width:  cursorAtivo ? 18 : 28,
          height: cursorAtivo ? 18 : 28,
        }}
      />
      <div
        className="cursor-ponto"
        style={{
          left: posicaoCursor.x,
          top:  posicaoCursor.y,
        }}
      />

      {/* Linha de progresso de scroll */}
      <div
        className="barra-progresso"
        style={{ width: `${percentualScroll}%` }}
      />

      <NavBar />

      <HeroSection />

      <div className="separador-secao" />

      <PorQueSection />

      <div className="separador-secao" />

      <JornadaSection />

      <div className="separador-secao" />

      <DiferenciaisSection />

      <div className="separador-secao" />

      <CtaSection />

      <RodapeSection />

    </>
  )
}
