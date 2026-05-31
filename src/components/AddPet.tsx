import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clientesApi, petsApi } from 'api/api'
import type { Cliente } from 'types'
import { useToast } from './Toast'

interface PetForm {
  nome: string
  tipo: string
  idade: number
  peso: number
  raca: string
  cliente_id: number
}

const initialForm: PetForm = {
  nome: '',
  tipo: '',
  idade: 0,
  peso: 0,
  raca: '',
  cliente_id: 0,
}

const AddPet: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [form, setForm] = useState<PetForm>(initialForm)
  const [isLoadingClients, setIsLoadingClients] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch clients for the owner dropdown
  useEffect(() => {
    const fetchClientes = async () => {
      setIsLoadingClients(true)
      try {
        const res = await clientesApi.getAll()
        // Backend returns { clientes: [...] }
        setClientes(res.data.clientes || [])
      } catch (err) {
        console.error('Erro ao buscar clientes', err)
        setError('Não foi possível carregar a lista de donos.')
      } finally {
        setIsLoadingClients(false)
      }
    }

    fetchClientes()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'idade' || name === 'peso' || name === 'cliente_id') {
      setForm((prev) => ({ ...prev, [name]: parseInt(value) || 0 }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.cliente_id) {
      setError('Por favor selecione o dono do pet.')
      return
    }
    if (!form.nome.trim()) {
      setError('O nome do pet é obrigatório.')
      return
    }

    setIsSubmitting(true)

    try {
      await petsApi.create(form)

      // Success - reset form and navigate back to pets list
      setForm(initialForm)
      showToast('Pet cadastrado com sucesso!', 'success')
      navigate('/pets')
    } catch (err: any) {
      console.error('Erro ao cadastrar pet', err)
      const msg =
        err?.message ||
        err?.response?.data?.error ||
        'Erro ao cadastrar o pet. Verifique os dados e tente novamente.'
      setError(msg)
      showToast(msg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl bg-white p-8 shadow">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Cadastrar Novo Pet</h2>
          <button
            type="button"
            onClick={() => navigate('/pets')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Voltar
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="nome" className="mb-1 block text-sm font-medium text-gray-700">
              Nome do Pet *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Ex: Rex"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tipo" className="mb-1 block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <input
                type="text"
                id="tipo"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Cachorro / Gato"
              />
            </div>
            <div>
              <label htmlFor="raca" className="mb-1 block text-sm font-medium text-gray-700">
                Raça
              </label>
              <input
                type="text"
                id="raca"
                name="raca"
                value={form.raca}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Labrador"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="idade" className="mb-1 block text-sm font-medium text-gray-700">
                Idade (anos)
              </label>
              <input
                type="number"
                id="idade"
                name="idade"
                value={form.idade}
                onChange={handleChange}
                min="0"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="peso" className="mb-1 block text-sm font-medium text-gray-700">
                Peso (kg)
              </label>
              <input
                type="number"
                id="peso"
                name="peso"
                value={form.peso}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cliente_id" className="mb-1 block text-sm font-medium text-gray-700">
              Dono do Pet *
            </label>
            <select
              id="cliente_id"
              name="cliente_id"
              value={form.cliente_id || ''}
              onChange={handleChange}
              required
              disabled={isLoadingClients}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:bg-gray-100"
            >
              <option value="" disabled>
                {isLoadingClients ? 'Carregando donos...' : 'Selecione o dono'}
              </option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome} {cliente.sobrenome}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isLoadingClients}
              className="w-full rounded-md bg-purple-800 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Pet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPet
