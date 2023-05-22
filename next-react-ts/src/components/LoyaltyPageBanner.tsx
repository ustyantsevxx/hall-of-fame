import { FC } from 'react'

import { useLoyaltyPageContent } from '../api/modules/faq/hooks/useLoyaltyPageContent'
import LoyaltyPageImage from '../assets/images/loyalty-page.png'
import { BannerImage } from './BannerImage'
import { WysiwygContentRenderer } from './WysiwygContentRenderer'

type Props = {
  className?: string
}

export const LoyaltyPageBanner: FC<Props> = ({ className }) => {
  const { data } = useLoyaltyPageContent()

  return (
    <BannerImage
      className={className}
      imageSrc={LoyaltyPageImage}
      titleRenderer={() => (
        <WysiwygContentRenderer
          className="text-white"
          htmlContent={data?.body ?? ''}
        />
      )}
    />
  )
}
