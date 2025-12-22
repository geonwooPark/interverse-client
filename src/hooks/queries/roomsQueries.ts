import { roomsService } from '@services/roomsService'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

// 쿼리키
export const roomsKeys = {
  base: ['rooms'],
  list(page?: number, limit?: number) {
    return [...this.base, 'list', page, limit]
  },
  single_room(id: string) {
    return [...this.base, id]
  },
}

// ----------------------------------------------------------------------

export const useRoomsQuery = (page: number = 1, limit: number = 6) => {
  return useSuspenseQuery({
    queryKey: roomsKeys.list(page, limit),
    queryFn: () => roomsService.getRooms({ page, limit }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 3,
    select: (result) => result.data,
  })
}

export const useSingleRoomQuery = (id: string) => {
  return useQuery({
    queryKey: roomsKeys.single_room(id),
    queryFn: () => roomsService.getSingleRoom(id),
    select: (result) => result.data,
  })
}
