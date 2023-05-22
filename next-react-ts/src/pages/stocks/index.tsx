import Head from 'next/head'
import { useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useStocksInfinite } from '../../api/modules/stocks/hooks/useStocksInfinite'
import { constructPageTitle } from '../../app/core/nextjs'
import { NextPageWithGetLayout } from '../../app/types'
import { AppTransition } from '../../components/AppTransition'
import { LayoutDefault } from '../../components/LayoutDefault'
import { PageTitle } from '../../components/PageTitle'
import { StocksPageCard } from '../../components/StocksPageCard'

const StocksPage: NextPageWithGetLayout = () => {
  const {
    data: stocksPages,
    hasNextPage,
    fetchNextPage,
    isLoading
  } = useStocksInfinite()
  const stocks = useMemo(() => {
    return stocksPages?.pages?.flatMap(page => page.data) || []
  }, [stocksPages])

  return (
    <>
      <Head>
        <title>{constructPageTitle('Акции')}</title>
      </Head>

      <div className="container mt-4 md:mt-28">
        <PageTitle title="Акции" />

        <AppTransition show={stocks.length > 0}>
          <InfiniteScroll
            dataLength={stocks?.length || 0}
            hasMore={!!hasNextPage}
            next={fetchNextPage}
            loader={<></>}
          >
            <div className="mt-20 grid gap-20 sm:grid-cols-2 md:mt-36 lg:grid-cols-3">
              {stocks.map(stock => (
                <StocksPageCard key={stock.id} stock={stock} />
              ))}
            </div>
          </InfiniteScroll>
        </AppTransition>

        <p className="mt-20 pl-52 text-black/50">
          {isLoading && 'Акции загружаются...'}
          {!isLoading && stocks.length === 0 && 'Нет акций'}
        </p>
      </div>
    </>
  )
}

StocksPage.getLayout = page => (
  <LayoutDefault withSecondHeader>{page}</LayoutDefault>
)

export default StocksPage
