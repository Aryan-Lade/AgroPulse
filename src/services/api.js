/**
 * api.js — base Axios instance.
 * Replace BASE_URL with your FastAPI endpoint when the backend is ready.
 * All services import from here.
 */
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — attach auth token when available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('agrinova-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — normalise errors
api.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err?.response?.data ?? err),
)

export default api
