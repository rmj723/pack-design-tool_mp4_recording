import gsap from 'gsap'
import useStore from '@/lib/store'
import pucks from '@/content/pucks'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState, useCallback } from 'react'
import s from './PuckToggle.module.scss'

const PuckToggle: FC = () => {
  const activeProject = useStore((s) => s.activeProject)
  const hoverProject = useStore((s) => s.hoverProject)
  const isLoaded = useStore((s) => s.isLoaded)
  const router = useRouter()
  const ref = useRef(null)
  const titleRef = useRef(null)
  const blurRef = useRef(null)
  const opacityElements = useRef(new Array(2))
  const [isOpen, setIsOpen] = useState(false)
  const [activePuck, setActivePuck] = useState<boolean | string>(false)

  const keyboardCheck = useCallback((e) => {
    if (e.key === 'Escape' || e.code === 'Escape') {
      if (!open) {
        return
      }

      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', keyboardCheck)

    return () => {
      window.removeEventListener('keydown', keyboardCheck)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    gsap.to(opacityElements.current, {
      duration: 0.67,
      opacity: 1,
      stagger: 0.1,
      ease: 'power2.out',
    })

    gsap.to(titleRef.current, {
      duration: 0.67,
      y: 0,
      ease: 'expo.out',
    })
  }, [isLoaded])

  useEffect(() => {
    const el = gsap.utils.selector(ref.current)
    if (isOpen) {
      gsap.killTweensOf(el('.title-el'), 'y')
      gsap.set(el('.title-el'), {
        y: '100%',
      })
    }

    gsap.set(blurRef.current, {
      pointerEvents: isOpen ? 'all' : 'none',
    })

    gsap.to(blurRef.current, {
      duration: 0.5,
      delay: isOpen ? 0 : 0.15,
      ease: 'power2.out',
      opacity: isOpen ? 1 : 0,
    })

    gsap.set(ref.current, {
      pointerEvents: isOpen ? 'all' : 'none',
    })

    gsap.to(el('.title-el'), {
      duration: 0.75,
      y: isOpen ? '0%' : '-100%',
      stagger: 0.025,
      ease: 'expo.out',
    })
  }, [isOpen])

  useEffect(() => {
    if (activePuck) {
      setTimeout(() => {
        router.prefetch(`/pack/${activePuck}`)
        router.push(`/pack/${activePuck}`)
      }, 500)
    }
  }, [activePuck])

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black opacity-0 cursor-pointer pointer-events-none backdrop-filter bg-opacity-50`}
        ref={blurRef}
        onClick={() => {
          setIsOpen(false)
        }}
      />

      <div
        className={`${s.select} fixed z-30 flex-col pointer-events-none text-53 left-1/2`}
        onClick={(e) => {
          e.stopPropagation()
        }}
        style={{
          opacity: useStore((s) => s.introDone) ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}>
        <span
          className='relative text-center cursor-pointer pointer-events-auto'
          onClick={() => {
            setIsOpen((state) => !state)
          }}>
          <span className='flex justify-center overflow-hidden'>
            <span className={`${s.span}`} ref={titleRef}>
              {activeProject || hoverProject ? activeProject || hoverProject : 'Select your Puck'}
            </span>
          </span>
        </span>

        <ul className='m-2 overflow-hidden pointer-events-none' ref={ref}>
          {pucks.map((puck, index) => {
            /* @ts-ignore */
            return puck.title !== activeProject ? (
              <li className='p-1 text-center' key={puck.title}>
                <button
                  type='button'
                  className={`${s.button} flex justify-center mx-auto overflow-hidden text-center`}
                  onClick={() => {
                    isOpen && setActivePuck(puck.slug)
                    useStore.setState({ activeProject: puck.title })
                    /* @ts-ignore */
                    setIsOpen(false)
                  }}>
                  <span className={`${s.span} text-center title-el`}>{puck.title}</span>
                </button>
              </li>
            ) : (
              false
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default PuckToggle
