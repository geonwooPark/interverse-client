import { _createContext } from '@utils/_createContext'
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { Toast, ToastType } from './types'
import ToastList from './ToastList'

type ToastContextState = {
  addToast: (type: ToastType) => (message: string, duration?: number) => void
  removeToast: (id: number) => void
}

export const [useToastContext, ToastContextProvider] =
  _createContext<ToastContextState>()

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    (type: ToastType) =>
      (message: string, duration: number = 4000) => {
        const id = Date.now()

        setToasts((prevToasts) => [
          ...prevToasts,
          { id, message, type, duration },
        ])

        setTimeout(() => {
          removeToast(id)
        }, duration)
      },
    [],
  )

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const providerValue = useMemo(() => ({ addToast, removeToast }), [])

  return (
    <ToastContextProvider value={providerValue}>
      {children}

      <ToastList toasts={toasts} />
    </ToastContextProvider>
  )
}
