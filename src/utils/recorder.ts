import React from 'react'

function pad(number: number) {
  return number.toString().padStart(2, '0')
}

export class Recorder {
  private frameRate: number

  private mimeType: string

  public chunks: BlobPart[]

  private link: HTMLAnchorElement

  private mediaRecorder: MediaRecorder

  private audioElements: HTMLCollectionOf<HTMLAudioElement>

  private onDataAvailable: (event: BlobEvent) => void

  private onStop: () => Promise<void>

  private intervalId: number

  private startTime: number

  private elapsedTime: number

  private timestampRef: React.MutableRefObject<HTMLDivElement>

  constructor(
    opts = {
      frameRate: 30,
      mimeType: 'video/webm; codecs=vp9', // video/x-matroska;codecs=avc1
      convert: false,
    },
    timestampRef,
  ) {
    this.timestampRef = timestampRef

    const { frameRate, mimeType } = opts

    this.frameRate = frameRate

    this.mimeType = mimeType

    this.chunks = []

    this.startTime = 0
    this.elapsedTime = 0
  }

  start(area: HTMLCanvasElement) {
    this.chunks = []

    const stream = area.captureStream(this.frameRate)

    const audioElements = document.getElementsByTagName('audio')
    for (let i = 0; i < audioElements.length; ++i) {
      audioElements[i].play()
      const audioStream = (audioElements[i] as any).captureStream()
      if (audioStream) {
        const audioTrack = audioStream.getAudioTracks()[0]
        if (audioTrack) {
          stream.addTrack(audioTrack)
        }
      }
    }
    this.audioElements = audioElements

    this.mediaRecorder = new MediaRecorder(stream, {
      audioBitsPerSecond: 128000, // 128 Kbit/sec
      videoBitsPerSecond: 2500000, // 2.5 Mbit/sec
    })

    this.onDataAvailable = (event) => {
      event.data.size && this.chunks.push(event.data)
    }

    this.onStop = async () => {
      const blob = new Blob(this.chunks, { type: this.mimeType })
      this.downloadBlob(URL.createObjectURL(blob), 'scene.webm')
    }

    this.mediaRecorder.addEventListener('dataavailable', this.onDataAvailable.bind(this))

    this.mediaRecorder.addEventListener('stop', this.onStop.bind(this))

    this.mediaRecorder.start()

    this.startTimer()
  }

  stop() {
    this.mediaRecorder.stop()

    clearInterval(this.intervalId)

    for (let i = 0; i < this.audioElements.length; ++i) {
      this.audioElements[i].pause()
    }

    if (this.timestampRef) {
      this.timestampRef.current.innerHTML = '00:00'
    }

    this.dispose()
  }

  pause() {
    this.mediaRecorder.pause()
    this.pauseTimer()
  }

  resume() {
    this.mediaRecorder.resume()
    this.resumeTimer()
  }

  startTimer() {
    this.elapsedTime = 0
    this.startTime = Date.now()
    this.intervalId = window.setInterval(this.updateTimer.bind(this), 1000)
  }

  updateTimer() {
    // Calculate the elapsed time
    const currentTime = Date.now()
    const totalTime = this.elapsedTime + (currentTime - this.startTime)

    // Convert elapsed time to hours, minutes, and seconds
    const minutes = Math.floor((totalTime % 3600000) / 60000)
    const seconds = Math.floor((totalTime % 60000) / 1000)

    // Format the time as HH:MM:SS
    const formattedTime = `${pad(minutes)}:${pad(seconds)}`

    // Update the timer element
    if (this.timestampRef) {
      this.timestampRef.current.innerHTML = formattedTime
    }
  }

  pauseTimer() {
    clearInterval(this.intervalId)
    // Update the elapsed time
    this.elapsedTime += Date.now() - this.startTime
  }

  // Resume the timer
  resumeTimer() {
    // Store the start time
    this.startTime = Date.now()
    // Update the timer every second
    this.intervalId = window.setInterval(this.updateTimer.bind(this), 1000)
  }

  dispose() {
    this.mediaRecorder.removeEventListener('dataavailable', this.onDataAvailable)
    this.mediaRecorder.removeEventListener('stop', this.onStop)
    this.mediaRecorder = null
  }

  downloadBlob(url: string, filename: string) {
    this.link = document.createElement('a')
    this.link.download = filename

    this.link.href = url

    const event = new MouseEvent('click')
    this.link.dispatchEvent(event)

    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1)
  }
}
