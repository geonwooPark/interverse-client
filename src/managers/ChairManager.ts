import GameScene from '@games/scenes/Game'

export class ChairManager {
  private game: GameScene
  list: Set<string> = new Set()

  constructor(game: GameScene) {
    this.game = game

    this.initialize()
  }

  private initialize() {
    // 방에 입장했을 때 이미 누군가 앉아있는 의자들
    this.game.socketManager.socket.on('serverOccupiedChairs', (chairs) => {
      if (!chairs) return

      this.list = new Set([...chairs])
    })

    // 누군가 의자에 앉는다면 아이디 받아서 리스트 업데이트
    this.game.socketManager.socket.on('serverChairId', (chairId: string) => {
      if (this.list.has(chairId)) {
        this.list.delete(chairId)
      } else {
        this.list.add(chairId)
      }
    })
  }

  // 의자에 앉는다면 서버로 아이디 전송
  sendChairId(chairId: string) {
    this.game.socketManager.socket.emit('clientChairId', {
      roomNum: this.game.roomNum,
      chairId,
    })
  }

  // 리소스 정리
  cleanup() {
    // Socket 이벤트 리스너 제거
    this.game.socketManager.socket.off('serverOccupiedChairs')
    this.game.socketManager.socket.off('serverChairId')

    // 의자 리스트 정리
    this.list.clear()
  }
}
