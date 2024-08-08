/* eslint-disable no-restricted-imports */

import {
  NOT_VERIFIED_USER_EMAIL,
  NOT_VERIFIED_USER_PASSWORD,
  VERIFIED_USER_EMAIL,
  VERIFIED_USER_PASSWORD
} from '../../mock/constants'

const typeEmailAndPassword = (email, password) => {
  cy.getBySel('email').type(email)
  cy.getBySel('password').type(password)
}

const clickSubmit = () => cy.getBySel('submit').click()

const login = (email, password) => {
  typeEmailAndPassword(email, password)
  clickSubmit()
}

const toggleSymbolsVisibility = () =>
  cy.getBySel('password-toggle-button').click()

const checkInputType = (type: string) => {
  cy.getBySel('password').then($el => {
    expect($el[0].type).to.be.equals(type)
  })
}

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/auth/login')
  })

  it('Renders login form', () => {
    cy.get('h1').contains('xx')
    cy.get('form')
  })

  it('Performs login flow', () => {
    login(VERIFIED_USER_EMAIL, VERIFIED_USER_PASSWORD)
    cy.location('pathname').should('eq', '/')
  })

  it('Displays error message when wrong password', () => {
    login(VERIFIED_USER_EMAIL, '1')
    cy.contains('xx xx xx xx')
  })

  it('Displays error message when not registered email', () => {
    login('extraemaildfakds@emaisdvfdsvl.com', 'password')
    cy.contains('xx xx xx xx')
  })

  it('Displays form native error when incorrect email format', () => {
    typeEmailAndPassword(',,234@.com', '1')
    cy.get('input[type="email"]').then($el => {
      expect(($el[0] as any).validationMessage).to.not.be.empty
    })
  })

  it('Displays error when email is not verified', () => {
    login(NOT_VERIFIED_USER_EMAIL, NOT_VERIFIED_USER_PASSWORD)

    cy.contains('Email xx xx')
  })

  it('Password input toggles symbols visibility', () => {
    checkInputType('password')

    toggleSymbolsVisibility()
    checkInputType('text')

    toggleSymbolsVisibility()
    checkInputType('password')
  })
})
