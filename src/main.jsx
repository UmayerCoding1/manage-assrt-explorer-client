
import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Routes'
import AuthProvider from './provider/AuthProvider'
import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>
  </AuthProvider>
)
