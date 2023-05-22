export type RadioGroupType = 'flat' | 'button-group' | 'button-group-shadow'

export type RadioGroupItem = {
  label: string
}

export type RadioGroupInputItem = RadioGroupItem & {
  value: string | number
}

export type RadioGroupNavigationItem = RadioGroupItem & {
  to: string
}
