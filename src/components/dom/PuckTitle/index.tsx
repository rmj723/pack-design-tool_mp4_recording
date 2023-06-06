import gsap from 'gsap'
import useStore from '@/lib/store'
import { FC, useEffect, useRef } from 'react'
import s from './PuckTitle.module.scss'
import pucks from '@/content/pucks'

/* @ts-ignore */
const PuckTitle: FC = ({ puck }: { puck: any }) => {
  const activeProject = useStore((s) => s.activeProject)
  const activeObject = useStore((s) => s.activeObject)
  const ref = useRef(null)
  const linkRef = useRef(null)
  const titleRef = useRef(null)
  const spanRef = useRef(null)
  const subtitles = useRef(new Array(2))
  const isLoaded = useStore((state) => state.isLoaded)

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    gsap.to(titleRef.current, {
      delay: 0.25,
      duration: 0.67,
      y: '0%',
      ease: 'expo.out',
    })
  }, [isLoaded])

  return (
    <h1
      className={`${s.title} z-10 fixed top-8 b768:top-7 left-1/2 flex flex-col items-center pointer-events-auto`}
      ref={ref}>
      <span className={`text-51 whitespace-nowrap overflow-hidden flex`}>
        {/* @ts-ignore */}
        <span ref={titleRef} className={`${s.span} whitespace-nowrap`}>
          {activeObject && activeObject !== 'hasVisited' ? activeObject : activeProject ? activeProject : ''}
        </span>
      </span>
    </h1>
  )
}

export default PuckTitle
