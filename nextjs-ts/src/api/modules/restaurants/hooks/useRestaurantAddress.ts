import { useRestaurantInfo } from './useRestaurantInfo'

export const useRestaurantAddress = () => {
  const { data: info } = useRestaurantInfo()

  if (!info) {
    return ''
  }

  let result = `г. ${info?.city.name}, ${info?.street}, д. ${info?.house}`

  if (info?.block) {
    result += `, к. ${info.block}`
  }

  return result
}
