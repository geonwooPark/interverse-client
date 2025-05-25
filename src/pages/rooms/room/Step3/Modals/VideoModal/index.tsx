import { useSyncExternalStore } from 'react'
import VideoPlayer from './VideoPlayer'
import GameScene from '@games/scenes/Game'
import GameManager from '@managers/GameManager'
interface VideoModalProps {
  hasDim?: boolean
}

function VideoModal({ hasDim }: VideoModalProps) {
  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  const VideoManager = gameScene.video

  const trackList = useSyncExternalStore(
    (callback) => VideoManager.subscribe(() => callback()),
    () => VideoManager.getState(),
  )

  return (
    <div className="fixed inset-0 z-popover h-screen w-screen">
      {/* Dim */}
      {hasDim && <div className="size-full bg-black/30" />}

      {/* Modal */}
      <div className="absolute left-1/2 top-1/2 size-4/5 w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white p-4">
        <div className="flex h-full">
          {/* 메인 화면 */}
          <div className="mr-4 h-full flex-[3] bg-black"></div>

          {/* 리스트 */}
          <div className="flex flex-[1] flex-col gap-4 overflow-scroll">
            {trackList?.map((track, i) => (
              <VideoPlayer key={i} track={track} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
