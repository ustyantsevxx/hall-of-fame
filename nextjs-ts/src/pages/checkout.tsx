import Head from 'next/head'
import { dehydrate, QueryClient } from 'react-query'

import { getAddressesQuery } from '../api/modules/addresses/hooks/useAddresses'
import { getDeliveryMethodsQuery } from '../api/modules/delivery-methods/hooks/useDeliveryMethods'
import { getPaymentMethodsQuery } from '../api/modules/payment-methods/hooks/usePaymentMethods'
import { constructPageTitle } from '../app/core/nextjs'
import {
  GetServerSidePropsWithSsrState,
  NextPageWithGetLayout
} from '../app/types'
import { Checkout } from '../components/Checkout'
import { LayoutDefault } from '../components/LayoutDefault'

export const getServerSideProps: GetServerSidePropsWithSsrState = async () => {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery(getAddressesQuery()),
    queryClient.prefetchQuery(getDeliveryMethodsQuery()),
    queryClient.prefetchQuery(getPaymentMethodsQuery())
  ])

  return {
    props: {
      ssrState: dehydrate(queryClient)
    }
  }
}

const CheckoutPage: NextPageWithGetLayout = () => {
  return (
    <>
      <Head>
        <title>{constructPageTitle('Оформление заказа')}</title>
      </Head>

      <Checkout />
    </>
  )
}

CheckoutPage.getLayout = page => (
  <LayoutDefault
    authorized
    hideCartFloatingButton
    footerClassName="hidden md:block"
  >
    {page}
  </LayoutDefault>
)

export default CheckoutPage
