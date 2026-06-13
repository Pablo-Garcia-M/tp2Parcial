import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'

// Páginas
import Login from './pages/Login'
import Register from './pages/Register'
import TurnosList from './pages/TurnosList'
import TurnoDetalle from './pages/TurnoDetalle'
import TurnoForm from './pages/TurnoForm'
import ResumenAdmin from './pages/ResumenAdmin'
import AdminUsuarios from './pages/AdminUsuarios'
import Perfil from './pages/Perfil'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/turnos"
            element={
              <PrivateRoute>
                <TurnosList />
              </PrivateRoute>
            }
          />
          <Route
            path="/turnos/nuevo"
            element={
              <PrivateRoute roles={['estudiante', 'admin']}>
                <TurnoForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/turnos/:id"
            element={
              <PrivateRoute>
                <TurnoDetalle />
              </PrivateRoute>
            }
          />
          <Route
            path="/turnos/:id/editar"
            element={
              <PrivateRoute roles={['admin']}>
                <TurnoForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/resumen"
            element={
              <PrivateRoute roles={['admin']}>
                <ResumenAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminUsuarios />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
