import { useVideoTexture } from '@react-three/drei'
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
  onEnded,
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
  onEnded: () => void
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
    onended: onEnded,
  })

  useEffect(() => {
    if (isSafari) {
      setSrc(mp4)
    }
  }, [isSafari])

  const meshRef = useRef(null!)

  const [cameraPosition] = useState(new Vector3())
  const [cameraDirection] = useState(new Vector3())
  const [desiredPosition] = useState(new Vector3())

  useFrame(({ camera }) => {
    if (!meshRef.current) return
    const mesh = meshRef.current

    const distance = 8

    if (alignCenter && play) {
      camera.getWorldPosition(cameraPosition)
      camera.getWorldDirection(cameraDirection)
      desiredPosition.copy(cameraPosition).add(cameraDirection.multiplyScalar(distance))
      desiredPosition.y -= 0.5
      mesh.position.copy(desiredPosition)
    }
  })

  return (
    // <mesh position={[0, -0.7, 8]} rotation={[0, 0, 0]} scale={1.8}>
    <mesh ref={meshRef} position={position} rotation={[0, 0, 0]} scale={scale}>
      <planeGeometry args={[16, 9, 1, 1]} />
      <meshBasicMaterial map={videoTexture} toneMapped={false} transparent />
    </mesh>
  )
}
