import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './services/gameService.ts'
import './locales'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ModalProvider from '@providers/ModalProvider.tsx'
import React from 'react'
import { Toast } from 'ventileco-ui'
import CustomToast from '@components/CustomToast.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ModalProvider>
        <App />
        <Toast maxLength={5} top="24px" right="50%" gap={8} expand="bottom">
          {(toastItem, removeToast) => (
            <CustomToast toastItem={toastItem} removeToast={removeToast} />
          )}
        </Toast>
      </ModalProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  // </React.StrictMode>,
)
