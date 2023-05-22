import clsx from 'clsx'
import { FC } from 'react'

type Props = {
  className?: string
  title: string
  subtitle: string
  indicatorColor: string
}

export const DeliveryLegendCourierZoneInfo: FC<Props> = ({
  className,
  title,
  subtitle,
  indicatorColor
}) => {
  return (
    <div className={clsx('flex', className)}>
      <div
        className={clsx('mt-4 h-18 w-18 rounded-full opacity-30')}
        style={{ backgroundColor: indicatorColor }}
      ></div>

      <div className="ml-8">
        <div className="text-regular-17">{title}</div>
        <div className="mt-2 text-black/50 text-regular-15">{subtitle}</div>
      </div>
    </div>
  )
}
