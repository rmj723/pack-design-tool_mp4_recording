import { FC, useEffect, useRef } from 'react'
import Image from 'next/image'
import useStore from '@/lib/store'
import s from './Video.module.scss'

interface Props {
  src: Array<string>
  className?: string
  playing: boolean
  onEnded?: () => void
  onPlay?: () => void
  onTimeUpdate?: (e: any) => void
  poster?: string
}

const Video: FC<Props> = ({ src, className, playing, onEnded, onPlay, onTimeUpdate, poster }) => {
  const ref = useRef<HTMLVideoElement | null>(null)
  const { recorder } = useStore()

  useEffect(() => {
    console.log('ttt recorder', recorder)
  }, [recorder])

  useEffect(() => {
    if (!ref.current) {
      return
    }
    if (playing) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }, [playing])

  return (
    <div className={`${s.videoContainer} ${className || ''}`}>
      <video
        controls
        ref={ref}
        onEnded={onEnded}
        onPlay={onPlay}
        onTimeUpdate={onTimeUpdate}
        playsInline
        muted={false}
        autoPlay={playing}>
        {src.map((file) => (
          <source key={file} src={file} type={`video/${file.includes('webm') ? 'webm' : 'mp4'}`} />
        ))}
      </video>
      {poster && !playing && (
        <div className={s.poster}>
          {/* @ts-ignore */}
          <Image src={poster} alt={''} fill />
        </div>
      )}
    </div>
  )
}

export default Video
