export type StreetsSearchResult = {
  fias_id: string
  name: string
  lat: number
  lng: number
}

export type StreetBuildingsSearchResult = {
  fias_id: string
  full_name: string
  house_type: string
  house_type_full: string
  house: string
  block_type: string
  block_type_full: string
  block: string
  lat: number
  lng: number
}
