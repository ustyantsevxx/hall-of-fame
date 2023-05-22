import { omit } from 'lodash-es'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { useOrder } from '../api/modules/orders/hooks/useOrder'
import { useRepeatOrder } from '../api/modules/orders/hooks/useRepeatOrder'
import { useDialogsState } from '../store/dialogs'
import { parseNumberOrNull, updateRouterQuery } from '../utils'
import { ModalConfirmation } from './ModalConfirmation'

export const FAILED_ORDER_QUERYSTRING_KEY = 'failed_order_id'

export const IndexPagePaymentErrorHandler: FC = ({}) => {
  const [modalOpened, setModalOpened] = useState(false)

  const router = useRouter()
  const failedOrderId =
    parseNumberOrNull(router.query[FAILED_ORDER_QUERYSTRING_KEY]) ?? undefined

  const { data: order } = useOrder(failedOrderId)
  const { mutateAsync: repeatOrder } = useRepeatOrder()
  const { setCartOpened } = useDialogsState()

  const handleRepeatOrder = async () => {
    if (order) {
      await repeatOrder(order)
      setCartOpened(true)
      setModalOpened(false)
    }
  }

  useEffect(() => {
    if (failedOrderId) {
      setModalOpened(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleModalClosed = async () => {
    await updateRouterQuery(
      router,
      omit(router.query, FAILED_ORDER_QUERYSTRING_KEY)
    )
  }

  return (
    <>
      <ModalConfirmation
        title="Ошибка"
        description={`Ваш заказ не удалось оформить. Попробуйте еще раз.`}
        confirmButtonText="Повторить заказ"
        opened={modalOpened}
        contentContainerClassName="md:max-w-[300px] mx-auto"
        onClose={() => setModalOpened(false)}
        onClosed={handleModalClosed}
        onConfirm={handleRepeatOrder}
      />
    </>
  )
}
