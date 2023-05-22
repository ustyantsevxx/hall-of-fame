import { Coordinates, Media } from '../../shared/types'
import { City } from '../addresses/addresses.types'

export type Restaurant = {
  id: number
  city: {
    id: 1
    name: string
    mode: string
    phone: string
  }
  name: string
  street: string
  house: string
  block: string
  phone: string
  mode: string
  geo_point: {
    lat: 57.153_033
    lng: 65.534_328
  }
}

export type RestaurantShowTypeAdvantage = {
  id: number
  title: string
  description: string
}

export type RestaurantShowTypeSchedule = {
  day_name: string
  day_num: number
  end_hours: string
  id: number
  start_hours: string
}

export type RestaurantShowType = {
  id: number
  name: string
  city: City
  street: string
  house: string
  block: string
  mode: string
  phone: string
  geo_point: Coordinates
  advantages: RestaurantShowTypeAdvantage[]
  media: Media[]
  about_us: string
  inst_url: string
  vk_url: string
  tg_url: string
  legal_address: string
  legal_name: string
  legal_phone: string
  inn: string
  schedules: RestaurantShowTypeSchedule[]
}
