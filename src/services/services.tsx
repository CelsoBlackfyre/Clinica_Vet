import axios from 'axios'

const api_url = 'http://localhost:8080'

// Redirecionamento de rotas
// Clientes
export const getClientes = () => axios.get(`${api_url}/clientes`)
export const addCliente = (novoCliente: any) =>
  axios.post(`${api_url}/clientes`, novoCliente)
export const delCliente = (id: any) => axios.delete(`${api_url}/clientes/${id}`)
export const updateCliente = (id: any, updatedCliente: any) =>
  axios.put(`${api_url}/clientes/${id}`, updatedCliente)

// Pets
export const getPets = () => axios.get(`${api_url}/pets`)
export const addPet = (novoPet: any) => axios.post(`${api_url}/pets`, novoPet)
export const delPet = (id: any) => axios.delete(`${api_url}/pets/${id}`)
export const updatePet = (id: any, updatedPet: any) =>
  axios.put(`${api_url}/pets/${id}`, updatedPet)

// Vets
export const getVets = () => axios.get(`${api_url}/vets`)
export const addVet = (novoVet: any) => axios.post(`${api_url}/vets`, novoVet)
export const delVet = (id: any) => axios.delete(`${api_url}/vets/${id}`)
export const updateVet = (id: any, updatedVet: any) =>
  axios.put(`${api_url}/vets/${id}`, updatedVet)

// Consultas
export const getConsultas = () => axios.get(`${api_url}/consultas`)
export const addConsulta = (novoConsulta: any) =>
  axios.post(`${api_url}/consultas`, novoConsulta)
export const delConsulta = (id: any) =>
  axios.delete(`${api_url}/consultas/${id}`)
export const updateConsulta = (id: any, updatedConsulta: any) =>
  axios.put(`${api_url}/consultas/${id}`, updatedConsulta)
