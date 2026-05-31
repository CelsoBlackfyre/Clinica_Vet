import { clientesApi, petsApi, vetsApi, consultasApi } from 'api/api'

import type { Cliente, Pet, Vet, Consulta } from 'types'

export const getClientes = clientesApi.getAll
export const getCliente = clientesApi.getById
export const addCliente = clientesApi.create
export const delCliente = clientesApi.delete
export const updateCliente = clientesApi.update

export const getPets = petsApi.getAll
export const getPet = petsApi.getById
export const addPet = petsApi.create
export const delPet = petsApi.delete
export const updatePet = petsApi.update

export const getVets = vetsApi.getAll
export const getVet = vetsApi.getById
export const addVet = vetsApi.create
export const delVet = vetsApi.delete
export const updateVet = vetsApi.update

export const getConsultas = consultasApi.getAll
export const getConsulta = consultasApi.getById
export const addConsulta = consultasApi.create
export const delConsulta = consultasApi.delete
export const updateConsulta = consultasApi.update

export { clientesApi, petsApi, vetsApi, consultasApi } from 'api/api'
