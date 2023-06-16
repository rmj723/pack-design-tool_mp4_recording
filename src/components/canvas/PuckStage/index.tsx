import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import Puck from '@/components/canvas/Puck'
import Card from '@/components/canvas/Card'
import Scroller from '@/templates/VirtualScroll'
import useStore from '@/lib/store'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import CameraCheck from '@/components/canvas/CameraCheck'
import CameraShaker from '../CameraShaker'
import Floor from '../Floor'
import Video from '@/components/canvas/Video'

const CameraReset = ({ title }) => {
  const state = useThree()

  const checkCamera = useCallback(() => {
    /* @ts-ignore */
    const activeCharacter = useStore.getState().activeGroup.children.find((child) => {
      return child.type !== 'object'
    })

    if (!activeCharacter) {
      return
    }

    useStore.setState({ activeCharacter })

    gsap.killTweensOf(state.camera.position, 'x, y, z')
    gsap.set(state.camera.position, {
      x: activeCharacter.position.x,
      y: state.camera.aspect <= 1 ? -1 / 3 : 0,
      z: (state.camera.aspect <= 1 ? 8 : 6.5) + activeCharacter.position.z,
    })
  }, [state])

  useEffect(() => {
    checkCamera()
    useStore.setState({ introDone: true })
  }, [state])

  return <></>
}

export default function PuckStage({ puck, index, length }) {
  const state = useThree()
  const r = state.camera.rotation
  const [reveledPucks, playedPucks, shouldReveal, addPlayedPucks, puckOpenPlaying] = useStore((s) => [
    s.reveledPucks,
    s.playedPucks,
    s.shouldReveal,
    s.addPlayedPucks,
    s.puckOpenPlaying,
  ])

  const { title } = puck
  useEffect(() => {
    if (playedPucks.includes(title)) {
      useStore.setState({ puckOpenPlaying: true })
    }
  }, [playedPucks, title])

  useFrame(() => {
    if (!shouldReveal) {
      if (r.x !== -0.1 || r.y !== 0 || r.z !== 0) {
        state.camera.rotation.set(-0.1, 0, 0)
      }
    }
  })

  return (
    <group>
      <Scroller>
        {reveledPucks.includes(puck.title) ? (
          <Card
            visible={true}
            {...puck}
            shouldSpinn
            position={[2, -2, 4]}
            rotation={[0, 0, 0]}
            isHome={false}
            key={puck.title}
            length={length}
            index={index}
            showDetails={true}
          />
        ) : (
          <Puck
            visible={!playedPucks.includes(puck.title)}
            {...puck}
            shouldSpinn
            isHome={false}
            key={puck.title}
            length={length}
            index={index}
          />
        )}
      </Scroller>
      <ambientLight color={'#ffffff'} intensity={4} />
      <ambientLight color={'#4F396C'} intensity={1} />
      {/* <fog attach='fog' args={['black', 20, 50]} /> */}
      <pointLight color={'#3f3b44'} intensity={0.5} position={[0, 0, 0]} />
      {/* <pointLight color={'#0688AF'} intensity={1} position={[0, 0, -100]} /> */}
      <pointLight color={'#fff'} intensity={0.5} position={[0, -2, -15]} />
      <CameraReset title={puck.title} />
      <CameraCheck />
      {shouldReveal && (
        <CameraShaker
          onComplete={() => {
            useStore.setState({ shouldReveal: false })
            addPlayedPucks(puck.title)
          }}
          camera={state.camera}
        />
      )}

      {puckOpenPlaying && !reveledPucks.includes(title) && (
        <Video
          play={puckOpenPlaying}
          autoplay={false}
          position={[0, -1, -5]}
          scale={1}
          loop={false}
          mp4={'/textures/packOpening.mp4'}
          // webm={'/textures/puck_open.webm'}
          webm={'/textures/puck_open.webm'}
          onTimeUpdate={() => {}}
          alignCenter
        />
      )}

      {!puckOpenPlaying && <Floor />}
    </group>
  )
}
