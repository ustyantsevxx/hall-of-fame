/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { number, object, SchemaOf, string } from 'yup'

import { DadataService } from '../api/modules/dadata/dadata.service'
import { AddressFormData } from './AddressForm.types'
import { AppButton } from './AppButton'
import { AppCombobox } from './AppCombobox'
import { AppComboboxOption } from './AppCombobox.types'
import { AppInput } from './AppInput'
import { AppTextarea } from './AppTextarea'

type Props = {
  className?: string
  hideActions?: boolean
  hideComment?: boolean
  loading?: boolean
  beforeActions?: ReactNode
  onCancel?: () => void
  onValidChange?: (data: AddressFormData) => void
  onSuccess?: (data: AddressFormData) => void
}

const addressFormSchema: SchemaOf<AddressFormData> = object({
  street: string().required('Введите улицу'),
  house: string().required('Введите номер дома'),
  full_name: string().required('Введите адрес'),
  block: string(),
  section: string(),
  floor: string(),
  apartment: string(),
  comment: string(),
  coords: object({
    lat: number().required(),
    lng: number().required()
  })
})

const searchStreets = async (query: string) => {
  const response = await DadataService.searchStreets({ query })
  return (
    response?.map(street => ({
      label: street.name,
      value: street
    })) ?? []
  )
}

const searchStreetBuildings = async ({
  query,
  streetFiasId
}: {
  query: string
  streetFiasId: string
}) => {
  const response = await DadataService.searchStreetBuildings({
    query,
    streetFiasId
  })
  return (
    response?.map(building => ({
      label: building.house,
      value: building
    })) ?? []
  )
}

export const AddressForm: FC<Props> = ({
  className,
  onCancel,
  onSuccess,
  onValidChange,
  loading,
  beforeActions,
  hideComment = false,
  hideActions = false
}) => {
  const { register, handleSubmit, formState, watch, getValues, setValue } =
    useForm<AddressFormData>({
      resolver: yupResolver(addressFormSchema),
      mode: 'all'
    })

  const onSubmit = handleSubmit(data => {
    onSuccess?.({
      ...data
    })
  })

  const [streetOption, setStreetOption] = useState<AppComboboxOption>()
  const [houseOption, setHouseOption] = useState<AppComboboxOption>()

  useEffect(() => {
    const subscription = watch(() => {
      if (streetOption && houseOption) {
        onValidChange?.({
          ...getValues(),
          coords: {
            lat: houseOption.value.lat,
            lng: houseOption.value.lng
          }
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, formState, getValues, onValidChange, streetOption, houseOption])

  useEffect(() => {
    if (streetOption?.value.name) {
      setValue('street', streetOption.value.name)
    }
  }, [streetOption])

  useEffect(() => {
    if (houseOption?.value) {
      setValue('full_name', houseOption.value.full_name)
      setValue('house', houseOption.value.house)
      setValue('coords', {
        lat: houseOption.value.lat,
        lng: houseOption.value.lng
      })
    }
  }, [houseOption])

  return (
    <form className={clsx(className)} onSubmit={onSubmit}>
      <div className="grid grid-cols-12 gap-20">
        <AppCombobox
          label="Улица"
          className="col-span-12 md:col-span-9"
          autocompleteFn={searchStreets}
          inputProps={{ placeholder: 'Улица' }}
          value={streetOption}
          onChange={id => setStreetOption(id)}
        />

        <AppCombobox
          label="Дом"
          disabled={!streetOption}
          title={!streetOption ? 'Выберите улицу' : undefined}
          className="col-span-6 md:col-span-3"
          autocompleteFn={query =>
            searchStreetBuildings({
              query,
              streetFiasId: streetOption?.value.fias_id
            })
          }
          inputProps={{ placeholder: 'Дом' }}
          value={houseOption}
          onChange={id => setHouseOption(id)}
        />

        <AppInput
          placeholder="Корпус"
          className="col-span-6 md:col-span-3"
          {...register('block')}
        />

        <AppInput
          placeholder="Подъезд"
          className="col-span-4 md:col-span-3"
          {...register('section')}
        />

        <AppInput
          placeholder="Этаж"
          className="col-span-4 md:col-span-3"
          {...register('floor')}
        />

        <AppInput
          placeholder="Квартира"
          className="col-span-4 !pr-14 md:col-span-3"
          {...register('apartment')}
        />

        {!hideComment && (
          <AppTextarea
            placeholder="Комментарий к адресу"
            className="col-span-12 w-full resize-none md:h-[160px]"
            {...register('comment')}
          />
        )}
      </div>

      {beforeActions}

      {!hideActions ? (
        <div className="mt-24 flex space-x-20">
          <AppButton
            className="flex-grow"
            variant="secondary"
            type="button"
            onClick={() => onCancel?.()}
          >
            Отменить
          </AppButton>
          <AppButton
            className="flex-grow"
            disabled={!streetOption || !houseOption || loading}
          >
            {loading ? <span>Загрузка...</span> : <span>Сохранить</span>}
          </AppButton>
        </div>
      ) : null}
    </form>
  )
}
