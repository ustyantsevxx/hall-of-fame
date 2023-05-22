import clsx from 'clsx'
import { FC, useEffect, useId, useRef, useState } from 'react'

import CloseNavSvg from '../assets/svg/CloseNav.svg'
import { getCoordsByAddress } from '../utils/map'
import { AppButton } from './AppButton'
import { AppInput } from './AppInput'
import { AppTransition } from './AppTransition'
import { DeliveryPlacemark } from './DeliverySelectAddressModal.types'

type Props = {
  value?: DeliveryPlacemark
  loading?: boolean
  noDelivery?: boolean
  className?: string
  onGoToRestaurantsInfo?: () => void
  onChange?: (value: DeliveryPlacemark) => void
}

export const DeliverySelectAddressModalSearchInput: FC<Props> = ({
  value,
  noDelivery,
  loading,
  className,
  onGoToRestaurantsInfo,
  onChange
}) => {
  const inputId = useId()
  const suggestView = useRef<any>()
  const [searchString, setSearchString] = useState(value?.address || '')

  const initSearchInput = () => {
    if (!suggestView.current) {
      suggestView.current = new (ymaps as any).SuggestView(inputId)

      suggestView.current.events.add('select', async (e: any) => {
        const coords = await getCoordsByAddress(e.get('item').value)

        onChange?.({
          coords,
          address: e.get('item').value
        })
      })
    }
  }

  useEffect(() => {
    initSearchInput()
  })

  useEffect(() => {
    setSearchString(value?.address || '')
  }, [value])

  return (
    <div className={clsx('flex items-center', className)}>
      <div className="relative grow">
        <AppInput
          id={inputId}
          placeholder="Адрес"
          className={clsx('w-full', searchString.length > 0 && 'pr-40')}
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
        />

        <AppTransition show={searchString.length > 0}>
          <button
            className="absolute right-13 top-1/2 h-24 w-24 -translate-y-1/2"
            onClick={() => setSearchString('')}
          >
            <CloseNavSvg className="text-black/20" />
          </button>
        </AppTransition>
      </div>

      <AppButton className="ml-16 hidden md:block" disabled={loading}>
        Проверить адрес
      </AppButton>

      <div className="absolute bottom-0 left-0 right-0 px-16 pb-10 pt-26 md:hidden">
        {noDelivery ? (
          <AppButton
            className="w-full"
            disabled={loading}
            onClick={onGoToRestaurantsInfo}
          >
            Посмотреть точки самовывоза
          </AppButton>
        ) : (
          <AppButton className="w-full" disabled={loading}>
            {loading ? 'Загрузка...' : 'Проверить адрес'}
          </AppButton>
        )}
      </div>
    </div>
  )
}
