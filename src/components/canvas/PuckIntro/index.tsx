import React, { useRef, useLayoutEffect } from 'react'
import useStore from '@/lib/store'
import Puck from '@/components/canvas/Puck'
import { isMobile } from 'react-device-detect'

import type { Group } from 'three'
import gsap from 'gsap'
export default function PuckIntro({
  pucks,
  onComplete,
  onStart,
}: {
  pucks: any[]
  onComplete: () => void
  onStart?: () => void
}) {
  const ref = useRef<Group>()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const puckPlaceHolders = ref.current.children
      let positions = puckPlaceHolders.map((item) => item.position)
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete()
        },
        onStart: () => {
          if (onStart) {
            onStart()
          }
        },
      })

      tl.from(positions, {
        x: 10,
        duration: 1.2,
        stagger: 0.25,
        ease: 'expo.inOut',
        onComplete: () => {
          useStore.setState({ showTierLable: true })
        },
      }).to(
        positions,
        {
          x: -10,
          duration: 0.2,
          stagger: 0.05,
          ease: 'expo.inOut',
          onStart: () => {
            useStore.setState({ showTierLable: false })
          },
        },
        '+=3',
      )
    })
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    useStore.setState({ activeTier: `${pucks[0].tierName}` })
  }, [])
  return (
    <>
      <group position={[0, 0, 0]} ref={ref}>
        {pucks &&
          pucks.map((puck, i) => {
            const x = (i - (pucks.length - 1) / 2) * 1.5
            const y = (i - pucks.length / 2) * 3.25
            return (
              <Puck
                isHome
                shouldSpinn={false}
                position={[
                  isMobile ? 0.15 : x,
                  isMobile ? -0.5 - i * 0.5 : -0.5,
                  isMobile ? -6 - i * 1 : 3.75 + i * 0.2,
                ]}
                {...puck}
                key={puck.title}
                rotation={[Math.PI / 2, -1.9, Math.PI / 2.6 + i * 0.02]}
              />
            )
          })}
      </group>
    </>
  )
}
