import { RequestBody, ResponseBody } from '@interfaces/api'
import { api } from '@utils/api'

class AuthService {
  async login(
    params: RequestBody<'/auth/login', 'post'>,
  ): Promise<ResponseBody<'/auth/login', 'post'>> {
    return await api.post('/auth/login', params)
  }

  async signup(
    params: RequestBody<'/auth/signup', 'post'>,
  ): Promise<ResponseBody<'/auth/signup', 'post'>> {
    return await api.post('/auth/signup', params)
  }

  async me(): Promise<ResponseBody<'/auth/me', 'get'>> {
    return await api.get('/auth/me')
  }

  async sendVerificationEmail(
    params: RequestBody<'/auth/send-verification-email', 'post'>,
  ): Promise<ResponseBody<'/auth/send-verification-email', 'post'>> {
    return await api.post('/auth/send-verification-email', params)
  }

  async checkVerificationCode(
    params: RequestBody<'/auth/check-verification-code', 'post'>,
  ): Promise<ResponseBody<'/auth/check-verification-code', 'post'>> {
    return await api.post('/auth/check-verification-code', params)
  }

  async changePassword(
    params: RequestBody<'/auth/change-password', 'patch'>,
  ): Promise<ResponseBody<'/auth/change-password', 'patch'>> {
    return await api.patch('/auth/change-password', params)
  }

  async checkId(
    params: RequestBody<'/auth/check-id', 'post'>,
  ): Promise<ResponseBody<'/auth/check-id', 'post'>> {
    return await api.post('/auth/check-id', params)
  }
}

export const authService = new AuthService()
