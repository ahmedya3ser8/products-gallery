import { createRoot } from 'react-dom/client'
import AppRouter from './routes/AppRouter'
import { Toaster } from 'react-hot-toast';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient} >
    <AppRouter />
    <Toaster position='top-right' />
  </QueryClientProvider>
)
