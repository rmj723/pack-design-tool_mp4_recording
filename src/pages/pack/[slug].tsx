import dynamic from 'next/dynamic'
import React, { useRef, useLayoutEffect, useState } from 'react'
import pucks from '@/content/pucks'
import PuckTitle from '@/components/dom/PuckTitle'
import type { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import BackToPack from '@/components/dom/BackToPack'
import Button from '@/components/dom/Button'
import useStore from '@/lib/store'
import Video from '@/components/dom/Video'
import gsap from 'gsap'
import Flicker from '@/components/dom/Flicker/indext'
import PuckInfo from '@/components/dom/PuckInfo'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Stage = dynamic(() => import('@/components/canvas/PuckStage'), { ssr: false })

// Dom components go here
export default function Slug({ puck }) {
  const playPuckOpening = useStore((state) => state.playPuckIntro)
  // const [playing, setPlaying] = useState(false)
  const isLoaded = useStore((state) => state.isLoaded)
  const btnRef = useRef<HTMLDivElement>(null)
  const [reveledPucks, addReveledPucks, playedPucks, addPlayedPucks, shouldReveal, puckOpenPlaying] = useStore(
    (state) => [
      state.reveledPucks,
      state.addReveledPucks,
      state.playedPucks,
      state.addPlayedPucks,
      state.shouldReveal,
      state.puckOpenPlaying,
    ],
  )
  useLayoutEffect(() => {
    if (!isLoaded) {
      return
    }

    // gsap.to(btnRef.current, {
    //   delay: 0.25,
    //   duration: 0.67,
    //   y: '0%',
    //   ease: 'expo.out',
    // })
  }, [isLoaded])

  useLayoutEffect(() => {
    if (!playedPucks.includes(puck.title)) {
      return
    }

    gsap.to(btnRef.current, {
      delay: 0.25,
      duration: 0.67,
      y: '100%',
      ease: 'expo.out',
    })
  }, [playedPucks])

  useLayoutEffect(() => {
    if (!shouldReveal) return
    gsap.to(btnRef.current, {
      delay: 1,
      duration: 0.67,
      y: '100%',
      ease: 'expo.out',
      // onComplete: () => {
      //   addPlayedPucks(puck.title)
      // },
    })
  }, [shouldReveal])

  useLayoutEffect(() => {
    useStore.setState({ animateIn: false })
  }, [])
  return (
    <>
      <main>
        <div className={`${puckOpenPlaying ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000	`}>
          {/* @ts-ignore */}
          <PuckTitle puck={puck} />
        </div>

        {!reveledPucks.includes(puck.title) && (
          <>
            <Video
              playing={playedPucks.includes(puck.title)}
              className={`${
                playedPucks.includes(puck.title) || reveledPucks.includes(puck.title) ? 'opacity-0' : 'opacity-0'
              } pointer-events-none z-0 transition-opacity duration-750	`}
              onEnded={() => {
                addReveledPucks(puck.title)
                // setPlaying(false)
                useStore.setState({ puckOpenPlaying: false })
              }}
              onPlay={() => {
                // setPlaying(true)
                useStore.setState({ puckOpenPlaying: true })
              }}
              // src={['/textures/puck_open.webm']}
              src={['/textures/puck_open.webm']}
            />
          </>
        )}
        <div className={`${puckOpenPlaying ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000	`}>
          <BackToPack />
        </div>

        <button
          onClick={() => {
            addReveledPucks(puck.title)
            // setPlaying(false)
            useStore.setState({ puckOpenPlaying: false })
          }}
          className={`${
            puckOpenPlaying ? 'opacity-100' : 'opacity-0'
          } absolute top-6 text-16 right-8 border-spacing-0 border-black-1 px-4 py-1 transition-opacity  border duration-1000`}>
          SKIP ANIMATION
        </button>
        {shouldReveal && <Flicker />}
        {reveledPucks.includes(puck.title) && <PuckInfo />}
      </main>
      <div ref={btnRef} className={`absolute bottom-0 z-10 left-[50%] translate-x-[-50%]`}>
        <Button
          className='px-10'
          onClick={() => {
            useStore.setState({ shouldReveal: true })
          }}
          text={'Reveal'}
        />
      </div>
    </>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
// @ts-ignore
Slug.canvas = ({ puck, index, length }) => <Stage puck={puck} length={length} index={index} />

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const slug = params!.slug

  if (!slug) {
    throw new Error(`Character slug not found`)
  }

  const puck = pucks.find((puck) => {
    return puck.slug === `${slug}`
  })

  if (!puck) {
    throw new Error(`puck not found`)
  }

  return {
    props: {
      puck: puck,
      length: pucks.length,
      index: pucks.indexOf(puck),
    },
  }
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  return {
    paths: pucks.map((puck: any) => `/pack${puck.path}`),
    fallback: 'blocking',
  }
}
