import { useSyncExternalStore } from 'react'
import { useScene } from '@providers/SceneProvider'
import VideoPlayer from './VideoPlayer'

export default function VideoList() {
  const gameScene = useScene()

  const tracks = useSyncExternalStore(
    (cb) => gameScene.video.subscribe(cb),
    () => gameScene.video.getState(),
  )

  if (tracks.length === 0) {
    return null
  }

  return (
    <div className="fixed right-6 top-[160px] z-20 w-[280px] space-y-3">
      <div className="rounded-lg bg-white/90 p-3 shadow-lg backdrop-blur-sm">
        <h3 className="mb-3 text-body2 font-semibold text-gray-800">
          비디오 ({tracks.length})
        </h3>

        <div className="space-y-3">
          {tracks.map((track, index) => (
            <VideoPlayer key={`${track.id}-${index}`} track={track} />
          ))}
        </div>
      </div>
    </div>
  )
}
