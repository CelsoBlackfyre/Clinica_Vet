import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (useful later for auth tokens)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: attach token if we add auth in Phase 5
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    const data = error.response?.data as any

    // Normalize error message
    let message = 'Ocorreu um erro inesperado.'

    if (data?.error) {
      message = data.error
    } else if (error.message) {
      message = error.message
    }

    // You can add toast notifications here later
    console.error(`[API Error ${status || 'Network'}]:`, message)

    // Attach normalized message to the error for easy use in components
    const normalizedError = {
      ...error,
      message,
      status,
      originalError: error,
    }

    return Promise.reject(normalizedError)
  }
)

export default apiClient
