import { Html, useVideoTexture } from '@react-three/drei'
import { isSafari } from 'react-device-detect'
import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
export default function Video({
  play,
  mp4,
  webm,
  scale,
  position,
  onTimeUpdate,
  alignCenter = false,
  autoplay,
  loop,
}: {
  play: boolean
  mp4: string
  webm: string
  scale: number
  position: [number, number, number]
  onTimeUpdate: (e: any) => void
  alignCenter?: boolean
  autoplay: boolean
  loop: boolean
}) {
  const [src, setSrc] = useState(webm)
  const videoTexture = useVideoTexture(src, {
    autoplay: autoplay,
    loop: loop,
    muted: true,
    start: play,
    ontimeupdate: onTimeUpdate,
  })

  // useEffect(() => {
  //   if (isSafari) {
  //     setSrc(mp4)
  //   }
  // }, [mp4])

  const meshRef = useRef(null!)

  const [cameraPosition] = useState(new Vector3())
  const [cameraDirection] = useState(new Vector3())
  const [desiredPosition] = useState(new Vector3())

  useFrame(({ camera }) => {
    if (!meshRef.current) return
    const mesh = meshRef.current

    const distance = 11

    if (alignCenter && play) {
      camera.getWorldPosition(cameraPosition)
      camera.getWorldDirection(cameraDirection)
      desiredPosition.copy(cameraPosition).add(cameraDirection.multiplyScalar(distance))
      mesh.rotation.x = camera.rotation.x
      mesh.position.copy(desiredPosition)
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={position} rotation={[0, 0, 0]} scale={scale}>
        <planeGeometry args={[16, 9, 1, 1]} />
        <meshBasicMaterial map={videoTexture} toneMapped={false} transparent />
      </mesh>
    </>
  )
}

3.820604
0
7.781153
