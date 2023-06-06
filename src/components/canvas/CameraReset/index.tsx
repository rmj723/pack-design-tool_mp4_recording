import gsap from 'gsap'
import useStore from '@/lib/store'
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

const CameraReset = () => {
  const state = useThree()
  const isLoaded = useStore((state) => state.isLoaded)

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    gsap.killTweensOf(state.camera.position, 'x, y, z')

    gsap.to(state.camera.position, {
      duration: 0.75,
      x: 0,
      y: 0,
      z: state.camera.aspect <= 1 ? 2.5 : 10,
      ease: 'expo.out',
    })
  }, [])

  return <></>
}

export default CameraReset
