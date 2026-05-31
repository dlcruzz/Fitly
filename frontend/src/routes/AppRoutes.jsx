import { Routes, Route, Navigate } from 'react-router-dom'
import { estaAutenticado } from '../services/authService'

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

// Rota privada — redireciona para /login se não autenticado
function RotaProtegida({ children }) {
  return estaAutenticado() ? children : <Navigate to="/login" replace />
}

// Rota pública — redireciona para /dashboard se já autenticado
function RotaPublica({ children }) {
  return estaAutenticado() ? <Navigate to="/dashboard" replace /> : children
}

function AppRoutes() {
  return (
    <Routes>
      {/* Landing page — sempre acessível */}
      <Route path="/" element={<LandingPage />} />

      {/* Autenticação — redireciona para dashboard se já logado */}
      <Route path="/login" element={<RotaPublica><Login /></RotaPublica>} />
      <Route path="/cadastro" element={<RotaPublica><Register /></RotaPublica>} />

      {/* Onboarding e área interna — exigem autenticação */}
      <Route path="/onboarding" element={<RotaProtegida><Onboarding /></RotaProtegida>} />
      <Route path="/dashboard" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
      <Route path="/treinos" element={<RotaProtegida><Treinos /></RotaProtegida>} />
      <Route path="/treinos/:id/executar" element={<RotaProtegida><ExecucaoTreino /></RotaProtegida>} />
      <Route path="/evolucao" element={<RotaProtegida><Evolucao /></RotaProtegida>} />
      <Route path="/metas" element={<RotaProtegida><Metas /></RotaProtegida>} />
      <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />

      {/* Rota não encontrada — volta para home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
