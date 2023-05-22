import '../assets/css/app.css'
import '../assets/css/tailwind.css'
import '../assets/css/fonts.css'
import '../assets/css/swiper.css'
import '../assets/css/custom-scrollbars.css'
import '../app/plugins'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ReactNode, useEffect, useState } from 'react'

import { AuthService } from '../api/modules/auth/auth.service'
import { constructPageTitle } from '../app/core/nextjs'
import { NextPageWithGetLayout } from '../app/types'
import { ProviderReactQuery } from '../components/ProviderReactQuery'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [initialized, setInitialized] = useState(false)

  if (!initialized) {
    AuthService.applySavedToken()
    setInitialized(true)
  }

  const getLayout =
    (Component as NextPageWithGetLayout).getLayout ||
    ((page: ReactNode) => page)
  const router = useRouter()

  useEffect(() => {
    router.beforePopState(state => {
      state.options.scroll = false
      return true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>{constructPageTitle()}</title>
      </Head>

      <ProviderReactQuery hydrateState={pageProps.ssrState}>
        {getLayout(<Component {...pageProps} />)}
      </ProviderReactQuery>
      <Script id="scroll-restoration">{`window.history.scrollRestoration = "manual"`}</Script>
    </>
  )
}

export default CustomApp
