import React, { useEffect, useState } from 'react'
import s from './RecordButton.module.scss'
import Recorder from './IRecorder'

interface Props {}

enum STATUS {
  START = 0,
  STOP = 1,
  PAUSE = 2,
}
const RecordButton: React.FC<Props> = ({}) => {
  const [recorder] = useState(new Recorder(undefined))

  const [recordingStatus, setRecordingStatus] = useState(STATUS.STOP)

  const handle = () => {
    if (recordingStatus === STATUS.STOP) {
      // const area = document.getElementById('area') as HTMLDivElement
      // console.log(area)
      // recorder.start(area.childNodes[0].childNodes[0] as HTMLCanvasElement)
      recorder.start()
      setRecordingStatus(STATUS.START)
    } else {
      recorder.stop()
      setRecordingStatus(STATUS.STOP)
    }
  }
  return (
    <div className={s.container}>
      <button onClick={handle}>{recordingStatus === STATUS.STOP ? 'Play' : 'Stop'}</button>
    </div>
  )
}
export default RecordButton
