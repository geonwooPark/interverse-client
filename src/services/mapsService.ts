import { API_ENDPOINTS } from '@constants/api'
import { ResponseBody } from '@interfaces/api'
import { api } from '@utils/api'

class MapsService {
  async getMaps(): Promise<ResponseBody<'/maps', 'get'>> {
    return await api.get(API_ENDPOINTS.MAPS.LIST())
  }
}

export const mapsService = new MapsService()
