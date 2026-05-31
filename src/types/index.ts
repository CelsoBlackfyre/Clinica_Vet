export interface Cliente {
  id: number
  nome: string
  sobrenome: string
  cpf: string
  telefone: string
  endereco: string
  email: string
  data_cadastro: string
  data_atualizacao: string
}

export interface Pet {
  id: number
  nome: string
  tipo: string
  idade: number
  peso: number
  raca: string
  cliente_id: number
  data_cadastro: string
  data_atualizacao: string
  cliente?: Cliente
  consultas?: Consulta[]
}

export interface Vet {
  id: number
  nome: string
  sobrenome: string
  telefone: string
  data_cadastro: string
  data_atualizacao: string
}

export interface Consulta {
  id: number
  data: string
  observacao: string
  pet_id: number
  vet_id: number
  data_cadastro: string
  data_atualizacao: string
  pet?: Pet
  vet?: Vet
}

export interface ClientesResponse {
  clientes: Cliente[]
}

export interface PetsResponse {
  pets: Pet[]
}

export interface VetsResponse {
  vets: Vet[]
}

export interface ConsultasResponse {
  consultas: Consulta[]
}
