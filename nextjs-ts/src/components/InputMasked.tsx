import { IMaskMixin } from 'react-imask'

import { AppInput } from './AppInput'

export const InputMasked = IMaskMixin(({ inputRef, ...props }) => {
  return <AppInput {...props} ref={inputRef} />
})
