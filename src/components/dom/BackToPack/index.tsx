import gsap from 'gsap'
import useStore from '@/lib/store'
import Link from 'next/link'
import { FC, useRef, useEffect } from 'react'
import s from './BackToPack.module.scss'

const BackToPack: FC = () => {
  const activeObject = useStore((s) => s.activeObject)
  const ref = useRef<HTMLSpanElement>(null)
  const isLoaded = useStore((state) => state.isLoaded)

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    gsap.to(ref.current, {
      duration: 0.75,
      delay: 0.075,
      y: '0%',
      ease: 'expo.out',
    })
  }, [isLoaded])

  return (
    <Link href={'/pack'}>
      <span
        className={`${s.link} absolute px-0 overflow-hidden text-center cursor-pointer text-10 left-3.5 py-2.5`}
        style={{
          opacity: activeObject ? 0 : 1,
          pointerEvents: activeObject ? 'none' : 'all',
          transition: 'opacity 0.25s ease',
        }}>
        <span
          onClick={() => {
            useStore.setState({ activeObject: false })
            useStore.setState({ introDone: true })
            useStore.setState({ allowPuckFrame: false })
          }}
          className='flex overflow-hidden'>
          <span ref={ref} className='inline-flex'>
            {'← BACK'}
          </span>
        </span>
      </span>
    </Link>
  )
}

export default BackToPack
