import clsx from 'clsx'
import { FC, ReactNode, useId } from 'react'

import styles from './FormFloatingLabel.module.css'

type InputRenderArgs = {
  id: string
}

type Props = {
  label: string
  className?: string
  children: (args: InputRenderArgs) => ReactNode
}

export const FormFloatingLabel: FC<Props> = ({
  label,
  className,
  children
}) => {
  const id = useId()

  return (
    <div className={clsx(className, styles['app-input-layout'])}>
      {children({ id })}
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
