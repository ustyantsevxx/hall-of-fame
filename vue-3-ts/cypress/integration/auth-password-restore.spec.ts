/* eslint-disable no-restricted-imports */

import { VERIFIED_USER_EMAIL } from '../../mock/constants'

const typeEmail = (email: string) => {
  cy.getBySel('email').type(email)
}
const clickSubmit = () => cy.getBySel('submit-button').click()

describe('Password restore page', () => {
  beforeEach(() => {
    cy.visit('/auth/password/restore')
  })

  it('Performs restore password flow', () => {
    typeEmail(VERIFIED_USER_EMAIL)
    clickSubmit()
    cy.contains('Ссылка для восстановления пароля отправлена на ваш Email')
  })

  it('Does not allow to submit if email is empty', () => {
    cy.getBySel('submit-button').should('be.disabled')
  })

  it('Displays error message if email format is incorrect', () => {
    typeEmail('adsf@.')
    cy.getBySel('email').then($el => {
      expect(($el[0] as any).validationMessage).to.not.be.empty
    })
  })

  it('Autofill email input if came from login page', () => {
    const predefinedEmail = 'pre@mail.com'

    cy.visit('/auth/login')
    typeEmail(predefinedEmail)

    cy.getBySel('restore-password-link').click()

    cy.getBySel('email').should('have.value', predefinedEmail)
  })
})
