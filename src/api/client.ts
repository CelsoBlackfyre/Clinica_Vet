import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    const data = error.response?.data as any

    let message = 'Ocorreu um erro inesperado.'

    if (data?.error) {
      message = data.error
    } else if (error.message) {
      message = error.message
    }

    console.error(`[API Error ${status || 'Network'}]:`, message)

    const normalizedError = {
      ...error,
      message,
      status,
      originalError: error
    }

    return Promise.reject(normalizedError)
  }
)

export default apiClient
