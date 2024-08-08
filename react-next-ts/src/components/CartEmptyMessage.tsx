import { FC } from 'react'

import { AppButton } from './AppButton'

type Props = {
  onGoToMenu: () => void
}

export const CartEmptyMessage: FC<Props> = ({ onGoToMenu }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-black/50 text-regular-17">xx xx xx</p>
      <AppButton
        variant="primary"
        className="mt-22 w-[241px] max-w-full"
        onClick={() => onGoToMenu()}
      >
        xx xx xx
      </AppButton>
    </div>
  )
}
