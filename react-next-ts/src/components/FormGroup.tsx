import clsx from 'clsx'
import { FC, FieldsetHTMLAttributes } from 'react'

import CancelSvg from '../assets/svg/Cancel.svg'
import SuccessSvg from '../assets/svg/Success.svg'

type Props = FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  errorMessage?: string | boolean
  successMessage?: string | boolean
  onReset?: () => void
}

export const FormGroup: FC<Props> = ({
  successMessage,
  errorMessage,
  className,
  children,
  onReset,
  ...attrs
}) => {
  return (
    <fieldset className={clsx('relative', className)} {...attrs}>
      {children}

      {!!errorMessage && (
        <div className="absolute right-13 top-1/2 flex -translate-y-1/2 items-center">
          <p className="mr-8 text-[#FF3B30]">{errorMessage}</p>
          <button type="button" onClick={() => onReset?.()}>
            <CancelSvg />
          </button>
        </div>
      )}

      {!!successMessage && (
        <div className="absolute right-13 top-1/2 flex -translate-y-1/2 items-center text-green">
          <p className="mr-8">{successMessage}</p>
          <SuccessSvg width={24} height={24} />
        </div>
      )}
    </fieldset>
  )
}
