import { assetsService } from '@services/assetsService'
import { useSuspenseQuery } from '@tanstack/react-query'

// 쿼리키
export const assetsKeys = {
  base: ['assets'],
  maps() {
    return [...this.base, 'maps']
  },
  characters() {
    return [...this.base, 'characters']
  },
}

// ----------------------------------------------------------------------

export const useMapsQuery = () => {
  return useSuspenseQuery({
    queryKey: assetsKeys.maps(),
    queryFn: () => assetsService.getMaps(),
    select: (result) => result.data,
  })
}

export const useCharactersQuery = () => {
  return useSuspenseQuery({
    queryKey: assetsKeys.characters(),
    queryFn: () => assetsService.getCharacters(),
    select: (result) => result.data,
  })
}
