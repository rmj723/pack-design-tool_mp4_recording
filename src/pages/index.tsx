import dynamic from 'next/dynamic'
import Button from '@/components/dom/Button'
import useStore from '@/lib/store'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { isMobile } from 'react-device-detect'
import Video from '@/components/dom/Video'
// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Stage = dynamic(() => import('@/components/canvas/PackStage'), { ssr: false })

// Dom components go here
export default function Page(props) {
  const playPackOpening = useStore((state) => state.playPackOpening)
  const router = useStore((state) => state.router)
  const btnRef = useRef()

  useLayoutEffect(() => {
    if (playPackOpening && btnRef.current) {
      const tween = gsap.to(btnRef.current, {
        duration: 1,
        delay: 1.5,
        y: '100%',
        ease: 'Power4.Out',
      })
      return () => {
        tween.kill()
      }
    }
  }, [playPackOpening])

  const onTimeUpdate = (e) => {
    const progress = (e.target.currentTime / e.target.duration) * 100
    if (progress > 95) {
      useStore.setState({ packOpeningEnd: true })
    }
  }

  return (
    <>
      <main>
        {/* <div
        ref={overlayRef}
        style={{ background: '#000' }}
        className='absolute top-0 left-0 w-full h-screen opacity-0 z-[10000000]'></div> */}
        <div className='absolute bottom-0 z-[10000001] left-[50%] translate-x-[-50%]'>
          <Button
            text='OPEN PACK'
            ref={btnRef}
            // className={`${playPackOpening ? s.flicker : ''}`}
            flicker={playPackOpening}
            onClick={() => useStore.setState({ playPackOpening: true })}></Button>
        </div>
        {isMobile && (
          <Video
            playing={playPackOpening}
            className={`pointer-events-none z-[10000001]`}
            onTimeUpdate={onTimeUpdate}
            poster={'/img/pack_poster_mobile.png'}
            src={['/textures/Mobile-vp9-chrome.webm', '/textures/Mobile-hevc-safari.mp4']}
          />
        )}
      </main>
    </>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
// @ts-ignore
Page.canvas = (props) => <Stage />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
