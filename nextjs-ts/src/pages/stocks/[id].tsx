import Head from 'next/head'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'

import {
  getStockQuery,
  useStock
} from '../../api/modules/stocks/hooks/useStock'
import { constructPageTitle } from '../../app/core/nextjs'
import {
  GetServerSidePropsWithSsrState,
  NextPageWithGetLayout
} from '../../app/types'
import { BannerImage } from '../../components/BannerImage'
import { LayoutDefault } from '../../components/LayoutDefault'
import { PageTitle } from '../../components/PageTitle'
import { WysiwygContentRenderer } from '../../components/WysiwygContentRenderer'

export const getServerSideProps: GetServerSidePropsWithSsrState = async ({
  params
}) => {
  const queryClient = new QueryClient()
  const stockId = +(params?.id as string) as number
  await queryClient.prefetchQuery(getStockQuery(stockId))
  return { props: { ssrState: dehydrate(queryClient) } }
}

const StockViewPage: NextPageWithGetLayout = () => {
  const router = useRouter()
  const stockId = +(router.query.id as string) as number
  const { data: stock } = useStock(stockId)

  return (
    <>
      <Head>
        <title>{constructPageTitle(stock?.title || 'Акция')}</title>
      </Head>

      <div className="container mt-18 md:mt-33">
        <PageTitle goBackHref="/stocks" title="Акция" />

        {stock && (
          <div className="mt-32 grid gap-30 sm:grid-cols-12 md:gap-60">
            <div className="sm:col-span-5 lg:col-span-4">
              <BannerImage
                titleRenderer={() => (
                  <WysiwygContentRenderer
                    className="text-white"
                    htmlContent={stock.short_body ?? ''}
                  />
                )}
                imageSrc={stock.big_image}
              />
            </div>

            <div className="sm:col-span-7 lg:col-span-8">
              {stock.body && (
                <WysiwygContentRenderer htmlContent={stock.body} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

StockViewPage.getLayout = page => (
  <LayoutDefault withSecondHeader>{page}</LayoutDefault>
)

export default StockViewPage
