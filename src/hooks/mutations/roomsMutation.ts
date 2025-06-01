import { roomsKeys } from '@hooks/queries/roomsQueries'
import useToast from '@hooks/useToast'
import { RequestBody, ResponseBody } from '@interfaces/api'
import { roomsService } from '@services/roomsService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient()

  const toast = useToast()

  return useMutation<
    ResponseBody<'/rooms', 'post'>,
    AxiosError,
    RequestBody<'/rooms', 'post'>
  >({
    mutationFn: (params) => roomsService.createRoom(params),
    onSuccess: (result) => {
      const { message } = result

      queryClient.invalidateQueries({ queryKey: roomsKeys.base })
      if (message) {
        toast.success(message)
      }
    },
  })
}

export const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient()

  const toast = useToast()

  return useMutation<
    ResponseBody<'/rooms/{roomId}', 'delete'>,
    AxiosError,
    string
  >({
    mutationFn: (roomId: string) => roomsService.deleteRoom(roomId),
    onSuccess: (result) => {
      const { message } = result

      queryClient.invalidateQueries({ queryKey: roomsKeys.base })
      if (message) {
        toast.success(message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
