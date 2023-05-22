import { useLocalStorage } from 'react-use'

const PERSON_COUNT_LOCAL_STORAGE_KEY = 'x-cart-person-count'

export const usePersonCountState = () => {
  const [personCount, setPersonCount] = useLocalStorage(
    PERSON_COUNT_LOCAL_STORAGE_KEY,
    0
  )

  return { personCount, setPersonCount }
}
