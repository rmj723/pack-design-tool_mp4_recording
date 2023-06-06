import { useEffect, useState } from 'react'
import { CameraShake } from '@react-three/drei'
import gsap from 'gsap'
import useStore from '@/lib/store'

export default function CameraShaker({
  duration = 2,
  camera,
  onComplete,
}: {
  duration?: number
  camera: any
  onComplete?: () => void
}) {
  const [shake, setShake] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.to(
        {},
        {
          duration,
          onComplete: () => {
            setShake(false)
            onComplete()
          },
        },
      ).to(
        camera.rotation,
        {
          x: -0.1,
          y: 0,
          z: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '+=1',
      )
    })

    return () => ctx.revert()
  }, [])

  return shake ? (
    <CameraShake
      maxYaw={0}
      maxRoll={0.2}
      maxPitch={0}
      yawFrequency={0.1}
      rollFrequency={8.9}
      pitchFrequency={0.8}
      intensity={0.75}
    />
  ) : null
}
