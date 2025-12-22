import { IAvatarPosition } from '@interfaces/index'
import GameScene from '@games/scenes/Game'

export class PlayManager {
  private game: GameScene

  constructor(game: GameScene) {
    this.game = game

    this.initialize()
  }

  private initialize() {
    // 서버로부터 다른 모든 유저들 위치 정보 받기
    this.game.socketManager.socket.on('serverAvatarPosition', (avatarPosition) => {
      this.updateOtherPlayer(avatarPosition)
    })
  }

  /** 다른 플레이어의 위치 정보 업데이트 */
  updateOtherPlayer({ x, y, socketId, animation }: IAvatarPosition) {
    if (!socketId) return

    const otherPlayer = this.game.room.otherPlayerMap.get(socketId)

    if (otherPlayer) {
      otherPlayer.updatePosition({ x, y, animation })
    }
  }

  // 실시간 나의 위치 정보 보내기
  sendAvatarPosition({ x, y, animation, isLast }: IAvatarPosition) {
    this.game.socketManager.socket.emit('clientAvatarPosition', {
      x,
      y,
      roomNum: this.game.roomNum,
      animation,
      isLast,
    })
  }

  // 리소스 정리
  cleanup() {
    // Socket 이벤트 리스너 제거
    this.game.socketManager.socket.off('serverAvatarPosition')
  }
}
