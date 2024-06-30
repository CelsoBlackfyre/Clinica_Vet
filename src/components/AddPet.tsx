import React, { useEffect, useState } from 'react'
import { addCliente, addPet, getClientes } from 'services/services'

interface Cliente {
  id: number
  nome: string
}

interface Pet {
  id: number
  nome: string
  idade: number
  tipo: string
  peso: number
  raca: string
  data_cadastro: string
  data_atualizacao: string
  cliente_id: number
}

const AddPet = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [pet, setPet] = useState<Pet>({
    id: 0,
    nome: '',
    idade: 0,
    tipo: '',
    peso: 0,
    raca: '',
    data_cadastro: '',
    data_atualizacao: '',
    cliente_id: 0
  })

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientes = await getClientes()
        setClientes(clientes.data)
      } catch (error) {
        console.error('Erro ao buscar os clientes', error)
      }
    }

    fetchClientes()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addPet(pet)

    try {
      setPet({
        id: 0,
        nome: '',
        idade: 0,
        tipo: '',
        peso: 0,
        raca: '',
        data_cadastro: '',
        data_atualizacao: '',
        cliente_id: 0
      })
      alert('Paciente cadastrado com sucesso!')
    } catch (error) {
      console.error('Erro ao cadastrar o paciente', error)
    }
  }

  return (
    <div className="relative z-40 flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md rounded p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">Cadastrar Pet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Pet:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={pet.nome}
              onChange={(e) => setPet({ ...pet, nome: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Idade do Pet:
            </label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={pet.idade}
              onChange={(e) =>
                setPet({ ...pet, idade: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo do Pet:
            </label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={pet.tipo}
              onChange={(e) => setPet({ ...pet, tipo: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="peso"
              className="block text-sm font-medium text-gray-700"
            >
              Peso do Pet:
            </label>
            <input
              type="number"
              id="peso"
              name="peso"
              value={pet.peso}
              onChange={(e) =>
                setPet({ ...pet, peso: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="raca"
              className="block text-sm font-medium text-gray-700"
            >
              Raça do Pet:
            </label>
            <input
              type="text"
              id="raca"
              name="raca"
              value={pet.raca}
              onChange={(e) => setPet({ ...pet, raca: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="cliente_id"
              className="block text-sm font-medium text-gray-700"
            >
              Dono do Pet:
            </label>
            <select
              id="cliente_id"
              name="cliente_id"
              value={pet.cliente_id}
              onChange={(e) =>
                setPet({ ...pet, cliente_id: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="" disabled>
                Selecione o dono
              </option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-purple-800 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cadastrar Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPet
