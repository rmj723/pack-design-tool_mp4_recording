import gsap from 'gsap'
import useStore from '@/lib/store'
import React, { useState, useContext, useEffect, useRef } from 'react'

const TransitionContext = React.createContext({
  timeline: null,
})

export const TransitionLayout = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(children)
  const { timeline } = useContext(TransitionContext)
  const el = useRef(null)
  const hasRouted = useStore((s) => s.hasRouted)

  useEffect(() => {
    if (children !== displayChildren && hasRouted) {
      createTimeline(timeline, el)
      useStore.setState({ isRouting: true })

      if (timeline.duration() === 0) {
        setDisplayChildren(children)
        useStore.setState({ isRouting: false })
      } else {
        timeline.play().then(() => {
          timeline.seek(0).pause().clear()
          setDisplayChildren(children)
        })

        timeline.eventCallback('onComplete', () => {
          useStore.setState({ isRouting: false })
        })
      }
    }
  }, [children, hasRouted])

  return <div ref={el}>{displayChildren}</div>
}

export const TransitionProvider = ({ children }) => {
  const [timeline] = useState(() =>
    gsap.timeline({
      paused: true,
    }),
  )

  return <TransitionContext.Provider value={{ timeline }}>{children}</TransitionContext.Provider>
}

const createTimeline = (timeline, el) => {
  timeline.add(
    gsap.set(el.current.querySelector('main'), {
      pointerEvents: 'none',
    }),
    0,
  )

  timeline.add(
    gsap.to(el.current.querySelector('main'), {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
    }),
    0,
  )

  timeline.add(
    gsap.to(el.current, {
      duration: 0.5,
    }),
    0,
  )

  if (useStore.getState().activeCharacter) {
    const activeCharacter = useStore.getState().activeCharacter
    gsap.to(activeCharacter.rotation, {
      duration: 1,
      y: Math.PI * 2,
      ease: 'expo.out',
    })
    useStore.setState({ activeCharacter: false })
  }

  if (useStore.getState().activeGroup) {
    useStore.getState().activeGroup.children.forEach((child, index) => {
      if (child.type !== 'object') {
        return
      }

      gsap.to(child.scale, {
        delay: useStore.getState().activeObject ? 0 : 0.07 * index,
        duration: useStore.getState().activeObject ? 0.5 : 0.75,
        x: 0,
        y: 0,
        z: 0,
        ease: 'expo.out',
      })
    })
  }
}
