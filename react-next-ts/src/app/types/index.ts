import { GetServerSideProps, NextPage } from 'next'
import { ReactNode } from 'react'
import { DehydratedState } from 'react-query'

export type NextPageWithGetLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode
}

export type GetServerSidePropsWithSsrState = GetServerSideProps<{
  ssrState?: DehydratedState
}>
