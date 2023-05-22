import clsx from 'clsx'
import Head from 'next/head'
import { dehydrate, QueryClient } from 'react-query'

import { useAuth } from '../api/modules/auth/hooks/useAuth'
import {
  getLoyaltyPageContentQuery,
  useLoyaltyPageContent
} from '../api/modules/faq/hooks/useLoyaltyPageContent'
import { constructPageTitle } from '../app/core/nextjs'
import {
  GetServerSidePropsWithSsrState,
  NextPageWithGetLayout
} from '../app/types'
import { LayoutDefault } from '../components/LayoutDefault'
import { LoyaltyPageBanner } from '../components/LoyaltyPageBanner'
import { LoyaltyPageCoinsBalanceCard } from '../components/LoyaltyPageCoinsBalanceCard'
import { LoyaltyPageDisclosureList } from '../components/LoyaltyPageDisclosureList'
import { PageTitle } from '../components/PageTitle'

export const getServerSideProps: GetServerSidePropsWithSsrState = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(getLoyaltyPageContentQuery())
  return {
    props: {
      ssrState: dehydrate(queryClient)
    }
  }
}

const LoyaltyPage: NextPageWithGetLayout = () => {
  const { user } = useAuth()
  const { data } = useLoyaltyPageContent()

  const pageTitle = data?.title || 'Программа лояльности'

  return (
    <>
      <Head>
        <title>{constructPageTitle(pageTitle)}</title>
      </Head>

      <div className="container">
        <PageTitle className="mt-4 md:mt-22" goBackHref="/" title={pageTitle} />

        <div className="mt-32 grid gap-32 md:grid-cols-12 lg:gap-x-60">
          <section className="flex flex-col md:col-span-5 lg:col-span-4">
            <LoyaltyPageCoinsBalanceCard
              className={clsx({
                'order-last mt-24 md:order-first md:mt-0': !user
              })}
            />
            <LoyaltyPageBanner />
          </section>

          <section className="mt-24  md:col-span-7 md:mt-0 lg:col-span-8 xl:col-span-6">
            <LoyaltyPageDisclosureList />
          </section>
        </div>
      </div>
    </>
  )
}

LoyaltyPage.getLayout = page => (
  <LayoutDefault withSecondHeader waitAuth>
    {page}
  </LayoutDefault>
)

export default LoyaltyPage
