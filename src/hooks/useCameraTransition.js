import gsap from 'gsap'
import useStore from '@/lib/store'
import { useEffect } from 'react'

const useCameraTransition = (ref, title, state) => {
  const activeObject = useStore((s) => s.activeObject)
  useEffect(() => {
    if (activeObject === title) {
      useStore.setState({ activeChildCharacter: ref.current })

      gsap.to(state.camera.position, {
        duration: 1,
        x: ref.current.position.x,
        y: ref.current.position.y,
        z: 1.5 + ref.current.position.z,
        ease: 'expo.inOut',
      })
    }

    if (activeObject === 'hasVisited' && useStore.getState().activeCharacter) {
      gsap.to(state.camera.position, {
        duration: 1,
        x: useStore.getState().activeCharacter.position.x,
        y: state.camera.aspect <= 1 ? -1 / 3 : 0,
        z: (state.camera.aspect <= 1 ? 8 : 6.5) + useStore.getState().activeCharacter.position.z,
        onComplete: () => {
          useStore.setState({ activeObject: false })
          useStore.setState({ isZoomed: false })
          useStore.setState({ hoverObject: false })

          if (ref.current) {
            ref.current.isAnimating = false
          }
        },
        ease: 'expo.inOut',
      })
    }
  }, [activeObject])
}

export default useCameraTransition
