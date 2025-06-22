import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8000/api'
})

api.interceptors.response.use(
  r => r,
  err => {
    const msg =
      err.response?.data?.message ||
      err.response?.data?.detail ||
      'unexpected error'
    return Promise.reject(new Error(msg))
  }
)