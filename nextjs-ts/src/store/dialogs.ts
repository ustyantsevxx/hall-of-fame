import create from 'zustand'

type DialogsState = {
  cartOpened: boolean
  setCartOpened: (cartOpened: boolean) => void

  authModalOpened: boolean
  setAuthModalOpened: (authModalOpened: boolean) => void
}

export const useDialogsState = create<DialogsState>(set => ({
  cartOpened: false,
  setCartOpened: (cartOpened: boolean) => set({ cartOpened }),

  authModalOpened: false,
  setAuthModalOpened: (authModalOpened: boolean) => set({ authModalOpened })
}))
