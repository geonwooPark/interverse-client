import { RequestBody, ResponseBody } from '@interfaces/api'
import { api } from '@utils/api'

class RoomsService {
  async getRooms(): Promise<ResponseBody<'/rooms', 'get'>> {
    return await api.get('/rooms')
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
    params?: RequestBody<'/rooms/{roomId}/password', 'post'>,
  ): Promise<ResponseBody<'/rooms/{roomId}/password', 'post'>> {
    return await api.post(`/rooms/${roomId}/password`, params)
  }
}

export const roomsService = new RoomsService()
