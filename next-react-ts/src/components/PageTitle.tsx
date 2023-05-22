import clsx from 'clsx'
import Link from 'next/link'
import React, { FC, MouseEvent, ReactNode } from 'react'

import BackArrowCircleSvg from '../assets/svg/BackArrowCircle.svg'

type Props = {
  title: string
  goBackHref?: string
  goBackClickHandler?: (e: MouseEvent<HTMLAnchorElement>) => void
  after?: ReactNode
  className?: string
}

export const PageTitle: FC<Props> = ({
  title,
  after,
  goBackHref = '/',
  goBackClickHandler,
  className
}) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <Link href={goBackHref} passHref>
        <a
          className="flex h-28 w-28 items-center justify-center rounded-full text-pink transition-colors hover:text-pink-hover md:h-32 md:w-32"
          onClick={goBackClickHandler}
        >
          <BackArrowCircleSvg className="h-full w-full" />
        </a>
      </Link>

      <h1 className="ml-10 block text-medium-20 md:ml-17  md:text-medium-30">
        {title}
      </h1>

      {after}
    </div>
  )
}
