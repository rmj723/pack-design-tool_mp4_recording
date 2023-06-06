import gsap from 'gsap'
import useStore from '@/lib/store'
import { useCallback } from 'react'
import { isMobile } from 'react-device-detect'

const useInteractions = (ref, slug, state, title, isHome) => {
  const router = useStore((s) => s.router)
  router.prefetch(`/pack/${slug}`)

  const animate = useCallback(() => {
    ref.current.isAnimating = true
    useStore.setState({ activeProject: title })

    gsap.to(state.camera.position, {
      delay: 0.25,
      duration: 0.75,
      x: ref.current.position.x,
      y: state.camera.aspect <= 1 ? -1 / 3 : 0,
      z: (state.camera.aspect <= 1 ? 8 : 6.5) + ref.current.position.z,
      ease: 'expo.inOut',
      onComplete: () => router.push(`/pack/${slug}`),
    })
    if (!isMobile) {
      gsap.to(ref.current.rotation, {
        y: Math.PI + 0.8,
        ease: 'expo.inOut',
        duration: 0.25,
      })
    }
  }, [])

  const enter = useCallback(() => {
    document.body.style.cursor = 'pointer'
    useStore.setState({ hoverProject: title })
  }, [])

  const leave = useCallback(() => {
    document.body.style.cursor = 'default'
    useStore.setState({ hoverProject: false })
  }, [])

  return { animate, enter, leave }
}

export default useInteractions
