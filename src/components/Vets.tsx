import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { vetsApi } from 'api/api'
import type { Vet } from 'types'
import { useToast } from './Toast'

export default function Vets() {
  const { showToast } = useToast()
  const [vets, setVets] = useState<Vet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVets = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await vetsApi.getAll()
      setVets(res.data.vets || [])
    } catch (err: any) {
      setError(
        err?.message || 'Erro ao carregar os veterinários. Tente novamente.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVets()
  }, [])

  const handleDelete = async (id: number, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o veterinário "${nome}"?`))
      return

    try {
      await vetsApi.delete(id)
      setVets((prev) => prev.filter((v) => v.id !== id))
      showToast('Veterinário excluído com sucesso', 'success')
    } catch (err: any) {
      showToast(
        err?.message || 'Não foi possível excluir o veterinário.',
        'error'
      )
    }
  }

  if (isLoading) {
    return (
      <div className="fixed z-40 flex size-full items-center justify-center">
        <div className="rounded bg-white p-8 shadow-lg">
          <p className="text-center text-lg">Carregando veterinários...</p>
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
            onClick={fetchVets}
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
          <h1 className="text-3xl font-bold text-gray-800">Veterinários</h1>
          <Link
            to="/vets/new"
            className="rounded-md bg-purple-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            + Adicionar Veterinário
          </Link>
        </div>

        {vets.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-gray-500">
              Nenhum veterinário cadastrado ainda.
            </p>
            <Link
              to="/vets/new"
              className="inline-block rounded-md bg-purple-800 px-6 py-2 text-white hover:bg-purple-700"
            >
              Cadastrar primeiro veterinário
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {vets.map((vet) => (
                  <tr key={vet.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      {vet.nome} {vet.sobrenome}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {vet.telefone || '—'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <button
                        onClick={() =>
                          handleDelete(vet.id, `${vet.nome} ${vet.sobrenome}`)
                        }
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
