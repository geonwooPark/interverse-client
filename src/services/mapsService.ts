import { API_ENDPOINTS } from '@constants/api'
import { api } from '@utils/api'

class MapsService {
  async getMaps(): Promise<any> {
    return await api.get(API_ENDPOINTS.MAPS.LIST())
  }
}

export const mapsService = new MapsService()
