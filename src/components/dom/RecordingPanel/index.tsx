import React, { useEffect, useRef, useState } from 'react'
import {
  PauseRecordingIcon,
  PlayRecordingIcon,
  StartRecordingIcon,
  StopRecordingIcon,
  TimerDotIcon,
} from '@/components/icons/IconsRecording'
import { Recorder } from '@/utils/recorder'
import useStore from '@/lib/store'
import s from './RecordingPanel.module.scss'

const RecordingPanel: React.FC = () => {
  const timestampRef = useRef<HTMLDivElement>(null)
  const [recorder] = useState(new Recorder(undefined, timestampRef))
  const [showTutorial, setShowTutorial] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    useStore.setState({ recorder })
  }, [recorder])

  const recordHandler = () => {
    if (showTutorial) {
      return
    }
    if (playing) {
      // stop recording
      setPlaying(false)
      setPaused(false)
      recorder.stop()
    } else {
      // start recording
      const canvasElems = document.getElementsByTagName('canvas')
      recorder.start(canvasElems[0])
      setPlaying(true)
    }
  }

  const pauseHandler = () => {
    if (!playing) {
      return
    }
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
    <>
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

        {showTutorial && (
          <div className={s.block}>
            <div className={s.description}>
              <div className={s.title}>Start screen recording at any time!</div>
              <div className={s.safari_title}>Start screen recording at any time!</div>
              <div>The recording will automatically save to your computer.</div>
              <div className={s.buttonContainer}>
                <button className={s.button} onClick={() => setShowTutorial(false)}>
                  GOT IT!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showTutorial && <div className={s.background} />}
    </>
  )
}

export default RecordingPanel
