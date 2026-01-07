import React from 'react'
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

    // 서버에서 저장된 화이트보드 데이터 받기
    this.game.socketManager.socket.on(
      'serverWhiteboardData',
      (draws: IWhiteboardDraw[]) => {
        this.game.events.emit('whiteboardData', draws)
      },
    )
  }

  // 그리기 데이터 전송
  sendDraw(draw: IWhiteboardDraw) {
    this.game.socketManager.socket.emit('clientWhiteboardDraw', {
      roomNum: this.game.roomNum,
      draw,
    })
  }

  // CanvasManager 가져오기
  getCanvasManager(): CanvasManager {
    return this.canvasManager
  }

  // 그리기 처리 (CanvasManager의 draw를 감싸서 소켓 통신 처리)
  handleDraw(
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) {
    const drawData = this.canvasManager.draw(e)
    if (drawData) {
      this.sendDraw(drawData)
    }
  }

  // 저장된 화이트보드 데이터 요청
  requestWhiteboardData() {
    this.game.socketManager.socket.emit('clientRequestWhiteboardData', {
      roomNum: this.game.roomNum,
    })
  }

  // 리소스 정리
  cleanup() {
    this.game.socketManager.socket.off('serverWhiteboardDraw')
    this.game.socketManager.socket.off('serverWhiteboardData')
    this.canvasManager.cleanup()
  }
}
