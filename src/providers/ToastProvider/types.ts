export type ToastType = 'success' | 'error' | 'info'

export type Toast = {
  type: ToastType
  id: number
  message: string
  duration: number
}
