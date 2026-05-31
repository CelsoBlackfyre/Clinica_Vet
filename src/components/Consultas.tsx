import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { consultasApi } from 'api/api'
import type { Consulta } from 'types'
import { useToast } from './Toast'

export default function Consultas() {
  const { showToast } = useToast()
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConsultas = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await consultasApi.getAll()
      setConsultas(res.data.consultas || [])
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar as consultas.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchConsultas()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja cancelar esta consulta?')) return

    try {
      await consultasApi.delete(id)
      setConsultas((prev) => prev.filter((c) => c.id !== id))
      showToast('Consulta cancelada com sucesso', 'success')
    } catch (err: any) {
      showToast(
        err?.message || 'Não foi possível cancelar a consulta.',
        'error'
      )
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    })
  }

  if (isLoading) {
    return (
      <div className="fixed z-40 flex size-full items-center justify-center">
        <div className="rounded bg-white p-8 shadow-lg">
          <p className="text-center text-lg">Carregando consultas...</p>
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
            onClick={fetchConsultas}
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
          <h1 className="text-3xl font-bold text-gray-800">Consultas</h1>
          <Link
            to="/consultas/new"
            className="rounded-md bg-purple-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            + Agendar Consulta
          </Link>
        </div>

        {consultas.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-gray-500">Nenhuma consulta agendada.</p>
            <Link
              to="/consultas/new"
              className="inline-block rounded-md bg-purple-800 px-6 py-2 text-white hover:bg-purple-700"
            >
              Agendar primeira consulta
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Data / Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Pet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Veterinário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Observação
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {consultas.map((consulta) => (
                  <tr key={consulta.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      {formatDate(consulta.data)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {consulta.pet?.nome || `Pet #${consulta.pet_id}`}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {consulta.vet
                        ? `${consulta.vet.nome} ${consulta.vet.sobrenome}`
                        : `Vet #${consulta.vet_id}`}
                    </td>
                    <td className="max-w-xs px-6 py-4 text-sm text-gray-600">
                      <span className="line-clamp-2">
                        {consulta.observacao || '—'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                      <button
                        onClick={() => handleDelete(consulta.id)}
                        className="rounded px-3 py-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        Cancelar
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
