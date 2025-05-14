import { API_ENDPOINTS } from '@constants/api'
import { api } from '@utils/api'

class RoomsService {
  async getRooms() {
    return await api.get(API_ENDPOINTS.ROOMS.LIST())
  }

  async getSingleRoom(roomId: string): Promise<any> {
    return await api.get(API_ENDPOINTS.ROOMS.SINGLE_ROOM(roomId))
  }

  async joinRoom(roomId: string) {
    return await api.post(API_ENDPOINTS.ROOMS.JOIN(roomId))
  }

  async createRoom({
    title,
    password,
    headCount,
    mapId,
  }: {
    title: string
    password: string
    headCount: number
    mapId?: string
  }) {
    return await api.post(API_ENDPOINTS.ROOMS.CREATE(), {
      title,
      password,
      headCount,
      mapId,
    })
  }

  async deleteRoom(roomId: string) {
    return await api.post(`${API_ENDPOINTS.ROOMS.DELETE(roomId)}`)
  }

  async checkPassword({
    roomId,
    password,
  }: {
    roomId: string
    password: string
  }) {
    return await api.post(API_ENDPOINTS.ROOMS.CHECK_PASSWORD(roomId), {
      password,
    })
  }
}

export const roomsService = new RoomsService()
