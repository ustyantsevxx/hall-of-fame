import { MutableRefObject, useRef, useState } from 'react'
import { FC } from 'react'
import { flushSync } from 'react-dom'

import { AuthService } from '../api/modules/auth/auth.service'
import { ModalSignInFormCodeForm } from './ModalSignInFormCodeForm'
import { ModalSignInFormPhoneForm } from './ModalSignInFormPhoneForm'

type Props = {
  className?: string
}

export const ModalSignInForm: FC<Props> = ({ className }) => {
  const codeInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const [phone, setPhone] = useState('')

  const handlePhoneSubmit = (phone: string) => {
    // optimistically ignore promise here
    AuthService.sendSmsCode(phone)
    flushSync(() => setPhone(phone))
    codeInputRef.current?.focus()
  }

  return (
    <div className={className}>
      <ModalSignInFormPhoneForm onSubmit={handlePhoneSubmit} />
      <ModalSignInFormCodeForm
        className="mt-14 md:mt-20 "
        phone={phone}
        codeInputRef={codeInputRef}
      />
    </div>
  )
}
