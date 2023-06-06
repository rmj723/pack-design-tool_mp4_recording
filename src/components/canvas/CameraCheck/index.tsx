import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import useStore from '@/lib/store'
import gsap from 'gsap'

const CameraCheck = () => {
  const state = useThree()
  const isLoaded = useStore((state) => state.isLoaded)

  useEffect(() => {
    const checkCameraState = () => {
      if (!isLoaded) {
        return
      }

      useStore.setState({ isResizing: true })

      setTimeout(() => {
        gsap.killTweensOf(state.camera.position, 'x, y, z')

        if (useStore.getState().activeProject) {
          if (useStore.getState().activeObject) {
            state.camera.position.x = useStore.getState().activeChildCharacter.position.x
            state.camera.position.y = useStore.getState().activeChildCharacter.position.y
            state.camera.position.z = 1.5 + useStore.getState().activeChildCharacter.position.z
          } else {
            state.camera.position.x = useStore.getState().activeCharacter.position.x
            state.camera.position.y = state.camera.aspect <= 1 && useStore.getState().activeProject ? -1 / 3 : 0
            state.camera.position.z =
              (state.camera.aspect <= 1 ? 8 : 6.5) + useStore.getState().activeCharacter.position.z
          }
        } else {
          state.camera.position.x = 0
          state.camera.position.y = state.camera.aspect <= 1 && useStore.getState().activeProject ? -1 / 3 : 0
          state.camera.position.z = state.camera.aspect <= 1 ? 2.5 : 10
        }
      }, 50)

      setTimeout(() => {
        useStore.setState({ isResizing: false })
      }, 100)
    }

    checkCameraState()

    window.addEventListener('resize', checkCameraState)

    return () => {
      window.removeEventListener('resize', checkCameraState)
    }
  }, [state.camera.position, state.camera.aspect])

  return <></>
}

export default CameraCheck
