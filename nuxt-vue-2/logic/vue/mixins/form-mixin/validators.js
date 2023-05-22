import { maxLength, minLength } from 'vuelidate/lib/validators'

import { AppContainer } from '~/logic/core/app-container'

export const maxLengthValidator = max => {
  return {
    validator: maxLength(max),
    message: AppContainer.i18n.t('max-count-symbols', { count: max })
  }
}

export const minLengthValidator = max => {
  return {
    validator: minLength(max),
    message: AppContainer.i18n.t('min-count-symbols', { count: max })
  }
}

export const strongPasswordValidator = () => {
  return {
    validator(value) {
      return !value || /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value)
    },

    message: AppContainer.i18n.t(
      'password-must-contain-at-least-one-digit-one-lowercase-and-one-uppercase-letter'
    )
  }
}
