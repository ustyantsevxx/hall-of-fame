import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'

import { ENV } from '../app/constants/environment'
import { constructPageTitle } from '../app/core/nextjs'
import { NextPageWithGetLayout } from '../app/types'
import { DeliveryInfo } from '../components/DeliveryInfo'
import { DeliveryLegend } from '../components/DeliveryLegend'
import { DeliveryMap } from '../components/DeliveryMap'
import { LayoutDefault } from '../components/LayoutDefault'
import { PageTitle } from '../components/PageTitle'
import { useIsServer } from '../hooks/useIsServer'

const DeliveryPage: NextPageWithGetLayout = () => {
  const [mapReady, setMapReady] = useState(false)
  const isServer = useIsServer()

  if (!isServer && (window as any).ymaps && !mapReady) {
    setMapReady(true)
  }

  const handleMapLoaded = () => {
    ymaps.ready(() => {
      setMapReady(true)
    })
  }

  return (
    <>
      <Head>
        <title>{constructPageTitle('xx')}</title>
      </Head>

      <Script
        id="script-ymaps"
        src={`https://api-maps.yandex.ru/2.1/?apikey=${ENV.YMAPS_API_KEY}&lang=ru_RU`}
        onLoad={handleMapLoaded}
      />

      <div className="container mt-4 md:mt-28">
        <PageTitle title="xx" />

        <div className="-mx-16 mt-32 md:mx-0">
          <DeliveryInfo />
        </div>

        {mapReady && (
          <div className="relative">
            <DeliveryLegend className="z-10 mt-30 md:absolute md:right-40 md:bottom-34 md:top-34 md:mt-0 md:w-[356px]" />

            <DeliveryMap className="mt-24 h-[439px] w-full md:mt-30 md:h-[555px]" />
          </div>
        )}
      </div>
    </>
  )
}

DeliveryPage.getLayout = page => (
  <LayoutDefault hideCartFloatingButton withSecondHeader>
    {page}
  </LayoutDefault>
)

export default DeliveryPage
