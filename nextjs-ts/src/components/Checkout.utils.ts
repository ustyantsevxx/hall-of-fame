import { createContext } from 'react'

import { CheckoutContextType } from './Checkout.types'

export const CheckoutContext = createContext<CheckoutContextType>({})
