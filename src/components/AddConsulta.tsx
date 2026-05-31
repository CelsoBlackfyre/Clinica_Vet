import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { consultasApi, petsApi, vetsApi } from 'api/api'
import type { Pet, Vet } from 'types'
import { useToast } from './Toast'

interface ConsultaForm {
  data: string
  observacao: string
  pet_id: number
  vet_id: number
}

const initialForm: ConsultaForm = {
  data: '',
  observacao: '',
  pet_id: 0,
  vet_id: 0
}

const AddConsulta: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [form, setForm] = useState<ConsultaForm>(initialForm)
  const [pets, setPets] = useState<Pet[]>([])
  const [vets, setVets] = useState<Vet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [petsRes, vetsRes] = await Promise.all([
          petsApi.getAll(),
          vetsApi.getAll()
        ])
        setPets(petsRes.data.pets || [])
        setVets(vetsRes.data.vets || [])
      } catch (err) {
        console.error('Erro ao carregar dados para consulta', err)
        setError('Nao foi possivel carregar pets e veterinarios.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    if (name === 'pet_id' || name === 'vet_id') {
      setForm((prev) => ({ ...prev, [name]: parseInt(value) || 0 }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.pet_id || !form.vet_id) {
      setError('Selecione um pet e um veterinario.')
      return
    }
    if (!form.data) {
      setError('A data da consulta e obrigatoria.')
      return
    }

    setIsSubmitting(true)

    try {
      await consultasApi.create(form)
      showToast('Consulta agendada com sucesso!', 'success')
      navigate('/consultas')
    } catch (err: any) {
      console.error('Erro ao criar consulta', err)
      const msg =
        err?.message ||
        err?.response?.data?.error ||
        'Erro ao agendar a consulta.'
      setError(msg)
      showToast(msg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed z-40 flex size-full items-center justify-center">
        <p>Carregando dados...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl bg-white p-8 shadow">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Agendar Consulta</h2>
          <button
            type="button"
            onClick={() => navigate('/consultas')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            &larr; Voltar
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="data"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Data e Hora *
            </label>
            <input
              type="datetime-local"
              id="data"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="pet_id"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Pet *
            </label>
            <select
              id="pet_id"
              name="pet_id"
              value={form.pet_id || ''}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="" disabled>
                Selecione o pet
              </option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.nome} ({pet.raca})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="vet_id"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Veterinario *
            </label>
            <select
              id="vet_id"
              name="vet_id"
              value={form.vet_id || ''}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="" disabled>
                Selecione o veterinario
              </option>
              {vets.map((vet) => (
                <option key={vet.id} value={vet.id}>
                  {vet.nome} {vet.sobrenome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="observacao"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Observacoes / Motivo da Consulta
            </label>
            <textarea
              id="observacao"
              name="observacao"
              value={form.observacao}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Ex: Check-up anual, vacinacao, problema na pata..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-purple-800 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400"
            >
              {isSubmitting ? 'Agendando...' : 'Agendar Consulta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddConsulta
