import { Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Onboarding from '../pages/Onboarding'
import Dashboard from '../pages/Dashboard'
import Treinos from '../pages/Treinos'
import ExecucaoTreino from '../pages/ExecucaoTreino'
import Evolucao from '../pages/Evolucao'
import Metas from '../pages/Metas'
import Perfil from '../pages/Perfil'

// TODO: substituir por verificação real de autenticação via contexto
const usuarioAutenticado = false

function RotaProtegida({ children }) {
  if (!usuarioAutenticado) {
    return <Navigate to="/login" replace />
  }
  return children
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública — landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Rotas de autenticação */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      {/* Onboarding — acessado após primeiro login */}
      <Route
        path="/onboarding"
        element={
          <RotaProtegida>
            <Onboarding />
          </RotaProtegida>
        }
      />

      {/* Rotas protegidas da aplicação */}
      <Route
        path="/dashboard"
        element={
          <RotaProtegida>
            <Dashboard />
          </RotaProtegida>
        }
      />
      <Route
        path="/treinos"
        element={
          <RotaProtegida>
            <Treinos />
          </RotaProtegida>
        }
      />
      <Route
        path="/treinos/:id/executar"
        element={
          <RotaProtegida>
            <ExecucaoTreino />
          </RotaProtegida>
        }
      />
      <Route
        path="/evolucao"
        element={
          <RotaProtegida>
            <Evolucao />
          </RotaProtegida>
        }
      />
      <Route
        path="/metas"
        element={
          <RotaProtegida>
            <Metas />
          </RotaProtegida>
        }
      />
      <Route
        path="/perfil"
        element={
          <RotaProtegida>
            <Perfil />
          </RotaProtegida>
        }
      />

      {/* Rota fallback — redireciona para home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
