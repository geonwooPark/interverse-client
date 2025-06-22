import useToast from '@hooks/useToast'
import { RequestBody, ResponseBody } from '@interfaces/api'
import { authService } from '@services/authService'
import { isLoggedInStore } from '@store/index'
import { useMutation } from '@tanstack/react-query'
import { setLocalStorageItem } from '@utils/localStorage'
import { AxiosError } from 'axios'
import { useStore } from 'ventileco-store'

export const useLoginMutation = () => {
  const toast = useToast()

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
  const toast = useToast()

  return useMutation<
    ResponseBody<'/auth/signup', 'post'>,
    AxiosError,
    RequestBody<'/auth/signup', 'post'>
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
  const toast = useToast()

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
  const toast = useToast()

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
