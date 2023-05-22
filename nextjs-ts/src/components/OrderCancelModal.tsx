import { Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { object, SchemaOf, string } from 'yup'

import { useCancelOrder } from '../api/modules/orders/hooks/useCancelOrder'
import { Order } from '../api/modules/orders/orders.types'
import { AppButton } from './AppButton'
import { AppModal } from './AppModal'
import { AppTextarea } from './AppTextarea'
import { ModalNotification } from './ModalNotification'

type Props = {
  opened: boolean
  className?: string
  order?: Order
  onClose: (value: boolean) => void
}

type OrderCancelForm = {
  reason: string
}

const orderCancelFormSchema: SchemaOf<OrderCancelForm> = object({
  reason: string().required()
}).required()

export const OrderCancelModal: FC<Props> = ({ onClose, opened, order }) => {
  const { register, handleSubmit, formState, reset } = useForm<OrderCancelForm>(
    {
      resolver: yupResolver(orderCancelFormSchema),
      mode: 'onChange'
    }
  )
  const [notificationOpened, setNotificationOpened] = useState(false)

  const { mutate: cancelOrderMutation } = useCancelOrder()
  const cancelOrder = handleSubmit(data => {
    if (order) {
      cancelOrderMutation({ order, reason: data.reason })
    }
    setNotificationOpened(true)
  })

  return (
    <AppModal
      title="Отмена заказа"
      emptyFocusTrap
      contentWrapperClassName="grow flex flex-col"
      panelClassName={clsx(
        'md:items-center md:max-w-[541px] transition-opacity',
        notificationOpened && 'opacity-0'
      )}
      opened={opened}
      onClose={onClose}
      onClosed={() => reset()}
    >
      <form className="flex h-full w-full grow flex-col" onSubmit={cancelOrder}>
        <Dialog.Description className="mt-4 text-black/50">
          Сумма вашего заказа придет на выбранную в способе оплаты карту в
          течение 3 дней
        </Dialog.Description>

        <AppTextarea
          placeholder="Пожалуйста, напишите причину отмены заказа"
          className="mt-24 h-[130px] w-full resize-none"
          {...register('reason')}
        />

        <AppButton
          className="mt-auto mb-10 w-full md:mt-30 md:mb-0"
          disabled={!formState.isValid}
          onClick={cancelOrder}
        >
          Отменить заказ
        </AppButton>
      </form>

      <ModalNotification
        opened={notificationOpened}
        title="Заказ отменен"
        description="Напишите в службу поддержки, если возврат денежных средств не произойдет в течение 3 дней"
        onClose={setNotificationOpened}
        onClosed={() => onClose(false)}
      />
    </AppModal>
  )
}
