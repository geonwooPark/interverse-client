import { mapsService } from '@services/mapsService'
import { useSuspenseQuery } from '@tanstack/react-query'

// 쿼리키
export const mapsKeys = {
  base: ['maps'],
}

// ----------------------------------------------------------------------

export const useMapsQuery = () => {
  return useSuspenseQuery({
    queryKey: mapsKeys.base,
    queryFn: () => mapsService.getMaps(),
  })
}
