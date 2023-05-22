import create from 'zustand'

type LayoutState = {
  firstHeaderScrolledUp: boolean
  setFirstHeaderScrolledUp: (firstHeaderScrolledUp: boolean) => void

  firstHeaderHeight: number
  setFirstHeaderHeight: (firstHeaderHeight: number) => void

  secondHeaderHeight: number
  setSecondHeaderHeight: (secondHeaderHeight: number) => void
}

export const useLayoutState = create<LayoutState>(set => ({
  firstHeaderScrolledUp: false,
  setFirstHeaderScrolledUp: (firstHeaderScrolledUp: boolean) =>
    set({ firstHeaderScrolledUp }),

  firstHeaderHeight: 0,
  setFirstHeaderHeight: (firstHeaderHeight: number) =>
    set({ firstHeaderHeight }),

  secondHeaderHeight: 0,
  setSecondHeaderHeight: (secondHeaderHeight: number) =>
    set({ secondHeaderHeight })
}))
