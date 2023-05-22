import { FC, memo, ReactNode } from 'react'

import { useLayoutState } from '../store/layout'

type Props = {
  children: ReactNode
  withSecondHeader?: boolean
}

export const LayoutDefaultContentWrapper: FC<Props> = memo(
  ({ children, withSecondHeader }) => {
    const { firstHeaderScrolledUp, secondHeaderHeight } = useLayoutState()

    return (
      <>
        <main
          style={{
            paddingTop:
              withSecondHeader && firstHeaderScrolledUp
                ? secondHeaderHeight
                : undefined
          }}
          className="flex grow flex-col"
        >
          {children}
        </main>
      </>
    )
  }
)

LayoutDefaultContentWrapper.displayName = 'LayoutDefaultContentWrapper'
