import { RadioGroupItem } from '@/components/RadioGroup.types'

export type TabItem = RadioGroupItem & {
  key: string
  panelComponent: any
  disabled?: boolean
}
