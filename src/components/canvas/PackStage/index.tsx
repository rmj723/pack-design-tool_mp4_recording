// @ts-nocheck

import * as THREE from 'three'
import { useLayoutEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { RGBELoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'
import {
  MeshReflectorMaterial,
  Text3D,
  useTexture,
  Html,
  Image,
  MeshTransmissionMaterial,
  useVideoTexture,
  GradientTexture,
} from '@react-three/drei'
import { useControls, button } from 'leva'
import { Group } from 'three'
import gsap from 'gsap'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MousePositionControls } from './MousePositionControls'
import React from 'react'
import useStore from '@/lib/store'
import { useUserAgent } from '@oieduardorabelo/use-user-agent'
import { Overlay } from './Overlay'
import Video from '@/components/canvas/Video'

function downloadJsonAsFile(jsonData, fileName) {
  const jsonString = JSON.stringify(jsonData)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = fileName + '.json'
  link.click()

  URL.revokeObjectURL(url)
}

export default function BackText() {
  const font = '/RuderPlakat100.json'
  const textGroup = useRef<Group>()
  const [packVideoSrc, setPackVideoSrc] = useState('/textures/packOpening.webm')
  const [smokeVideoSrc, setSmokeVideoSrc] = useState('/textures/NHL-BKWY-Pack-Smoke-Loop-Desktop_v2-vp9-chrome.webm')

  const texture = useLoader(
    RGBELoader,
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/mpumalanga_veld_puresky_1k.hdr',
  )

  const { textContent, textSize, duration, background } = useControls('3D Text', {
    textContent: 'OPENING ACT',
    textSize: { value: 10, min: 1, max: 20, step: 0.1 },
    duration: { value: 25, min: 0, max: 30, step: 1 },
    background: { value: null, image: true },
  })

  const config = {
    backside: false,
    samples: 8,
    resolution: 384,
    transmission: 0.93,
    clearcoat: 0.0,
    clearcoatRoughness: 0.0,
    thickness: 1.9,
    chromaticAberration: 2.55,
    anisotropy: 0.3,
    roughness: 0.18,
    distortion: 3.63,
    distortionScale: 0.18,
    temporalDistortion: 0.14,
    ior: 1.28,
    reflectivity: 0.53,
    color: '#e4c2fc',
  }

  const playPackOpening = useStore((state) => state.playPackOpening)

  let details = useUserAgent()
  useLayoutEffect(() => {
    if (details && details.browser.name === 'Safari') {
      setPackVideoSrc('/textures/packOpening.mp4')
      setSmokeVideoSrc('/textures/NHL-BKWY-Pack-Smoke-Loop-Desktop_v2-hevc-safari.mp4')
    }
    if (isMobile) {
      setPackVideoSrc('')
      setSmokeVideoSrc('')
    }
  }, [details])

  const onTimeUpdate = (e) => {
    const progress = (e.target.currentTime / e.target.duration) * 100
    if (progress > 95) {
      useStore.setState({ packOpeningEnd: true })
    }
  }

  const packPoster = useTexture('/pack_poster.png')

  const tweenRef = useRef(null)

  return (
    <>
      <Image
        url={background === true ? `/registerimage2.png` : background}
        position={[10, 5, -45]}
        scale={[100, 30]}
        alt=''
      />
      {/* Video texture test */}
      {/* {!isMobile && (
        <Video
          play={playPackOpening}
          autoplay={false}
          position={[0, -0.7, 8]}
          scale={1.8}
          loop={false}
          mp4={'/textures/packOpening.mp4'}
          webm={'/textures/packOpening.webm'}
          onTimeUpdate={onTimeUpdate}
        />
      )} */}
      <ambientLight color={'#0688AF'} intensity={5} />
      <ambientLight color={'#4F396C'} intensity={2} />
      {/* <fog attach='fog' args={['black', 20, 50]} /> */}
      <pointLight color={'#BF8FFD'} intensity={1} position={[0, 0, 0]} />
      <pointLight color={'#0688AF'} intensity={1} position={[0, 0, -100]} />
      <pointLight color={'#fff'} intensity={1} position={[0, 0, 0]} />
      {/* {!playPackOpening && !isMobile && (
        <mesh position={[0, -0.7, 8]} scale={isMobile ? [1, 1, 1] : [1.8, 1.8, 1.8]}>
          <planeGeometry args={[16, 9, 1, 1]} />
          <meshBasicMaterial map={packPoster} toneMapped={false} transparent />
        </mesh>
      )} */}
      {/* {!isMobile && (
        <Video
          play={true}
          autoplay={true}
          loop={true}
          position={[0, -0.7, 8.01]}
          rotation={[0, 0, 0]}
          scale={[2, 2, 2]}
          mp4={'/textures/NHL-BKWY-Pack-Smoke-Loop-Desktop_v2-hevc-safari.mp4'}
          webm={'/textures/NHL-BKWY-Pack-Smoke-Loop-Desktop_v2-vp9-chrome.webm'}
        />
      )} */}

      <Floor />
      <Overlay />
      <MousePositionControls />
      {/* <Shadows /> */}
    </>
  )
}

const Floor = () => {
  const normalMap = useLoader(TextureLoader, '/textures/ICY_Normal.png')

  return (
    <group position={[0, isMobile ? 3 : 0, 0]}>
      <mesh position={[0, -4.75, -2]} rotation-x={-Math.PI / 2.1}>
        <planeGeometry args={[50, 20, 1, 1]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color='#050505'
          // color='#fff'
          metalness={0.5}
          mirror={1}
          normalMap={normalMap}
        />
      </mesh>
      <mesh position={[0, -5.31, 5.5]} rotation-x={-Math.PI / 2.1}>
        <planeGeometry args={[50, 5, 1, 1]} />
        <meshBasicMaterial transparent>
          <GradientTexture stops={[0, 0.2, 1]} colors={['transparent', 'transparent', '#000']} size={100} />
        </meshBasicMaterial>
      </mesh>
      <mesh position={[0, -8, 6]}>
        <planeGeometry args={[50, 5, 1, 1]} />
        <meshBasicMaterial color={'black'} />
      </mesh>
    </group>
  )
}
