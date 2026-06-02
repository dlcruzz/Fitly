import { Routes, Route, Navigate } from 'react-router-dom'
import { RotaProtegida, RotaPublica } from './PrivateRoute'

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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login"   element={<RotaPublica><Login /></RotaPublica>} />
      <Route path="/cadastro" element={<RotaPublica><Register /></RotaPublica>} />

      <Route path="/onboarding"          element={<RotaProtegida><Onboarding /></RotaProtegida>} />
      <Route path="/dashboard"           element={<RotaProtegida><Dashboard /></RotaProtegida>} />
      <Route path="/treinos"             element={<RotaProtegida><Treinos /></RotaProtegida>} />
      <Route path="/treinos/:id/executar" element={<RotaProtegida><ExecucaoTreino /></RotaProtegida>} />
      <Route path="/evolucao"            element={<RotaProtegida><Evolucao /></RotaProtegida>} />
      <Route path="/metas"               element={<RotaProtegida><Metas /></RotaProtegida>} />
      <Route path="/perfil"              element={<RotaProtegida><Perfil /></RotaProtegida>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
