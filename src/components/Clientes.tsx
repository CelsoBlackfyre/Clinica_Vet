import React, { useEffect, useState } from 'react'
import { getClientes } from 'services/services'

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

const ListClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await getClientes()
        console.log(response.data)

        // Verificar se a Res se trata de um array
        if (Array.isArray(response.data)) {
          setClientes(response.data)
        } else {
          // Converter a Res de objeto para array
          const dataArray = Object.values(response.data.clientes)
          setClientes(dataArray)
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao buscar os clientes', error)
        setError('Erro ao buscar os clientes. Tente novamente mais tarde.')
        setIsLoading(false)
      }
    }

    fetchClientes()
  }, [])

  if (isLoading) {
    return <p className="mt-4 text-center">Carregando clientes...</p>
  }

  if (error) {
    return <p className="mt-4 text-center text-red-500">{error}</p>
  }

  return (
    <div className="fixed right-48 z-40 flex min-h-screen flex-col items-center ">
      <div className="container  mx-auto p-8">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Lista de Clientes
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Sobrenome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Endereço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Data Cadastro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Data Atualização
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {cliente.nome}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {cliente.sobrenome}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {cliente.cpf}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {cliente.telefone}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {cliente.endereco}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {cliente.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {new Date(cliente.data_cadastro).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {new Date(cliente.data_atualizacao).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListClientes
