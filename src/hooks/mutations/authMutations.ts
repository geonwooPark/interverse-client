import { authKeys } from '@hooks/queries/authQueries'
import { RequestBody, ResponseBody } from '@interfaces/api'
import { authService } from '@services/authService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setLocalStorageItem } from '@utils/localStorage'
import { AxiosError } from 'axios'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseBody<'/auth/login', 'post'>,
    AxiosError,
    RequestBody<'/auth/login', 'post'>
  >({
    mutationFn: (params) => authService.login(params),
    onSuccess: (result) => {
      const { message, data } = result

      setLocalStorageItem('interverse_token', data?.token)
      queryClient.setQueryData(authKeys.me(), data?.user)
    },
  })
}

export const useSignUpMutation = () => {
  return useMutation<
    ResponseBody<'/auth/signup', 'post'>,
    AxiosError,
    RequestBody<'/auth/signup', 'post'>
  >({
    mutationFn: (params) => authService.signup(params),
  })
}

export const useChangePasswordMutation = () => {
  return useMutation<
    ResponseBody<'/auth/change-password', 'patch'>,
    AxiosError,
    RequestBody<'/auth/change-password', 'patch'>
  >({
    mutationFn: (params) => authService.changePassword(params),
  })
}

export const useCheckIdMutation = () => {
  return useMutation<
    ResponseBody<'/auth/check-id', 'post'>,
    AxiosError,
    RequestBody<'/auth/check-id', 'post'>
  >({
    mutationFn: (params) => authService.checkId(params),
  })
}

export const useSendVerificationEmailMutation = () => {
  return useMutation<
    ResponseBody<'/auth/send-verification-email', 'post'>,
    AxiosError,
    RequestBody<'/auth/send-verification-email', 'post'>
  >({
    mutationFn: (params) => authService.sendVerificationEmail(params),
  })
}

export const useCheckVerificationCode = () => {
  return useMutation<
    ResponseBody<'/auth/check-verification-code', 'post'>,
    AxiosError,
    RequestBody<'/auth/check-verification-code', 'post'>
  >({
    mutationFn: (params) => authService.checkVerificationCode(params),
  })
}
