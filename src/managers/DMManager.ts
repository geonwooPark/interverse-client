import Game from '@games/scenes/Game'
import { IDirectMessage } from '@interfaces/index'
import GameScene from '@games/scenes/Game'
import { Observable } from '@utils/observables/Observable'

export class DMManager extends Observable<IDirectMessage[]> {
  private game: GameScene
  private list: (IDirectMessage & { isRead: boolean })[] = []

  constructor(game: Game) {
    super()

    this.game = game

    this.initialize()
  }

  private initialize() {
    // 서버에서 DM 받기
    this.game.socketManager.socket.on('serverDM', (serverChat) => {
      this.receiveDM(serverChat)
    })
  }

  getState() {
    return this.list
  }

  // DM 수신
  receiveDM(dm: IDirectMessage): void {
    this.list = [...this.list, { ...dm, isRead: false }]

    this.notify(this.list)
  }

  // DM 송신
  sendDM(dm: IDirectMessage) {
    this.game.socketManager.socket.emit('clientDM', dm)
  }

  // DM 제거
  removeDM(id: string) {
    this.list = this.list.filter((r) => r.id !== id)

    this.notify(this.list)
  }

  readDM(id: string) {
    this.list = this.list.map((r) => {
      if (r.id === id) {
        return { ...r, isRead: true }
      }
      return r
    })

    this.notify(this.list)
  }

  readAllDM() {
    this.list = this.list.map((r) => ({ ...r, isRead: true }))

    this.notify(this.list)
  }

  // 리소스 정리
  cleanup() {
    // Socket 이벤트 리스너 제거
    this.game.socketManager.socket.off('serverDM')

    // DM 리스트 정리
    this.list = []
  }
}
