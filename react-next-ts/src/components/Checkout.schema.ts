/* eslint-disable unicorn/no-thenable */
import { boolean, number, object, SchemaOf, string } from 'yup'

import { NEW_ADDRESS_KEY } from '../api/modules/addresses/address.constants'
import {
  DELIVERY_METHOD,
  DELIVERY_TIME_TYPE
} from '../api/modules/delivery-methods/delivery-methods.constants'
import { CheckoutFormData } from './Checkout.types'

export const checkoutFormSchema: SchemaOf<CheckoutFormData> = object({
  personalInfo: object({
    name: string(),
    phone: string().length(12, 'xx xx xx xx.')
  }).required(),
  deliveryMethod: object({
    typeId: number().required('xx xx xx.'),
    addressId: number().when('typeId', {
      is: DELIVERY_METHOD.COURIER,
      then: number().required('xx xx xx.')
    }),
    restaurantId: number().when('type', {
      is: DELIVERY_METHOD.PICKUP,
      then: number().required('xx xx xx.')
    }),
    newAddress: object().when(['typeId', 'addressId'], {
      is: (typeId: number | undefined, addressId: number | undefined) => {
        return (
          typeId === DELIVERY_METHOD.COURIER && addressId === NEW_ADDRESS_KEY
        )
      },
      then: object({
        street: string().required('xx xx.'),
        house: string().required('xx xx xx.'),
        full_name: string()
      }).required('xx xx xx.'),
      otherwise: object()
    }) as any,
    addressCoords: object().when(['typeId'], {
      is: (typeId: number | undefined) => {
        return typeId === DELIVERY_METHOD.COURIER
      },
      then: object({
        lat: number().required('xx xx xx.'),
        lng: number().required()
      })
    })
  }).required(),
  deliveryTime: object({
    typeId: number().required(),
    exactTime: string().when('typeId', {
      is: DELIVERY_TIME_TYPE.EXACT_TIME,
      then: string().required('xx xx xx xx.')
    })
  }).required(),
  paymentMethod: object({
    typeId: number().required('xx xx xx.'),
    changeBanknote: number().nullable()
  }).required(),
  bonusCoinsToUse: number(),
  promoCode: string().notRequired(),
  comment: string(),
  withoutBirthdayProduct: boolean()
}).required()
