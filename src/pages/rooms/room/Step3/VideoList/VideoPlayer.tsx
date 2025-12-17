import { useEffect, useRef } from 'react'

interface VideoPlayerProps {
  track: MediaStreamTrack
}

export default function VideoPlayer({ track }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const stream = new MediaStream([track])
    video.srcObject = stream
    video.play().catch((error) => {
      console.error('Error playing video:', error)
    })

    return () => {
      video.srcObject = null
    }
  }, [track])

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={false}
        className="size-full object-cover"
      />
    </div>
  )
}
