import clsx from 'clsx'
import { FC } from 'react'

type Props = {
  label: string
  value: string
  spread?: boolean
  className?: string
}

export const ProductViewAttributesItem: FC<Props> = ({
  label,
  value,
  className,
  spread = false
}) => {
  return (
    <div
      className={clsx('flex space-x-6', className, spread && 'justify-between')}
    >
      <dt className="text-black/50">{label}</dt>
      <dd className="text-black">{value}</dd>
    </div>
  )
}
