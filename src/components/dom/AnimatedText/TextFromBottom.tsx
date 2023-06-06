import { useEffect, useRef } from 'react'
import gsap from 'gsap'
export default function TextFromBottom({
  duration = 1,
  delay = 0,
  children,
}: {
  duration?: number
  delay?: number
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      duration,
      delay,
      y: '0%',
      ease: 'expo.out',
    })
  }, [])

  return (
    <div className='overflow-hidden'>
      <span className='block translate-y-[100%]' ref={ref}>
        {children}
      </span>
    </div>
  )
}
