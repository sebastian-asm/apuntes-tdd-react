import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()
export const renderWithProvider = (children: ReactNode) =>
  render(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>)
