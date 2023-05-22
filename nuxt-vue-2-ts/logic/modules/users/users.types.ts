export interface UserRole {
  id: number
  name: string
  keyword: string
}

export interface User {
  id: number
  last_name: string
  first_name: string
  patronymic?: string
  contact_person: string
  email: string
  phone: string
  birth_at: number
  role: UserRole
  contract_number: string
  contract_start_at: string
  legal_address: string
  postal_address: string
  inn: string
  kpp: string
  bik: string
  ogrn: string
  rs: string
  ks: string
  balance: number
  balance_show: boolean
  balance_unallocated: number
  balance_unallocated_show: boolean
  balance_month_start: number
  monthly: {
    top_up: number
    transactions: number
  }
}

export interface ProfileUpdateResponse {
  id: number
  last_name: string
  first_name: string
  patronymic: string
  phone: string
  birth_at: number
}

export interface UserProfileUpdateOptions {
  firstName: string
  lastName: string
  patronymic: string
}

export interface ProfileUpdateRequestPayload {
  first_name: string
  last_name: string
  patronymic: string
}

export interface UserUpdatePasswordPayload {
  password_old: string
  password_new: string
  password_new_confirmation: string
}

export interface UserUpdatePasswordOptions {
  passwordOld: string
  passwordNew: string
  passwordNewConfirmation: string
}

export interface UserUpdateContactDataPayload {
  email: string
  phone: string
  contact_person?: string
}

export interface UserUpdateContactDataOptions {
  email: string
  phone: string
  contactPerson?: string
}
