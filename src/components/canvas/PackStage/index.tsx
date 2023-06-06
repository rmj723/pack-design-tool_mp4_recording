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
  MeshTransmissionMaterial,
  useVideoTexture,
  GradientTexture,
} from '@react-three/drei'
import { useControls } from 'leva'
import { Group } from 'three'
import gsap from 'gsap'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MousePositionControls } from './MousePositionControls'
import React from 'react'
import useStore from '@/lib/store'
import { useUserAgent } from '@oieduardorabelo/use-user-agent'
import { Overlay } from './Overlay'
import Video from '@/components/canvas/Video'

export default function BackText() {
  const font = '/RuderPlakat100.json'
  const textGroup = useRef<Group>()
  const [packVideoSrc, setPackVideoSrc] = useState('/textures/packOpening.webm')
  const [smokeVideoSrc, setSmokeVideoSrc] = useState('/textures/NHL-BKWY-Pack-Smoke-Loop-Desktop_v2-vp9-chrome.webm')

  const texture = useLoader(
    RGBELoader,
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/mpumalanga_veld_puresky_1k.hdr',
  )

  const config = useControls('3D Text', {
    backside: false,
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 512, min: 64, max: 2048, step: 64 },
    transmission: { value: 0.6, min: 0, max: 1 },
    clearcoat: { value: 0, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
    thickness: { value: 0.55, min: 0, max: 5 },
    chromaticAberration: { value: 5, min: 0, max: 5 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortion: { value: 1, min: 0, max: 4, step: 0.01 },
    distortionScale: { value: 1, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.4, min: 0, max: 1, step: 0.01 },
    ior: { value: 0.83, min: 0, max: 2, step: 0.01 },
    reflectivity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    color: '#474c62',
    // color: '#ff9cf5',
  })

  // const config = {
  //   backside: false,
  //   samples: 8,
  //   resolution: 384,
  //   transmission: 0.93,
  //   clearcoat: 0.0,
  //   clearcoatRoughness: 0.0,
  //   thickness: 1.9,
  //   chromaticAberration: 2.55,
  //   anisotropy: 0.3,
  //   roughness: 0.18,
  //   distortion: 3.63,
  //   distortionScale: 0.18,
  //   temporalDistortion: 0.14,
  //   ior: 1.28,
  //   reflectivity: 0.53,
  //   color: '#e4c2fc',
  // }

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

  useLayoutEffect(() => {
    const tween = gsap.to(textGroup.current.position, {
      x: -61,
      ease: 'none',
      duration: 25,
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <>
      {/* Video texture test */}
      {!isMobile && (
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
      )}
      <ambientLight color={'#0688AF'} intensity={5} />
      <ambientLight color={'#4F396C'} intensity={2} />
      {/* <fog attach='fog' args={['black', 20, 50]} /> */}
      <pointLight color={'#BF8FFD'} intensity={1} position={[0, 0, 0]} />
      <pointLight color={'#0688AF'} intensity={1} position={[0, 0, -100]} />
      <pointLight color={'#fff'} intensity={1} position={[0, 0, 0]} />
      {!playPackOpening && !isMobile && (
        <mesh position={[0, -0.7, 8]} scale={isMobile ? [1, 1, 1] : [1.8, 1.8, 1.8]}>
          <planeGeometry args={[16, 9, 1, 1]} />
          <meshBasicMaterial map={packPoster} toneMapped={false} transparent />
        </mesh>
      )}
      {!isMobile && (
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
      )}
      {/* 3D TEXT */}
      <group position={[0, isMobile ? 3 : 0, 0]} ref={textGroup}>
        <Text3D
          position={[-20, -4.21, -10]}
          smooth={1}
          // castShadow
          bevelEnabled
          font={font}
          scale={10}
          height={0.25}
          bevelSize={0.01}
          bevelSegments={4}
          curveSegments={5}
          bevelThickness={0.01}>
          OPENING ACT
          <MeshTransmissionMaterial background={texture} {...config} />
        </Text3D>
        <Text3D
          position={[41, -4.21, -10]}
          smooth={1}
          // castShadow
          bevelEnabled
          font={font}
          scale={10}
          height={0.25}
          bevelSize={0.01}
          bevelSegments={4}
          curveSegments={5}
          bevelThickness={0.01}>
          OPENING ACT
          <MeshTransmissionMaterial background={texture} {...config} />
        </Text3D>
      </group>
      {/* 2D TEXT */}
      <Html
        position={[0, isMobile ? 8.1 : 5.75, 0]}
        occlude='blending'
        transform
        wrapperClass='small-back-text-container'>
        {/* <p className='small-back-text'>
          ANAHEIM DUCKS · ARIZONA COYOTES · BOSTON BRUINS · BUFFALO SABRES · CALGARY FLAMES · CAROLINA HURRICANES ·
          CHICAGO BLACKHAWKS · COLORADO AVALANCHE · COLUMBUS BLUE JACKETS · DALLAS STARS · DETROIT RED WINGS · EDMONTON
          OILERS · FLORIDA PANTHERS · LOS ANGELES KINGS · MINNESOTA WILD · MONTREAL CANADIENS · NASHVILLE PREDATORS ·
          NEW JERSEY DEVILS · NEW YORK ISLANDERS · NEW YORK RANGERS · OTTAWA SENATORS · PHILADELPHIA FLYERS · PITTSBURGH
          PENGUINS · SAN JOSE SHARKS · SEATTLE KRAKEN · ST. LOUIS BLUES · TAMPA BAY LIGHTNING · TORONTO MAPLE LEAFS ·
          VANCOUVER CANUCKS · VEGAS GOLDEN KNIGHTS · WASHINGTON CAPITALS · WINNIPEG JETS
        </p> */}

        <section>
          <div className='marquee enable-animation'>
            <ul className='marquee__content'>
              <li>&nbsp;ANAHEIM DUCKS ·</li>
              <li>&nbsp;ARIZONA COYOTES ·</li>
              <li>&nbsp;BOSTON BRUINS ·</li>
              <li>&nbsp;BUFFALO SABRES ·</li>
              <li>&nbsp;CALGARY FLAMES ·</li>
              <li>&nbsp;CAROLINA HURRICANES ·</li>
              <li>&nbsp;CHICAGO BLACKHAWKS ·</li>
              <li>&nbsp;COLORADO AVALANCHE ·</li>
              <li>&nbsp;COLUMBUS BLUE JACKETS ·</li>
              <li>&nbsp;DALLAS STARS ·</li>
              <li>&nbsp;DETROIT RED WINGS ·</li>
              <li>&nbsp;EDMONTON OILERS ·</li>
              <li>&nbsp;FLORIDA PANTHERS ·</li>
              <li>&nbsp;LOS ANGELES KINGS ·</li>
              <li>&nbsp;MINNESOTA WILD ·</li>
              <li>&nbsp;MONTREAL CANADIENS ·</li>
              <li>&nbsp;NASHVILLE PREDATORS ·</li>
              <li>&nbsp;NEW JERSEY DEVILS ·</li>
              <li>&nbsp;NEW YORK ISLANDERS ·</li>
              <li>&nbsp;NEW YORK RANGERS ·</li>
              <li>&nbsp;OTTAWA SENATORS ·</li>
              <li>&nbsp;PHILADELPHIA FLYERS ·</li>
              <li>&nbsp;PITTSBURGH PENGUINS ·</li>
              <li>&nbsp;SAN JOSE SHARKS ·</li>
              <li>&nbsp;SEATTLE KRAKEN ·</li>
              <li>&nbsp;ST. LOUIS BLUES ·</li>
              <li>&nbsp;TAMPA BAY LIGHTNING ·</li>
              <li>&nbsp;TORONTO MAPLE LEAFS ·</li>
              <li>&nbsp;VANCOUVER CANUCKS ·</li>
              <li>&nbsp;VEGAS GOLDEN KNIGHTS ·</li>
              <li>&nbsp;WASHINGTON CAPITALS ·</li>
              <li>&nbsp;WINNIPEG JETS ·</li>
            </ul>

            <ul aria-hidden='true' className='marquee__content'>
              <li>&nbsp;ANAHEIM DUCKS ·</li>
              <li>&nbsp;ARIZONA COYOTES ·</li>
              <li>&nbsp;BOSTON BRUINS ·</li>
              <li>&nbsp;BUFFALO SABRES ·</li>
              <li>&nbsp;CALGARY FLAMES ·</li>
              <li>&nbsp;CAROLINA HURRICANES ·</li>
              <li>&nbsp;CHICAGO BLACKHAWKS ·</li>
              <li>&nbsp;COLORADO AVALANCHE ·</li>
              <li>&nbsp;COLUMBUS BLUE JACKETS ·</li>
              <li>&nbsp;DALLAS STARS ·</li>
              <li>&nbsp;DETROIT RED WINGS ·</li>
              <li>&nbsp;EDMONTON OILERS ·</li>
              <li>&nbsp;FLORIDA PANTHERS ·</li>
              <li>&nbsp;LOS ANGELES KINGS ·</li>
              <li>&nbsp;MINNESOTA WILD ·</li>
              <li>&nbsp;MONTREAL CANADIENS ·</li>
              <li>&nbsp;NASHVILLE PREDATORS ·</li>
              <li>&nbsp;NEW JERSEY DEVILS ·</li>
              <li>&nbsp;NEW YORK ISLANDERS ·</li>
              <li>&nbsp;NEW YORK RANGERS ·</li>
              <li>&nbsp;OTTAWA SENATORS ·</li>
              <li>&nbsp;PHILADELPHIA FLYERS ·</li>
              <li>&nbsp;PITTSBURGH PENGUINS ·</li>
              <li>&nbsp;SAN JOSE SHARKS ·</li>
              <li>&nbsp;SEATTLE KRAKEN ·</li>
              <li>&nbsp;ST. LOUIS BLUES ·</li>
              <li>&nbsp;TAMPA BAY LIGHTNING ·</li>
              <li>&nbsp;TORONTO MAPLE LEAFS ·</li>
              <li>&nbsp;VANCOUVER CANUCKS ·</li>
              <li>&nbsp;VEGAS GOLDEN KNIGHTS ·</li>
              <li>&nbsp;WASHINGTON CAPITALS ·</li>
              <li>&nbsp;WINNIPEG JETS ·</li>
            </ul>
          </div>
        </section>
      </Html>

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
