import { useToastContext } from '@providers/ToastProvider'

export default function useToast() {
  const { addToast } = useToastContext()

  return {
    success: addToast('success'),
    info: addToast('info'),
    error: addToast('error'),
  }
}
