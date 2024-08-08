const typeEmailAndPassword = (email, password) => {
  if (email) {
    cy.getBySel('email-input').type(email)
  }
  if (password) {
    cy.getBySel('password-input').type(password)
  }
}

const clickSubmit = () => cy.getBySel('submit-button').click()

const register = (email = '', password = '') => {
  typeEmailAndPassword(email, password)
  clickSubmit()
}

describe('Register page', () => {
  beforeEach(() => {
    cy.visit('/auth/register')
  })

  it('Performs register flow', () => {
    register('test@test.test', '12345678')
    cy.contains('xx xx xx xx xx xx xx Email')
  })

  it('Displays error message when password is empty', () => {
    register('test@test.test')
    cy.contains('xx xx xx xx xx')
  })

  it('Displays error message when password contains restricted symbols', () => {
    register('test@test.test', '₽₽₽₽₽₽₽₽₽')
    cy.contains('xx xx xx xx xx xx xx xx')
  })

  it('Displays error message when password contains less than 8 symbols', () => {
    register('test@test.test', '1234567')
    cy.contains('xx xx xx 8 xx')
  })

  it('Displays error message when password contains more than 20 symbols', () => {
    register('test@test.test', '1'.repeat(21))
    cy.contains('xx xx xx 20 xx')
  })

  it('Displays error message when typed in-use email', () => {
    register('email@email.com', '12345678')
    cy.contains('xx "E-mail" xx xx')
  })
})
