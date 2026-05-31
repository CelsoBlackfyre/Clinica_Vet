import apiClient from './client'
import type {
  Cliente,
  Pet,
  Vet,
  Consulta,
  ClientesResponse,
  PetsResponse,
  VetsResponse,
  ConsultasResponse,
} from 'types'

// ========================
// CLIENTES
// ========================
export const clientesApi = {
  getAll: () => apiClient.get<ClientesResponse>('/clientes'),
  getById: (id: number) => apiClient.get<{ cliente: Cliente }>(`/clientes/${id}`),
  create: (data: Partial<Cliente>) => apiClient.post<{ cliente: Cliente }>('/clientes', data),
  update: (id: number, data: Partial<Cliente>) =>
    apiClient.put<{ cliente: Cliente }>(`/clientes/${id}`, data),
  delete: (id: number) => apiClient.delete(`/clientes/${id}`),
}

// ========================
// PETS
// ========================
export const petsApi = {
  getAll: () => apiClient.get<PetsResponse>('/pets'),
  getById: (id: number) => apiClient.get<{ pet: Pet }>(`/pets/${id}`),
  create: (data: Partial<Pet>) => apiClient.post<{ pet: Pet }>('/pets', data),
  update: (id: number, data: Partial<Pet>) =>
    apiClient.put<{ pet: Pet }>(`/pets/${id}`, data),
  delete: (id: number) => apiClient.delete(`/pets/${id}`),
}

// ========================
// VETS
// ========================
export const vetsApi = {
  getAll: () => apiClient.get<VetsResponse>('/vets'),
  getById: (id: number) => apiClient.get<{ vet: Vet }>(`/vets/${id}`),
  create: (data: Partial<Vet>) => apiClient.post<{ vet: Vet }>('/vets', data),
  update: (id: number, data: Partial<Vet>) =>
    apiClient.put<{ vet: Vet }>(`/vets/${id}`, data),
  delete: (id: number) => apiClient.delete(`/vets/${id}`),
}

// ========================
// CONSULTAS
// ========================
export const consultasApi = {
  getAll: () => apiClient.get<ConsultasResponse>('/consultas'),
  getById: (id: number) => apiClient.get<{ consulta: Consulta }>(`/consultas/${id}`),
  create: (data: Partial<Consulta>) => apiClient.post<{ consulta: Consulta }>('/consultas', data),
  update: (id: number, data: Partial<Consulta>) =>
    apiClient.put<{ consulta: Consulta }>(`/consultas/${id}`, data),
  delete: (id: number) => apiClient.delete(`/consultas/${id}`),
}

// Convenience exports (flat) - useful for quick migration
export const api = {
  clientes: clientesApi,
  pets: petsApi,
  vets: vetsApi,
  consultas: consultasApi,
}

export default api
