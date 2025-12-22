import { RequestBody, ResponseBody } from '@interfaces/api'
import { api } from '@utils/api'

class RoomsService {
  async getRooms(params?: {
    page?: number
    limit?: number
  }): Promise<ResponseBody<'/rooms', 'get'>> {
    return await api.get('/rooms', { params })
  }

  async getSingleRoom(
    roomId: string,
    params?: RequestBody<'/rooms/{roomId}', 'get'>,
  ): Promise<ResponseBody<'/rooms/{roomId}', 'get'>> {
    return await api.get(`/rooms/${roomId}`)
  }

  async joinRoom(
    roomId: string,
    params?: RequestBody<'/rooms/{roomId}/join', 'post'>,
  ): Promise<ResponseBody<'/rooms/{roomId}/join', 'post'>> {
    return await api.post(`/rooms/${roomId}/join`)
  }

  async createRoom(
    params: RequestBody<'/rooms', 'post'>,
  ): Promise<ResponseBody<'/rooms', 'post'>> {
    return await api.post('/rooms', params)
  }

  async deleteRoom(
    roomId: string,
    params?: RequestBody<'/rooms/{roomId}', 'delete'>,
  ): Promise<ResponseBody<'/rooms/{roomId}', 'delete'>> {
    return await api.delete(`/rooms/${roomId}`, params)
  }

  async checkPassword(
    roomId: string,
    params?: RequestBody<'/rooms/{roomId}/check-password', 'post'>,
  ): Promise<ResponseBody<'/rooms/{roomId}/check-password', 'post'>> {
    return await api.post(`/rooms/${roomId}/check-password`, params)
  }
}

export const roomsService = new RoomsService()
