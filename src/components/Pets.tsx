import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { petsApi, clientesApi } from 'api/api'
import type { Pet, Cliente } from 'types'
import { useToast } from './Toast'

export default function Pets() {
  const { showToast } = useToast()
  const [pets, setPets] = useState<Pet[]>([])
  const [clientesMap, setClientesMap] = useState<Record<number, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [petsRes, clientesRes] = await Promise.all([
        petsApi.getAll(),
        clientesApi.getAll()
      ])

      const petsData = petsRes.data.pets || []
      setPets(petsData)

      const clientesData = clientesRes.data.clientes || []
      const map: Record<number, string> = {}
      clientesData.forEach((c: Cliente) => {
        map[c.id] = `${c.nome} ${c.sobrenome}`.trim()
      })
      setClientesMap(map)
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar os pets. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: number, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o pet "${nome}"?`)) return

    try {
      await petsApi.delete(id)
      setPets((prev) => prev.filter((p) => p.id !== id))
      showToast('Pet excluído com sucesso', 'success')
    } catch (err: any) {
      showToast(err?.message || 'Não foi possível excluir o pet.', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="fixed z-40 flex size-full items-center justify-center">
        <div className="rounded bg-white p-8 shadow-lg">
          <p className="text-center text-lg">Carregando pets...</p>
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
            onClick={fetchData}
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
          <h1 className="text-3xl font-bold text-gray-800">Pets</h1>
          <Link
            to="/pets/new"
            className="rounded-md bg-purple-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            + Adicionar Pet
          </Link>
        </div>

        {pets.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-gray-500">Nenhum pet cadastrado ainda.</p>
            <Link
              to="/pets/new"
              className="inline-block rounded-md bg-purple-800 px-6 py-2 text-white hover:bg-purple-700"
            >
              Cadastrar primeiro pet
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
                    Tipo / Raça
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Idade / Peso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Dono
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {pets.map((pet) => (
                  <tr key={pet.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      {pet.nome}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {pet.tipo} • {pet.raca}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {pet.idade} anos • {pet.peso} kg
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {clientesMap[pet.cliente_id] || `ID ${pet.cliente_id}`}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <button
                        onClick={() => handleDelete(pet.id, pet.nome)}
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
