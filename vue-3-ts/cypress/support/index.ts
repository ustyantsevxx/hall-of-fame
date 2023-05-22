/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// eslint-disable-next-line no-restricted-imports
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-test attribute.
       * @example cy.getBySel('email-input')
       */
      getBySel(value: string): Chainable<any>

      /**
       * Custom command to select DOM element by data-test attribute wi contains value.
       * @example cy.getBySelLike('email-input')
       */
      getBySelLike(value: string): Chainable<any>

      /**
       * Login mock user
       * @example cy.login()
       */

      login(): Chainable<any>
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    interface TypeOptions extends Cypress.TypeOptions {
      validationMessage: string
    }
  }
}
