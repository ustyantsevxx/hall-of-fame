import { Head, Html, Main, NextScript } from 'next/document'

import { BRAND_NAME } from '../app/constants'
import { tailwindTheme } from '../app/core/tailwind-theme'

const CustomDocument = () => {
  return (
    <Html lang="ru">
      <Head>
        <meta name="theme-color" content={tailwindTheme.colors.green.DEFAULT} />
        <meta name="description" content={BRAND_NAME} />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default CustomDocument
