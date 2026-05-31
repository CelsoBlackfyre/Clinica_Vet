import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Clientes from './Clientes'
import AddCliente from './AddCliente'
import Pets from './Pets'
import AddPet from './AddPet'
import Vets from './Vets'
import AddVet from './AddVet'
import Consultas from './Consultas'
import AddConsulta from './AddConsulta'
import { ToastProvider } from './Toast'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />

      <Route
        path="/clientes"
        element={
          <Layout>
            <Clientes />
          </Layout>
        }
      />
      <Route
        path="/clientes/new"
        element={
          <Layout>
            <AddCliente />
          </Layout>
        }
      />

      <Route
        path="/pets"
        element={
          <Layout>
            <Pets />
          </Layout>
        }
      />
      <Route
        path="/pets/new"
        element={
          <Layout>
            <AddPet />
          </Layout>
        }
      />

      <Route
        path="/vets"
        element={
          <Layout>
            <Vets />
          </Layout>
        }
      />
      <Route
        path="/vets/new"
        element={
          <Layout>
            <AddVet />
          </Layout>
        }
      />

      <Route
        path="/consultas"
        element={
          <Layout>
            <Consultas />
          </Layout>
        }
      />
      <Route
        path="/consultas/new"
        element={
          <Layout>
            <AddConsulta />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
