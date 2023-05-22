export const FOCUS_ON_SLASH_INPUT_ATTR = 'data-focus-on-slash'

export default () => {
  document.addEventListener('keypress', e => {
    if (e.key === '/') {
      e.preventDefault()
      document.querySelector(`[${FOCUS_ON_SLASH_INPUT_ATTR}]`)?.focus()
    }
  })
}
