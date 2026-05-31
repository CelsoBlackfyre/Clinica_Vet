import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { clientesApi } from 'api/api'
import type { Cliente } from 'types'
import { useToast } from './Toast'

export default function Clientes() {
  const { showToast } = useToast()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClientes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await clientesApi.getAll()
      setClientes(res.data.clientes || [])
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar os clientes. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  const handleDelete = async (id: number, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o cliente "${nome}"?`)) return

    try {
      await clientesApi.delete(id)
      setClientes((prev) => prev.filter((c) => c.id !== id))
      showToast('Cliente excluído com sucesso', 'success')
    } catch (err: any) {
      showToast(err?.message || 'Não foi possível excluir o cliente.', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="fixed z-40 flex size-full items-center justify-center">
        <div className="rounded bg-white p-8 shadow-lg">
          <p className="text-center text-lg">Carregando clientes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed z-40 flex size-full items-center justify-center">
        <div className="rounded bg-white p-8 shadow-lg">
          <p className="mb-4 text-center text-red-600">{error}</p>
          <button
            onClick={fetchClientes}
            className="rounded bg-purple-800 px-4 py-2 text-white hover:bg-purple-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-xl bg-white p-8 shadow">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
          <Link
            to="/clientes/new"
            className="rounded-md bg-purple-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            + Novo Cliente
          </Link>
        </div>

        {clientes.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-gray-500">Nenhum cliente cadastrado ainda.</p>
            <Link
              to="/clientes/new"
              className="inline-block rounded-md bg-purple-800 px-6 py-2 text-white hover:bg-purple-700"
            >
              Cadastrar primeiro cliente
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    CPF
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Telefone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Endereço
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                      {cliente.nome} {cliente.sobrenome}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                      {cliente.cpf || '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                      {cliente.telefone || '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                      {cliente.email || '—'}
                    </td>
                    <td className="max-w-xs truncate px-4 py-4 text-sm text-gray-600">
                      {cliente.endereco || '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                      <button
                        onClick={() => handleDelete(cliente.id, `${cliente.nome} ${cliente.sobrenome}`)}
                        className="rounded px-3 py-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
