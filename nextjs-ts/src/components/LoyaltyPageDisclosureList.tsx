import { FC } from 'react'

import { useLoyaltyPageContent } from '../api/modules/faq/hooks/useLoyaltyPageContent'
import { LoyaltyPageDisclosure } from './LoyaltyPageDisclosure'

type Props = any

export const LoyaltyPageDisclosureList: FC<Props> = () => {
  const { data } = useLoyaltyPageContent()

  return (
    <>
      <ul className="space-y-20">
        {data?.faqs?.map((question, i) => (
          <li key={i}>
            <LoyaltyPageDisclosure
              title={question.question}
              description={question.answer}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
