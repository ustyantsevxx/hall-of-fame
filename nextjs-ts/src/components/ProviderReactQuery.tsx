import dayjs from 'dayjs'
import { FC, ReactNode, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

type Props = {
  hydrateState: unknown
  children: ReactNode
}

export const ProviderReactQuery: FC<Props> = ({ hydrateState, children }) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: dayjs.duration(20, 'seconds').asMilliseconds()
        }
      }
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={hydrateState}>
        {children}
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}
