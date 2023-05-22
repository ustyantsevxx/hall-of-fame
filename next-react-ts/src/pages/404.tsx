import Head from 'next/head'

import { constructPageTitle } from '../app/core/nextjs'
import { NextPageWithGetLayout } from '../app/types'
import { LayoutDefault } from '../components/LayoutDefault'

const Error404Page: NextPageWithGetLayout = () => {
  return (
    <>
      <Head>
        <title>{constructPageTitle('Страница не найдена')}</title>
      </Head>

      <div className="container flex grow items-center justify-center">
        <p className="text-black/50">Страница не найдена</p>
      </div>
    </>
  )
}

Error404Page.getLayout = page => <LayoutDefault>{page}</LayoutDefault>

export default Error404Page
