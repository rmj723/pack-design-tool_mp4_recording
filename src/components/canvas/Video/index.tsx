import { useVideoTexture } from '@react-three/drei'
import { isSafari } from 'react-device-detect'
import { useState, useEffect } from 'react'

export default function Video({
  play,
  mp4,
  webm,
  scale,
  position,
  onTimeUpdate,
  autoplay,
  loop,
}: {
  play: boolean
  mp4: string
  webm: string
  scale: number
  position: [number, number, number]
  onTimeUpdate: (e: any) => void
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

  useEffect(() => {
    if (isSafari) {
      setSrc(mp4)
    }
  }, [isSafari])
  return (
    // <mesh position={[0, -0.7, 8]} rotation={[0, 0, 0]} scale={1.8}>
    <mesh position={position} rotation={[0, 0, 0]} scale={scale}>
      <planeGeometry args={[16, 9, 1, 1]} />
      <meshBasicMaterial map={videoTexture} toneMapped={false} transparent />
    </mesh>
  )
}
