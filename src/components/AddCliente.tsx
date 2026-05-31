import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clientesApi } from 'api/api'
import type { Cliente } from 'types'
import { useToast } from './Toast'

type ClienteForm = Omit<Cliente, 'id' | 'data_cadastro' | 'data_atualizacao'>

const initialForm: ClienteForm = {
  nome: '',
  sobrenome: '',
  cpf: '',
  telefone: '',
  endereco: '',
  email: ''
}

const AddCliente: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [form, setForm] = useState<ClienteForm>(initialForm)
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
      setError('O nome é obrigatório.')
      return
    }

    setIsSubmitting(true)

    try {
      await clientesApi.create(form)
      setForm(initialForm)
      showToast('Cliente cadastrado com sucesso!', 'success')
      navigate('/clientes')
    } catch (err: any) {
      console.error('Erro ao cadastrar cliente', err)
      const msg =
        err?.message ||
        err?.response?.data?.error ||
        'Erro ao cadastrar o cliente.'
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
            Cadastrar Cliente
          </h2>
          <button
            type="button"
            onClick={() => navigate('/clientes')}
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cpf"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="endereco"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Endereço
            </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-purple-800 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-400"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCliente
