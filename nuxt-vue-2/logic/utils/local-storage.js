export const LocalStorageService = {
  retrieveAndRemove(key) {
    const value = localStorage.getItem(key)
    localStorage.removeItem(key)
    return value
  },

  set(key, value) {
    localStorage.setItem(key, value)
    return localStorage.getItem(key)
  }
}
