import dynamic from 'next/dynamic'
import React, { useLayoutEffect, useRef } from 'react'
import useStore from '@/lib/store'
import pucks from '@/content/pucks'
import PackInfo from '@/components/dom/PackInfo'
import PuckPagination from '@/components/dom/PuckPagination'
import Button from '@/components/dom/Button'
import { gsap } from 'gsap'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Stage = dynamic(() => import('@/components/canvas/PackStageScroll'), { ssr: false })

// Dom components go here
export default function Page(props) {
  const introDone = useStore((s) => s.introDone)
  const activeIndex = useStore((s) => s.activeIndex)
  const router = useStore((s) => s.router)
  const overlayRef = useRef()
  useLayoutEffect(() => {
    document.querySelector('canvas').style.zIndex = '0'
    if (!overlayRef.current && !introDone) return
    const tween = gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 1,
      ease: 'Power4.Out',
      onComplete: () => useStore.setState({ startIntro: true }),
    })
    return () => {
      tween.kill()
    }
  }, [])

  const clickHandler = () => {
    useStore.setState({ shouldReveal: true, animateIn: true })
  }

  return (
    <>
      <main className=''>
        {!introDone && <div ref={overlayRef} className='fixed top-0 left-0 w-full h-screen bg-black'></div>}
        <PackInfo pucks={pucks} />
        {introDone && <PuckPagination />}
      </main>
      {introDone && (
        <div className='absolute bottom-0 flex justify-center w-full'>
          <Button onClick={clickHandler} text={'REAVEAL'}></Button>
        </div>
      )}
    </>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
// @ts-ignore
Page.canvas = (props) => {
  return <Stage pucks={pucks} />
}

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
