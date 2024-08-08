import { getCookie } from 'cookies-next'
import Head from 'next/head'
import { useEffect } from 'react'
import { dehydrate, QueryClient } from 'react-query'

import { AUTH_REDIRECTED_FROM_KEY } from '../api/modules/auth/auth.constants'
import { getProductsGroupedByCategoriesQuery } from '../api/modules/products/hooks/useProductsGroupedByCategories'
import { constructPageTitle } from '../app/core/nextjs'
import {
  GetServerSidePropsWithSsrState,
  NextPageWithGetLayout
} from '../app/types'
import { ActiveOrders } from '../components/ActiveOrders'
import { IndexPageMenu } from '../components/IndexPageMenu'
import { IndexPagePaymentErrorHandler } from '../components/IndexPagePaymentErrorHandler'
import { IndexPageWorkHours } from '../components/IndexPageWorkHours'
import { LayoutDefault } from '../components/LayoutDefault'
import { StoriesSlider } from '../components/StoriesSlider'
import { useDialogsState } from '../store/dialogs'

export const getServerSideProps: GetServerSidePropsWithSsrState = async () => {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery(getProductsGroupedByCategoriesQuery())
  ])

  return {
    props: {
      ssrState: dehydrate(queryClient)
    }
  }
}

const IndexPage: NextPageWithGetLayout = () => {
  const { setAuthModalOpened } = useDialogsState()

  useEffect(() => {
    if (getCookie(AUTH_REDIRECTED_FROM_KEY)) {
      setAuthModalOpened(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>{constructPageTitle('xx')}</title>
      </Head>

      <h1 className="sr-only">xx</h1>

      <div className="container mt-8 md:mt-15">
        <StoriesSlider className="!-mx-16 xl:!mx-0" />

        <IndexPageWorkHours className="mt-16 md:mt-30" />

        <ActiveOrders className="mt-30 hidden lg:block" />

        <IndexPageMenu className="mt-30 md:mt-60" />

        <IndexPagePaymentErrorHandler />
      </div>
    </>
  )
}

IndexPage.getLayout = page => (
  <LayoutDefault withSecondHeader>{page}</LayoutDefault>
)

export default IndexPage
