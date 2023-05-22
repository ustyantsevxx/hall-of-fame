import 'swiper/css'
import 'swiper/css/effect-creative'

import Head from 'next/head'
import { dehydrate, QueryClient } from 'react-query'

import {
  getRestaurantInfoQuery,
  useRestaurantInfo
} from '../api/modules/restaurants/hooks/useRestaurantInfo'
import { constructPageTitle } from '../app/core/nextjs'
import {
  GetServerSidePropsWithSsrState,
  NextPageWithGetLayout
} from '../app/types'
import { AboutPageAdvantages } from '../components/AboutPageAdvantages'
import { AboutPageContactsForm } from '../components/AboutPageContactForm'
import { AboutPageContactsCard } from '../components/AboutPageContactsCard'
import { AboutPageImageSlider } from '../components/AboutPageImageSlider'
import { LayoutDefault } from '../components/LayoutDefault'
import { PageTitle } from '../components/PageTitle'
import { WysiwygContentRenderer } from '../components/WysiwygContentRenderer'
import { formatPhoneNumber } from '../utils'

export const getServerSideProps: GetServerSidePropsWithSsrState = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(getRestaurantInfoQuery())

  return {
    props: {
      ssrState: dehydrate(queryClient)
    }
  }
}

const AboutPage: NextPageWithGetLayout = () => {
  const { data: content } = useRestaurantInfo()

  return (
    <>
      <Head>
        <title>{constructPageTitle('О нас')}</title>
      </Head>

      <section className="container mt-4 md:mt-28">
        <PageTitle title="О нас" />

        <div className="mt-20 grid grid-cols-12 gap-x-16 md:mt-32">
          <div className="col-span-full md:col-span-6">
            <WysiwygContentRenderer
              className="text-regular-17"
              htmlContent={content?.about_us || ''}
            />
          </div>

          <div className="col-span-5 col-start-8 hidden md:block lg:col-span-4 lg:col-start-9">
            <AboutPageContactsCard />
          </div>
        </div>
      </section>

      <section className="flex flex-col">
        <div className="container mt-30">
          <AboutPageAdvantages advantages={content?.advantages ?? []} />
        </div>

        {(content?.media.length ?? 0) > 0 && (
          <AboutPageImageSlider
            className="order-first mt-40 md:order-last md:mt-[90px]"
            images={content?.media ?? []}
          />
        )}
      </section>

      <section className="mt-14 md:hidden">
        <AboutPageContactsCard className="!bg-transparent" />
      </section>

      <section className="container mt-40 items-center md:mt-90 md:flex">
        <AboutPageContactsForm className="md:min-w-[560px]" />

        <div className="mt-20 space-y-10 text-black/50 text-regular-17 md:mt-0 md:ml-100">
          {content?.legal_name && <p>{content?.legal_name}</p>}
          {content?.inn && <p>ИНН {content?.inn}</p>}
          {content?.legal_address && <p>Адрес: {content?.legal_address}</p>}
          {content?.legal_phone && (
            <p>Телефон: {formatPhoneNumber(content?.legal_phone ?? '')}</p>
          )}
        </div>
      </section>
    </>
  )
}

AboutPage.getLayout = page => (
  <LayoutDefault withSecondHeader>{page}</LayoutDefault>
)

export default AboutPage
