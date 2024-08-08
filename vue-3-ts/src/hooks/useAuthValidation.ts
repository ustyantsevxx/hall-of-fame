import { string } from 'yup'

import { AuthService } from '@/api/modules/auth'

export const useAuthValidation = () => {
  return {
    getPasswordRules: () =>
      string()
        .test(
          'onlyAllowedSymbols',
          'xx xx xx xx xx xx xx xx',
          (value: string | undefined) =>
            AuthService.validatePassword(value || '')
        )
        .min(8, 'xx xx xx 8 xx')
        .max(20, 'xx xx xx 20 xx')
        .required('xx xx xx xx xx'),
    getEmailForRegistrationRules: () =>
      string()
        .test(
          'emailInUse',
          'xx "E-mail" xx xx',
          async (value: string | undefined) => {
            return typeof value === 'string' && value?.length > 0
              ? !(await AuthService.checkEmailInUse(value))
              : true
          }
        )
        .email('xx "E-mail"')
        .required('xx xx xx "E-mail"')
  }
}
