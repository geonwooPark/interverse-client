import axios from 'axios'
import { getLocalStorageItem, setLocalStorageItem } from './localStorage'
import { TOKEN } from '@constants/index'
import { authService } from '@services/authService'
import { refreshTokenService } from '@services/refreshTokenService'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_V1_SERVER,
})

api.interceptors.request.use(
  (config) => {
    const token = getLocalStorageItem(TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err),
)

// 응답 에러 처리
api.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    const originalRequest = err.config

    if (err.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true

      const { token } = await refreshTokenService.refresh(() =>
        authService.refresh(),
      )

      setLocalStorageItem(TOKEN, token)
      originalRequest.headers.Authorization = `Bearer ${token}`

      const response = await axios(originalRequest)
      return response.data
    }

    if (axios.isAxiosError(err) && err.response) {
      err.message = err.response.data.message
    }

    return Promise.reject(err)
  },
)
