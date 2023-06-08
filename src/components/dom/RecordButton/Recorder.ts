export default class Recorder {
  private frameRate: number
  private mimeType: string
  private chunks: BlobPart[]
  private link: HTMLAnchorElement
  private mediaRecorder: MediaRecorder
  private audioElements: HTMLCollectionOf<HTMLAudioElement>
  private onDataAvailable: (event: BlobEvent) => void
  private onStop: () => Promise<void>

  constructor(
    opts = {
      frameRate: 60,
      mimeType: 'video/webm; codecs=vp9', //video/x-matroska;codecs=avc1
      convert: false,
    },
  ) {
    const { frameRate, mimeType } = opts

    this.frameRate = frameRate

    this.mimeType = mimeType

    this.chunks = []
  }

  start(area: HTMLCanvasElement) {
    this.chunks = []

    const stream = area.captureStream(30)

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
      mimeType: this.mimeType,
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
  }

  stop() {
    this.mediaRecorder.stop()

    for (let i = 0; i < this.audioElements.length; ++i) {
      this.audioElements[i].pause()
    }

    this.dispose()
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