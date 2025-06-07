import { ResponseBody } from '@interfaces/api'
import { api } from '@utils/api'

class AssetsService {
  async getMaps(): Promise<ResponseBody<'/assets/maps', 'get'>> {
    return await api.get('/assets/maps')
  }

  async getCharacters(): Promise<ResponseBody<'/assets/characters', 'get'>> {
    return await api.get('/assets/characters')
  }
}

export const assetsService = new AssetsService()
