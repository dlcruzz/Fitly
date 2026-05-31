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

      {/* Onboarding — temporariamente público para desenvolvimento */}
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Dashboard — temporariamente público para desenvolvimento */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Treinos — temporariamente público para desenvolvimento */}
      <Route path="/treinos" element={<Treinos />} />
      {/* Execução — temporariamente público para desenvolvimento */}
      <Route path="/treinos/:id/executar" element={<ExecucaoTreino />} />
      {/* Evolução — temporariamente público para desenvolvimento */}
      <Route path="/evolucao" element={<Evolucao />} />
      {/* Metas — temporariamente público para desenvolvimento */}
      <Route path="/metas" element={<Metas />} />
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
