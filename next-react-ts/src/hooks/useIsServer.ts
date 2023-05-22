import { useEffect, useState } from 'react'

type UseIsServerParams = {
  initDelay?: number
}

export const useIsServer = ({ initDelay }: UseIsServerParams = {}) => {
  const [isServer, setIsServer] = useState(true)

  useEffect(() => {
    if (initDelay) {
      const timer = setTimeout(() => setIsServer(false), initDelay)
      return () => clearTimeout(timer)
    } else {
      setIsServer(false)
    }
  }, [initDelay])

  return isServer
}
