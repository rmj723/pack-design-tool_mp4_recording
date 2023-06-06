import VirtualScroll from 'virtual-scroll'
import { useEffect } from 'react'

const useVirtualScroll = (ref, callback, dependecies) => {
  useEffect(() => {
    if (ref.current) {
      const instance = new VirtualScroll({
        mouseMultiplier: 0.00025,
        touchMultiplier: 0.015,
        keyStep: 0.6,
      })

      instance.on((e) => callback(e))

      return () => {
        instance.destroy()
      }
    }
  }, dependecies)

  return typeof window !== 'undefined'
}

export default useVirtualScroll
