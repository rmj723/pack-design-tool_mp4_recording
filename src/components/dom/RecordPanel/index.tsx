import React, { useEffect, useRef, useState } from 'react'
import s from './RecordPanel.module.scss'
import Recorder from './Recorder'
import { PauseRecordingIcon, PlayRecordingIcon, StartRecordingIcon, StopRecordingIcon, TimerDotIcon } from './icons'

interface Props {}

const RecordPanel: React.FC<Props> = ({}) => {
  const timestampRef = useRef<HTMLDivElement>(null!)
  const [recorder] = useState(new Recorder(undefined, timestampRef))

  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)

  const recordHandler = () => {
    if (playing) {
      // stop recording
      setPlaying(false)
      setPaused(false)
      recorder.stop()
    } else {
      // start recording
      const area = document.getElementById('area') as HTMLDivElement
      recorder.start(area.childNodes[0].childNodes[0] as HTMLCanvasElement)
      setPlaying(true)
    }
  }

  const pauseHandler = () => {
    if (!playing) return
    if (paused) {
      // resume recording
      setPaused(false)
      recorder.resume()
    } else {
      // pause recording
      setPaused(true)
      recorder.pause()
    }
  }

  return (
    <div className={s.container}>
      <div>
        {playing ? (
          <StopRecordingIcon onClick={recordHandler} paused={paused} />
        ) : (
          <StartRecordingIcon onClick={recordHandler} />
        )}
      </div>

      <div>
        {paused ? (
          <PlayRecordingIcon onClick={pauseHandler} />
        ) : (
          <PauseRecordingIcon activated={playing} onClick={pauseHandler} className={`${playing ? '' : s.disabled}`} />
        )}
      </div>

      <div className={s.timestamp}>
        <div className={s.dot}>
          <TimerDotIcon activated={playing} paused={paused} />
        </div>

        <div ref={timestampRef} className={s.text}>
          00:00
        </div>
      </div>
    </div>
  )
}
export default RecordPanel
