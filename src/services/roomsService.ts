import { API_ENDPOINTS } from '@constants/api'
import { RequestBody, ResponseBody } from '@interfaces/api'
import { api } from '@utils/api'

class RoomsService {
  async getRooms(): Promise<ResponseBody<'/rooms', 'get'>> {
    return await api.get(API_ENDPOINTS.ROOMS.LIST())
  }

  async getSingleRoom(
    roomId: string,
    params?: RequestBody<'/rooms/{roomId}', 'get'>,
  ): Promise<ResponseBody<'/rooms/{roomId}', 'get'>> {
    return await api.get(API_ENDPOINTS.ROOMS.SINGLE_ROOM(roomId))
  }

  async joinRoom(
    params: RequestBody<'/rooms/{roomId}/join', 'post'>,
  ): Promise<ResponseBody<'/rooms/{roomId}/join', 'post'>> {
    return await api.post(API_ENDPOINTS.ROOMS.JOIN(params))
  }

  async createRoom(
    params: RequestBody<'/rooms', 'post'>,
  ): Promise<ResponseBody<'/rooms', 'post'>> {
    return await api.post(API_ENDPOINTS.ROOMS.CREATE(), params)
  }

  async deleteRoom(
    roomId: string,
    params?: RequestBody<'/rooms/{roomId}', 'delete'>,
  ): Promise<ResponseBody<'/rooms/{roomId}', 'delete'>> {
    return await api.delete(`${API_ENDPOINTS.ROOMS.DELETE(roomId)}`, params)
  }

  async checkPassword(
    roomId: string,
    params?: RequestBody<'/rooms/{roomId}/password', 'post'>,
  ): Promise<ResponseBody<'/rooms/{roomId}/password', 'post'>> {
    return await api.post(API_ENDPOINTS.ROOMS.CHECK_PASSWORD(roomId), params)
  }
}

export const roomsService = new RoomsService()
