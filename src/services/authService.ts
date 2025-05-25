import { API_ENDPOINTS } from '@constants/api'
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
    return await api.post(API_ENDPOINTS.USER.SIGN_UP(), params)
  }

  async me(): Promise<ResponseBody<'/auth/me', 'get'>> {
    return await api.get(API_ENDPOINTS.USER.ME())
  }

  async sendVerificationEmail(
    params: RequestBody<'/auth/send-verification-email', 'post'>,
  ): Promise<ResponseBody<'/auth/send-verification-email', 'post'>> {
    return await api.post(API_ENDPOINTS.USER.SEND_EMAIL(), params)
  }

  async checkVerificationCode(
    params: RequestBody<'/auth/check-verification-code', 'post'>,
  ): Promise<ResponseBody<'/auth/check-verification-code', 'post'>> {
    return await api.post(API_ENDPOINTS.USER.CHECK_CODE(), params)
  }

  async changePassword(
    params: RequestBody<'/auth/change-password', 'patch'>,
  ): Promise<ResponseBody<'/auth/change-password', 'patch'>> {
    return await api.patch(API_ENDPOINTS.USER.CHANGE_PASSWORD(), params)
  }

  async checkId(
    params: RequestBody<'/auth/check-id', 'post'>,
  ): Promise<ResponseBody<'/auth/check-id', 'post'>> {
    return await api.post(API_ENDPOINTS.USER.CHECK_ID(), params)
  }
}

export const authService = new AuthService()
