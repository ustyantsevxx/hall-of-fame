export type AddressFormFields = {
  block?: string
  section?: string
  floor?: string
  apartment?: string
  comment?: string
  coords: {
    lat: number
    lng: number
  }
}

export type AddressFormData = AddressFormFields & {
  street: string
  house: string
  full_name: string
}
