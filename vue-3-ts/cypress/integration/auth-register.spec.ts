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
    cy.contains('Ссылка для подтверждения регистрации отправлена на ваш Email')
  })

  it('Displays error message when password is empty', () => {
    register('test@test.test')
    cy.contains('Вы не ввели новый пароль')
  })

  it('Displays error message when password contains restricted symbols', () => {
    register('test@test.test', '₽₽₽₽₽₽₽₽₽')
    cy.contains('Пароль может содержать только латинские буквы и спецсимволы')
  })

  it('Displays error message when password contains less than 8 symbols', () => {
    register('test@test.test', '1234567')
    cy.contains('Минимальная длина пароля 8 символов')
  })

  it('Displays error message when password contains more than 20 symbols', () => {
    register('test@test.test', '1'.repeat(21))
    cy.contains('Максимальная длина пароля 20 символов')
  })

  it('Displays error message when typed in-use email', () => {
    register('email@email.com', '12345678')
    cy.contains('Данный "E-mail" уже используется')
  })
})
