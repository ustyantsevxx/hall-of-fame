import { useRestaurantInfo } from './useRestaurantInfo'

export const useRestaurantAddress = () => {
  const { data: info } = useRestaurantInfo()

  if (!info) {
    return ''
  }

  let result = `xx. ${info?.city.name}, ${info?.street}, xx. ${info?.house}`

  if (info?.block) {
    result += `, xx. ${info.block}`
  }

  return result
}
