import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './managers/GameManager.ts'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ToastProvider from '@providers/ToastProvider/index.tsx'
import ModalProvider from '@providers/ModalProvider.tsx'
import React from 'react'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ToastProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    ,
  </React.StrictMode>,
)
