/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
created: Tue Nov 29 12:08:23 2022
*/

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group, Mesh } from 'three'
import { scroll } from '@/utils/scroll'
import useInteractions from '@/hooks/useInteractions'
import gsap from 'gsap'
import useStore from '@/lib/store'
import useInitCheck from '@/hooks/useInitCheck'
import useRoutingCheck from '@/hooks/useRoutingCheck'
import { isMobile } from 'react-device-detect'
import { between } from '@/utils/math'

export default function Model(props: Group) {
  const ref = useRef<Group>()
  const ringRef1 = useRef<Mesh>()
  const ringRef2 = useRef<Mesh>()
  const ringRef3 = useRef<Mesh>()
  const state = useThree()
  const { nodes, materials } = useGLTF('/models/puck/puck_with_rings.glb')
  const rotation = 13
  const distance = 4
  const index = props.index
  const length = props.length
  const y = gsap.utils.wrap((-length / 2) * distance, (length / 2) * distance, -index * distance + scroll.ch)
  const isHome = props.isHome
  const baseX = state.camera.aspect <= 1 ? y : Math.sin((index / length) * Math.PI * 2 + scroll.ch) * 6.5
  const baseZ = state.camera.aspect <= 1 ? -6.5 : -6 + Math.cos((index / length) * Math.PI * 2 + scroll.ch) * 9
  const activeIndex = useStore((state) => state.activeIndex)
  const animateIn = useStore((state) => state.animateIn)
  const shouldReveal = useStore((state) => state.shouldReveal)
  const zThresghold = isMobile ? -6.5 : 2.8
  useInitCheck(ref, props.title, state, isHome)
  useRoutingCheck(ref, isHome)
  const { animate, enter, leave } = useInteractions(ref, props.slug, state, props.title)
  const force = 0.4
  useFrame((state) => {
    ringRef1.current.rotation.y = 0.8 + Math.sin(state.clock.elapsedTime * 0.5) * force
    ringRef2.current.rotation.y = 1 + Math.sin(state.clock.elapsedTime * 0.4) * force
    ringRef3.current.rotation.y = 0.9 + Math.sin(state.clock.elapsedTime * 0.6) * force

    if (!ref.current || !props.shouldSpinn) return
    const y = gsap.utils.wrap((-length / 2) * distance, (length / 2) * distance, -index * distance + scroll.ch)
    if (state.camera.aspect <= 1) {
      ref.current.position.x = y
      ref.current.position.z = -6.5
    } else {
      ref.current.position.x = Math.sin((index / length) * Math.PI * 2 + scroll.ch) * 6.5
      ref.current.position.z = -6 + Math.cos((index / length) * Math.PI * 2 + scroll.ch) * 9
      if (!isMobile && !ref.current.isAnimating) {
        ref.current.rotation.y = (index / length) * Math.PI * 2 + scroll.ch * 6.5
      }
    }
    if (!isHome && !useStore.getState().isRouting && !shouldReveal) {
      ref.current.rotation.y = isMobile ? +scroll.cp : ref.current.rotation.y + scroll.cp
    }

    if (between(ref.current.position.x, -1, 1) && ref.current.position.z >= zThresghold) {
      setActiveIndex()
    }
  })

  const setActiveIndex = () => {
    if (activeIndex === index) return
    useStore.setState({ activeIndex: index })
  }

  useLayoutEffect(() => {
    materials['default'].emissiveIntensity = 10
    materials['default'].toneMapped = false
  }, [materials])

  useLayoutEffect(() => {
    if (props.shouldAnimate && animateIn && index === activeIndex) {
      if (ref.current.isAnimating || !props.shouldSpinn) {
        return
      }
      animate()
    }
  }, [animateIn])

  return (
    // @ts-ignore
    <group
      onClick={(e) => {
        if (ref.current.isAnimating || !props.shouldSpinn) {
          return
        }
        e.stopPropagation()
        document.body.style.cursor = 'default'
        animate()
      }}
      onPointerOver={(e) => {
        if (ref.current.isAnimating || !props.shouldSpinn) {
          return
        }
        e.stopPropagation()
        enter()
      }}
      onPointerOut={(e) => {
        if (ref.current.isAnimating || !props.shouldSpinn) {
          return
        }

        e.stopPropagation()
        leave()
      }}
      scale={isMobile ? 0.035 : 0.025}
      rotation={[0, 9.8, 0]}
      position={props.position ? props.position : [baseX, -0.5, baseZ]}
      ref={ref}
      name={props.title}
      {...props}
      dispose={null}>
      <mesh
        ref={ringRef1}
        geometry={nodes.RingSobj.geometry}
        material={materials['default']}
        position={[1.54, 0.06, 2.87]}
        rotation={[-2.35, 0.8, -2.17]}
        scale={[1.2 * 8.5, 1.29 * 8.5, 1.1 * 8.5]}
        castShadow
        receiveShadow
      />
      <mesh
        ref={ringRef2}
        geometry={nodes.RingSobj.geometry}
        material={materials['default']}
        position={[1.54, 0.06, 2.87]}
        rotation={[-2.35, 1, -2.17]}
        scale={[1.2 * 8.5, 1.29 * 8.5, 1.1 * 8.5]}
        castShadow
        receiveShadow
      />
      <mesh
        ref={ringRef3}
        geometry={nodes.RingSobj.geometry}
        material={materials['default']}
        position={[1.54, 0.06, 2.87]}
        rotation={[-2.35, 0.9, -2.17]}
        scale={[1.3 * 8.5, 1.3 * 8.5, 1.1 * 8.5]}
        castShadow
        receiveShadow
      />
      <group rotation={[(-Math.PI / -3.05) * rotation, (-Math.PI / 3.05) * rotation, 3.55 * rotation]}>
        <group position={[0, 0, 1.25]}>
          <group position={[0, 0, -1.25]}>
            <mesh
              // @ts-ignore
              geometry={nodes.Unnamed_Node_0.geometry}
              material={materials['Ma_Hockey_Puck.002']}
              scale={[10, 10, -10]}
              castShadow
              receiveShadow
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/puck/puck_with_rings.glb')
