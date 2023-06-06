import React, { useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import Puck from '@/components/canvas/Puck'
import Card from '@/components/canvas/Card'
import Scroller from '@/templates/VirtualScroll'
import { useThree, useFrame } from '@react-three/fiber'
import { SpotLight } from '@react-three/drei'
import CameraReset from '@/components/canvas/CameraReset'
import useStore from '@/lib/store'
import PuckIntro from '../PuckIntro'
import type { Group } from 'three'
import gsap from 'gsap'
import { scroll } from '@/utils/scroll'
import { Observer } from 'gsap/all'
import Floor from '../Floor'
gsap.registerPlugin(Observer)

export default function PackStageScroll({ pucks }) {
  const [activeIndex, increaseActiveIndex, decreaseActiveIndex, resetActiveIndex] = useStore((state) => [
    state.activeIndex,
    state.increaseActiveIndex,
    state.decreaseActiveIndex,
    state.resetActiveIndex,
  ])
  const state = useThree()
  const puckGroupRef = useRef<Group>()
  const floorRef = useRef<Group>()
  const [tier1done, tier2done, tier3done, introDone, startIntro] = useStore((state) => [
    state.tier1done,
    state.tier2done,
    state.tier3done,
    state.introDone,
    state.startIntro,
  ])
  const indexRef = useRef(0)
  useEffect(() => {
    useStore.setState({ activeProject: false })
    useStore.setState({ activeSelect: false })
    useStore.setState({ hoverProject: false })
  }, [state])

  const r = state.camera.rotation

  useEffect(() => {
    if (tier1done && !introDone && puckGroupRef.current && floorRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          puckGroupRef.current.position,
          { y: -20 },
          {
            y: 0,
            duration: 1,
            ease: 'expo.out',
            onComplete: () => {
              useStore.setState({ introDone: true })
            },
          },
        )
        gsap.fromTo(
          floorRef.current.position,
          { y: -40 },
          {
            y: 0,
            duration: 1,
            ease: 'expo.out',
          },
        )
      })
      return () => {
        ctx.revert()
      }
    }
  }, [tier1done])

  const next = (direction) => {
    isAnimating.current = true
    const amount = state.camera.aspect <= 1 ? 4 : (1 / pucks.length) * Math.PI * 2
    gsap.to(scroll, {
      sl: direction ? `+=${amount}` : `-=${amount}`,
      duration: 1.25,
      ease: 'expo.out',
      onComplete: () => {
        isAnimating.current = false
        if (indexRef.current === pucks.length - 1) {
          // resetActiveIndex()
        } else {
          direction ? indexRef.current + 1 : indexRef.current - 1
          // !direction ? increaseActiveIndex() : decreaseActiveIndex()
        }
      },
    })
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      Observer.create({
        target: window,
        type: 'wheel, touch',
        wheelSpeed: -1,
        preventDefault: true,
        onUp: () => {
          if (isAnimating.current) return
          next(true)
        },
        onDown: () => {
          if (isAnimating.current) return
          next(false)
        },
        tolerance: 30,
      })
    })
    return () => {
      ctx.revert()
    }
  }, [])

  useFrame(() => {
    if (r.x !== -0.1 || r.y !== 0 || r.z !== 0) {
      state.camera.rotation.set(-0.1, 0, 0)
    }
  })

  useLayoutEffect(() => {
    useStore.setState({ allowPuckFrame: true })
  }, [])

  let isAnimating = useRef(false)
  const tier3 = pucks.filter((puck) => puck.tier === 3)
  const tier2 = pucks.filter((puck) => puck.tier === 2)
  const tier1 = pucks.filter((puck) => puck.tier === 1)
  const reveledPucks = useStore((state) => state.reveledPucks)
  return (
    <>
      <CameraReset />
      <Scroller>
        <group position={[0, introDone ? 0 : -20, 0]} ref={puckGroupRef}>
          <>
            {pucks &&
              pucks.map((puck, index) => {
                if (reveledPucks.includes(puck.title)) {
                  return (
                    <Card
                      showDetails={false}
                      shouldSpinn
                      {...puck}
                      isHome={true}
                      key={puck.title}
                      length={pucks.length}
                      index={index}
                    />
                  )
                } else {
                  return (
                    <Puck
                      shouldSpinn
                      shouldAnimate
                      {...puck}
                      isHome={true}
                      key={puck.title}
                      length={pucks.length}
                      index={index}
                    />
                  )
                }
              })}
          </>
          <group position={[0, introDone ? 0 : -40, -1]} ref={floorRef}>
            <Floor />
          </group>
        </group>
      </Scroller>
      {!introDone && startIntro && (
        <group>
          {tier3 && !tier3done && (
            <PuckIntro
              onStart={() => useStore.setState({ tier3enter: true })}
              onComplete={() => useStore.setState({ tier3done: true })}
              pucks={tier3}
            />
          )}
          {tier2 && tier3done && !tier2done && (
            <PuckIntro
              onStart={() => useStore.setState({ tier2enter: true })}
              onComplete={() => useStore.setState({ tier2done: true })}
              pucks={tier2}
            />
          )}
          {tier1 && tier2done && !tier1done && (
            <PuckIntro
              onStart={() => useStore.setState({ tier1enter: true })}
              onComplete={() => useStore.setState({ tier1done: true })}
              pucks={tier1}
            />
          )}
        </group>
      )}
      <ambientLight color={'#ffffff'} intensity={4} />
      <ambientLight color={'#4F396C'} intensity={1} />
      {/* <fog attach='fog' args={['black', 20, 50]} /> */}
      <pointLight color={'#3f3b44'} intensity={0.5} position={[0, 0, 0]} />
      {/* <pointLight color={'#0688AF'} intensity={1} position={[0, 0, -100]} /> */}
      <pointLight color={'#fff'} intensity={0.5} position={[0, -2, -15]} />
      {/* @ts-ignore */}
      <SpotLight
        position={[0, 4, -0.5]}
        scale={25}
        attenuation={8}
        castShadow
        color='#300cbf'
        intensity={0.5}
        distance={1}
      />
    </>
  )
}
