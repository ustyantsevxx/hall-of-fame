import { string } from 'yup'

import { AuthService } from '@/api/modules/auth'

export const useAuthValidation = () => {
  return {
    getPasswordRules: () =>
      string()
        .test(
          'onlyAllowedSymbols',
          'Пароль может содержать только латинские буквы и спецсимволы',
          (value: string | undefined) =>
            AuthService.validatePassword(value || '')
        )
        .min(8, 'Минимальная длина пароля 8 символов')
        .max(20, 'Максимальная длина пароля 20 символов')
        .required('Вы не ввели новый пароль'),
    getEmailForRegistrationRules: () =>
      string()
        .test(
          'emailInUse',
          'Данный "E-mail" уже используется',
          async (value: string | undefined) => {
            return typeof value === 'string' && value?.length > 0
              ? !(await AuthService.checkEmailInUse(value))
              : true
          }
        )
        .email('Некорректный "E-mail"')
        .required('Вы не ввели "E-mail"')
  }
}
