import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { useController, useFormContext, UseFormReturn } from 'react-hook-form'

import { OrderDeliveryTime } from '../api/modules/orders/orders.types'
import { AppSelect } from './AppSelect'
import { AppSelectOption } from './AppSelect.types'
import { CheckoutFormData } from './Checkout.types'
import { CheckoutContext } from './Checkout.utils'

type Props = {
  className?: string
}

const formatTime = (time: string) => dayjs(time).format('HH:mm')
const getTimeString = (time: OrderDeliveryTime) =>
  `${formatTime(time.min)} - ${formatTime(time.max)}`

export const CheckoutConfigTimeExact: FC<Props> = ({ className }) => {
  const checkoutContext = useContext(CheckoutContext)
  const preorderPeriods = checkoutContext.calculations?.preorder_periods

  const deliveryDateOptions: AppSelectOption[] = useMemo(
    () =>
      preorderPeriods?.map(period => ({
        key: period.date,
        name: dayjs(period.date).format('DD MMMM YYYY')
      })) || [],
    [preorderPeriods]
  )

  const { control }: UseFormReturn<CheckoutFormData> = useFormContext()
  const exactTimeController = useController({
    control,
    name: 'deliveryTime.exactTime'
  })
  const [date, setDate] = useState<string>()
  const selectedDateOption = deliveryDateOptions.find(x => x.key === date)

  const timeOptions: AppSelectOption[] = useMemo(() => {
    const period = preorderPeriods?.find(period => period.date === date)
    return (
      period?.periods.map(item => ({
        key: item.min,
        name: getTimeString(item)
      })) || []
    )
  }, [date, preorderPeriods])

  const selectedExactTimeOption = timeOptions.find(
    option => option.key === exactTimeController.field.value
  )
  const selectExactTimeOption = (optionId: string) => {
    exactTimeController.field.onChange(optionId)
  }

  useEffect(() => {
    selectExactTimeOption(timeOptions?.[0]?.key ?? undefined)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOptions])

  return (
    <div className={clsx('flex items-center space-x-20', className)}>
      <AppSelect
        className="w-[246px]"
        label="Дата доставки "
        value={selectedDateOption}
        options={deliveryDateOptions}
        optionsContainerClassName="grid-cols-2"
        onChange={option => setDate(option.key)}
      />

      <AppSelect
        disabled={!date}
        className="w-[246px]"
        label="Точное время"
        value={selectedExactTimeOption}
        options={timeOptions}
        optionsContainerClassName="grid-cols-2"
        onChange={option => selectExactTimeOption(option.key)}
      />
    </div>
  )
}
