import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AnchorHTMLAttributes, FC } from 'react'
import { isSamePath } from 'ufo'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  activeClassName?: string
  shallow?: boolean
}

export const AppLink: FC<Props> = ({
  href,
  children,
  className,
  activeClassName,
  shallow,
  ...attrs
}) => {
  const { route } = useRouter()

  const isActive = isSamePath(href, route)

  return (
    <Link shallow={shallow} passHref href={href}>
      <a
        className={clsx(
          className,
          isActive && ['cursor-default', activeClassName]
        )}
        {...attrs}
      >
        {children}
      </a>
    </Link>
  )
}
