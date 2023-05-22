import Head from 'next/head'
import { useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { dehydrate, QueryClient } from 'react-query'

import {
  getOrdersQuery,
  useOrdersInfinite
} from '../../api/modules/orders/hooks/useOrdersInfinite'
import { constructPageTitle } from '../../app/core/nextjs'
import {
  GetServerSidePropsWithSsrState,
  NextPageWithGetLayout
} from '../../app/types'
import { AppTransition } from '../../components/AppTransition'
import { HistoryOrderItem } from '../../components/HistoryOrderItem'
import { LayoutDefault } from '../../components/LayoutDefault'
import { PageTitle } from '../../components/PageTitle'

export const getServerSideProps: GetServerSidePropsWithSsrState = async () => {
  const queryClient = new QueryClient()

  await Promise.all([queryClient.prefetchQuery(getOrdersQuery())])

  return {
    props: {
      ssrState: dehydrate(queryClient)
    }
  }
}

const ProfileOrdersPage: NextPageWithGetLayout = () => {
  const {
    data: historyOrderPages,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading
  } = useOrdersInfinite()
  const historyOrders = useMemo(() => {
    return historyOrderPages?.pages.flatMap(page => page.data) || []
  }, [historyOrderPages])

  const hasOrders = historyOrders?.length || 0 > 0

  return (
    <>
      <Head>
        <title>{constructPageTitle('История заказов')}</title>
      </Head>

      <div className="container mt-18 md:mt-33">
        <PageTitle title="История заказов" goBackHref="/profile" />

        <AppTransition show={!isLoading}>
          <InfiniteScroll
            dataLength={historyOrders?.length || 0}
            hasMore={hasNextPage || false}
            next={() => {
              fetchNextPage()
            }}
            loader={<></>}
            className="-m-18 p-18"
          >
            {hasOrders ? (
              <div className="mt-20 grid grid-cols-12 md:mt-30">
                <div className="col-span-12 space-y-14 lg:col-span-6">
                  {historyOrders?.map(order => (
                    <HistoryOrderItem key={order.id} order={order} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-20 pl-52 text-black/50 text-regular-17">
                <p>История заказов пуста</p>
              </div>
            )}
          </InfiniteScroll>
        </AppTransition>

        {(isLoading || isFetchingNextPage) && (
          <div className="mt-20 w-full pl-52 text-black/50 text-regular-17 md:w-[757px]">
            Загрузка...
          </div>
        )}
      </div>
    </>
  )
}

ProfileOrdersPage.getLayout = page => (
  <LayoutDefault withSecondHeader>{page}</LayoutDefault>
)

export default ProfileOrdersPage
