import dynamic from 'next/dynamic'
import Button from '@/components/dom/Button'
import useStore from '@/lib/store'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { isMobile } from 'react-device-detect'
import Video from '@/components/dom/Video'
import { useRouter } from 'next/router'
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
  const { push: routerPush } = useRouter()
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

  const videoRef = useRef(null!)
  const mediaRecorder = useRef<MediaRecorder>(null!)
  const { recorder } = useStore()

  useEffect(() => {
    setTimeout(() => {
      console.log(recorder)
      const videoStream = videoRef.current.captureStream()
      mediaRecorder.current = new MediaRecorder(videoStream)
      mediaRecorder.current.addEventListener('dataavailable', (event: BlobEvent) => {
        console.log(33333, recorder.chunks)
        if (event.data.size > 0) {
          const videoChunks = [event.data, recorder.chunks[0]]

          const blob = new Blob(videoChunks, { type: 'video/webm' })
          const url = URL.createObjectURL(blob)

          // Create a download link and simulate a click to download the recording
          const a = document.createElement('a')
          a.href = url
          a.download = 'video_recording.webm'
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        }
      })
    }, 100)
  }, [recorder])

  return (
    <>
      <main>
        {/* <div
        ref={overlayRef}
        style={{ background: '#000' }}
        className='absolute top-0 left-0 w-full h-screen opacity-0 z-[10000000]'></div> */}
        <div className='absolute bottom-0 z-[10000001] left-[50%] translate-x-[-50%]'>
          {/* <Button
            text='OPEN PACK'
            ref={btnRef}
            // className={`${playPackOpening ? s.flicker : ''}`}
            flicker={playPackOpening}
            onClick={() => {
              useStore.setState({ playPackOpening: true })
              routerPush('/pack')
            }}></Button> */}

          <video ref={videoRef} id='videoElement' controls>
            <source src='/textures/welcome.webm' type='video/mp4' />
          </video>
          <button
            onClick={() => {
              console.log('start', recorder.chunks)
              mediaRecorder.current.start()
            }}>
            start
          </button>
          <button
            style={{ margin: '10px' }}
            onClick={() => {
              console.log('stop')
              mediaRecorder.current.stop()
            }}>
            Stop
          </button>
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
