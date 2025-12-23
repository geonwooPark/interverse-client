import GameScene from '@games/scenes/Game'
import { CanvasManager } from '@components/Whiteboard/CanvasManager'

export interface IWhiteboardDraw {
  x: number
  y: number
  prevX: number
  prevY: number
  color: string
  lineWidth: number
  type: 'draw' | 'clear'
}

export interface IWhiteboardAction {
  roomNum: string
  draw: IWhiteboardDraw
}

export class WhiteboardManager {
  private game: GameScene
  private canvasManager = new CanvasManager(null)

  constructor(game: GameScene) {
    this.game = game
    this.initialize()
  }

  private initialize() {
    // 서버에서 그리기 데이터 받기
    this.game.socketManager.socket.on(
      'serverWhiteboardDraw',
      (draw: IWhiteboardDraw) => {
        this.game.events.emit('whiteboardDraw', draw)
      },
    )

    // 서버에서 화이트보드 클리어 받기
    this.game.socketManager.socket.on('serverWhiteboardClear', () => {
      this.game.events.emit('whiteboardClear')
    })
  }

  // 그리기 데이터 전송
  sendDraw(draw: IWhiteboardDraw) {
    this.game.socketManager.socket.emit('clientWhiteboardDraw', {
      roomNum: this.game.roomNum,
      draw,
    })
  }

  // 화이트보드 클리어 전송
  sendClear() {
    this.game.socketManager.socket.emit('clientWhiteboardClear', {
      roomNum: this.game.roomNum,
    })
  }

  // CanvasManager 가져오기
  getCanvasManager(): CanvasManager {
    return this.canvasManager
  }

  // 리소스 정리
  cleanup() {
    this.game.socketManager.socket.off('serverWhiteboardDraw')
    this.game.socketManager.socket.off('serverWhiteboardClear')
    this.canvasManager.cleanup()
  }
}
