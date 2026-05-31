import { render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { vi } from 'vitest'
import { AppRoutes } from './App'
import { ToastProvider } from './Toast'

vi.mock('api/api', () => ({
  clientesApi: {
    getAll: vi.fn().mockResolvedValue({ data: { clientes: [] } })
  },
  petsApi: {
    getAll: vi.fn().mockResolvedValue({ data: { pets: [] } })
  },
  vetsApi: {
    getAll: vi.fn().mockResolvedValue({ data: { vets: [] } })
  },
  consultasApi: {
    getAll: vi.fn().mockResolvedValue({ data: { consultas: [] } })
  }
}))

describe('<App /> routing', () => {
  const renderAt = (route: string) =>
    render(
      <ToastProvider>
        <MemoryRouter initialEntries={[route]}>
          <AppRoutes />
          <LocationProbe />
        </MemoryRouter>
      </ToastProvider>
    )

  it('redirects the root route to home', async () => {
    renderAt('/')

    expect(await screen.findByText(/clinica vet/i)).toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent('/home')
  })

  it('renders entity routes inside the shared layout', async () => {
    renderAt('/clientes')

    expect(
      await screen.findByRole('heading', { name: 'Clientes' })
    ).toBeInTheDocument()
    expect(screen.getByText('Pets')).toBeInTheDocument()
    expect(screen.getByText('Consultas')).toBeInTheDocument()
  })

  it('redirects unknown routes to home', async () => {
    renderAt('/rota-inexistente')

    expect(await screen.findByText(/clinica vet/i)).toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent('/home')
  })
})

function LocationProbe() {
  const location = useLocation()
  return <span data-testid="location">{location.pathname}</span>
}
