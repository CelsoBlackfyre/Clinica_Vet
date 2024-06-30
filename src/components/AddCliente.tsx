import React, { useState } from 'react'
import { addCliente } from 'services/services'

interface Cliente {
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

const AddCliente = () => {
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: '',
    sobrenome: '',
    cpf: '',
    telefone: '',
    endereco: '',
    email: '',
    data_cadastro: '',
    data_atualizacao: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addCliente(cliente)
      setCliente({
        id: 0,
        nome: '',
        sobrenome: '',
        cpf: '',
        telefone: '',
        endereco: '',
        email: '',
        data_cadastro: '',
        data_atualizacao: ''
      })
      alert('Cliente cadastrado com sucesso!')
    } catch (error) {
      console.error('Erro ao cadastrar o cliente', error)
    }
  }

  return (
    <div className="relative z-40 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Cadastrar Cliente
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={cliente.nome}
              onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="sobrenome"
              className="block text-sm font-medium text-gray-700"
            >
              Sobrenome:
            </label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              value={cliente.sobrenome}
              onChange={(e) =>
                setCliente({ ...cliente, sobrenome: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-gray-700"
            >
              CPF:
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cliente.cpf}
              onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="telefone"
              className="block text-sm font-medium text-gray-700"
            >
              Telefone:
            </label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={cliente.telefone}
              onChange={(e) =>
                setCliente({ ...cliente, telefone: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="endereco"
              className="block text-sm font-medium text-gray-700"
            >
              Endereço:
            </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={cliente.endereco}
              onChange={(e) =>
                setCliente({ ...cliente, endereco: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={cliente.email}
              onChange={(e) =>
                setCliente({ ...cliente, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-purple-800 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cadastrar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCliente
