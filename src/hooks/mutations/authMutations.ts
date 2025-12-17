import { authKeys } from '@hooks/queries/authQueries'
import { RequestBody, ResponseBody } from '@interfaces/api'
import { authService } from '@services/authService'
import { isLoggedInStore } from '@store/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setLocalStorageItem } from '@utils/localStorage'
import { AxiosError } from 'axios'
import { useStore } from 'ventileco-store'
import { toast } from 'ventileco-ui'

export const useLoginMutation = () => {
  const [, setIsLoggedIn] = useStore(isLoggedInStore, (state) => state)

  return useMutation<
    ResponseBody<'/auth/login', 'post'>,
    AxiosError,
    RequestBody<'/auth/login', 'post'>
  >({
    mutationFn: (params) => authService.login(params),
    onSuccess: (result) => {
      const { message, data } = result

      setLocalStorageItem('interverse_token', data?.token)
      setIsLoggedIn(true)
      if (message) {
        toast.success(message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useSignUpMutation = () => {
  return useMutation<
    ResponseBody<'/auth/signup', 'post'>,
    AxiosError,
    FormData
  >({
    mutationFn: (params) => authService.signup(params),
    onSuccess: (result) => {
      const { message } = result

      if (message) {
        toast.success(message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useChangePasswordMutation = () => {
  return useMutation<
    ResponseBody<'/auth/change-password', 'patch'>,
    AxiosError,
    RequestBody<'/auth/change-password', 'patch'>
  >({
    mutationFn: (params) => authService.changePassword(params),
    onSuccess: (result) => {
      const { message } = result

      if (message) {
        toast.success(message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useCheckIdMutation = () => {
  return useMutation<
    ResponseBody<'/auth/check-id', 'post'>,
    AxiosError,
    RequestBody<'/auth/check-id', 'post'>
  >({
    mutationFn: (params) => authService.checkId(params),
    onError: (error) => {
      toast.error(error.message)
    },
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

export const useChangeNicknameMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseBody<'/auth/change-nickname', 'patch'>,
    AxiosError,
    RequestBody<'/auth/change-nickname', 'patch'>
  >({
    mutationFn: (params) => authService.changeNickname(params),
    onSuccess: (result) => {
      const { message } = result

      queryClient.invalidateQueries({ queryKey: authKeys.me() })

      if (message) {
        toast.success(message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useChangeProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    ResponseBody<'/auth/change-profile', 'patch'>,
    AxiosError,
    FormData
  >({
    mutationFn: (params) => authService.changeProfile(params),
    onSuccess: (result) => {
      const { message } = result

      queryClient.invalidateQueries({ queryKey: authKeys.me() })

      if (message) {
        toast.success(message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
