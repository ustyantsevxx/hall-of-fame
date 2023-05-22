import clsx from 'clsx'
import { FC } from 'react'
import { useFormContext, UseFormReturn } from 'react-hook-form'

import { AppTextarea } from './AppTextarea'
import { CheckoutFormData } from './Checkout.types'

type Props = {
  className?: string
}

export const CheckoutConfigComment: FC<Props> = ({ className }) => {
  const { register }: UseFormReturn<CheckoutFormData> = useFormContext()

  return (
    <AppTextarea
      className={clsx(className, 'h-[112px] resize-none')}
      placeholder="Комментарий"
      {...register('comment')}
    />
  )
}
