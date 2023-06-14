// @ts-nocheck
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import { isMobile } from 'react-device-detect'

export function MousePositionControls() {
  // const { cameraSmoothness } = useControls('Camera Controls', {
  //   cameraSmoothness: {
  //     value: 0.05,
  //     min: 0.01,
  //     max: 0.1,
  //     step: 0.01,
  //   },
  // })

  const cameraSmoothness = 0.05

  const cameraRef = useRef()

  const cursor = { x: 0, y: 0 }

  window.addEventListener('mousemove', (ev) => {
    cursor.x = ev.clientX / window.innerWidth - 0.5
    // cursor.y = -ev.clientY / window.innerHeight - 0.5
  })

  useFrame((state, delta) => {
    if (isMobile) return
    const cameraX = cursor.x
    // const cameraY = cursor.y + 1.15553275524854

    cameraRef.current.position.x += (cameraX * 5 - cameraRef.current.position.x) * cameraSmoothness
    // cameraRef.current.position.y += (cameraY * 2 - cameraRef.current.position.y) * cameraSmoothness

    cameraRef.current.lookAt(0, 0, 0)
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={30} position={[0, 0.615553275524854, 34.999454212557204]} />
    </>
  )
}
