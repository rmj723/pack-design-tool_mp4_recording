import gsap from 'gsap'
import useStore from '@/lib/store'
import { useEffect } from 'react'

const useRoutingCheck = (ref, isHome) => {
  const isRouting = useStore((s) => s.isRouting)

  useEffect(() => {
    if (isHome && isRouting && !ref.current.isAnimating) {
      // gsap.to(shaderRef.current.material.uniforms.uOpacity, {
      //   duration: 1 / 3,
      //   delay: 1 / 3 * 2,
      //   value: 1,
      //   ease: 'power2.out'
      // })
    }
  }, [isRouting])
}

export default useRoutingCheck
