import useVirtualScroll from '@/hooks/useVirtualScroll'
import { scroll } from '@/utils/scroll'
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { isMobile } from 'react-device-detect'
import useStore from '@/lib/store'

const Scroller = ({ children }) => {
  const ref = useRef()
  const homeClock = useRef(0)
  const projectClock = useRef(0)
  const state = useThree()
  const activeProject = useStore((state) => state.activeProject)
  const activeObject = useStore((state) => state.activeObject)
  const hoverObject = useStore((state) => state.hoverObject)

  const onVirtualScroll = (e) => {
    scroll.wheel.y = e.deltaY * 1

    if (useStore.getState().aboutActive) {
      return
    }

    if (!activeProject) {
      scroll.th -= scroll.wheel.y
    }

    if (activeProject && !activeObject && !hoverObject) {
      scroll.tp -= scroll.wheel.y
    }
  }

  useEffect(() => {
    useStore.setState({ activeGroup: ref.current })

    scroll.tp = 0
    scroll.cp = 0
    projectClock.current = 0
  }, [state])

  useVirtualScroll(ref, onVirtualScroll, [ref.current])

  useFrame(() => {
    if (useStore.getState().aboutActive) {
      return
    }

    if (!useStore.getState().activeProject) {
      homeClock.current += 0.00025
      if (isMobile) {
        scroll.ch = scroll.sl
      } else {
        scroll.ch += (scroll.th - scroll.ch) * 0.25
      }
    }

    if (!useStore.getState().activeObject && !useStore.getState().hoverObject) {
      projectClock.current += isMobile ? 0.00025 : 0.001
      scroll.cp += (scroll.tp - scroll.cp) * (isMobile ? 0.1 : 0.25) + projectClock.current
    }
  })

  return <group ref={ref}>{children}</group>
}

export default Scroller
