import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { vetsApi } from 'api/api'
import type { Vet } from 'types'
import { useToast } from './Toast'

type VetForm = Pick<Vet, 'nome' | 'sobrenome' | 'telefone'>

const initialForm: VetForm = {
  nome: '',
  sobrenome: '',
  telefone: ''
}

const AddVet: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [form, setForm] = useState<VetForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.nome.trim()) {
      setError('O nome e obrigatorio.')
      return
    }

    setIsSubmitting(true)

    try {
      await vetsApi.create(form)
      setForm(initialForm)
      showToast('Veterinario cadastrado com sucesso!', 'success')
      navigate('/vets')
    } catch (err: any) {
      console.error('Erro ao cadastrar veterinario', err)
      const msg =
        err?.message ||
        err?.response?.data?.error ||
        'Erro ao cadastrar o veterinario.'
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
          <h2 className="text-2xl font-bold text-gray-800">
            Cadastrar Veterinario
          </h2>
          <button
            type="button"
            onClick={() => navigate('/vets')}
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
              htmlFor="nome"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Nome *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Joao"
            />
          </div>

          <div>
            <label
              htmlFor="sobrenome"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Sobrenome
            </label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              value={form.sobrenome}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Silva"
            />
          </div>

          <div>
            <label
              htmlFor="telefone"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Telefone
            </label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="(11) 99999-0000"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-purple-800 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Veterinario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddVet
