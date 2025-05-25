import { roomsKeys } from '@hooks/queries/roomsQueries'
import { RequestBody, ResponseBody } from '@interfaces/api'
import { roomsService } from '@services/roomsService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseBody<'/rooms', 'post'>,
    AxiosError,
    RequestBody<'/rooms', 'post'>
  >({
    mutationFn: (params) => roomsService.createRoom(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.base })
    },
  })
}
