import { IWhiteboardDraw } from '@managers/WhiteboardManager'
import { Observable } from '@utils/observables/Observable'
import {
  CanvasOptions,
  CanvasOptionsInput,
  ColorOption,
  SizeOption,
} from './CanvasOptions'

interface WhiteboardState {
  color: string
  lineWidth: number
  options: { colors: ColorOption[]; sizes: SizeOption[] }
}

export class CanvasManager extends Observable<WhiteboardState> {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private isDrawing = false
  private lastPos = { x: 0, y: 0 }
  private state: WhiteboardState
  private onDraw?: (draw: IWhiteboardDraw) => void
  private onClear?: () => void
  private canvasOptions: CanvasOptions

  constructor(canvas: HTMLCanvasElement | null, options?: CanvasOptionsInput) {
    super()
    this.canvas = canvas
    if (canvas) {
      this.ctx = canvas.getContext('2d')
    }
    this.canvasOptions = new CanvasOptions(options)
    this.state = {
      color: '#000000',
      lineWidth: 5,
      options: this.canvasOptions.getState(),
    }
    this.notify(this.state)
  }

  setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas
    if (canvas) {
      this.ctx = canvas.getContext('2d')
    }
  }

  setColor(color: string) {
    this.state = { ...this.state, color }
    this.notify(this.state)
  }

  setLineWidth(lineWidth: number) {
    this.state = { ...this.state, lineWidth }
    this.notify(this.state)
  }

  getState(): WhiteboardState {
    return this.state
  }

  setOnDraw(callback: (draw: IWhiteboardDraw) => void) {
    this.onDraw = callback
  }

  setOnClear(callback: () => void) {
    this.onClear = callback
  }

  getMousePos(
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ): { x: number; y: number } {
    if (!this.canvas) return { x: 0, y: 0 }

    const rect = this.canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
    const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  drawOnCanvas(draw: IWhiteboardDraw) {
    if (!this.canvas || !this.ctx) return

    this.ctx.strokeStyle = draw.color
    this.ctx.lineWidth = draw.lineWidth
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'

    this.ctx.beginPath()
    this.ctx.moveTo(draw.prevX, draw.prevY)
    this.ctx.lineTo(draw.x, draw.y)
    this.ctx.stroke()
  }

  startDrawing(
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) {
    e.preventDefault()
    const pos = this.getMousePos(e)
    this.isDrawing = true
    this.lastPos = pos
  }

  draw(
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) {
    if (!this.isDrawing || !this.canvas || !this.ctx) return
    e.preventDefault()

    const pos = this.getMousePos(e)

    this.ctx.strokeStyle = this.state.color
    this.ctx.lineWidth = this.state.lineWidth
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'

    this.ctx.beginPath()
    this.ctx.moveTo(this.lastPos.x, this.lastPos.y)
    this.ctx.lineTo(pos.x, pos.y)
    this.ctx.stroke()

    // 소켓으로 그리기 데이터 전송
    if (this.onDraw) {
      this.onDraw({
        x: pos.x,
        y: pos.y,
        prevX: this.lastPos.x,
        prevY: this.lastPos.y,
        color: this.state.color,
        lineWidth: this.state.lineWidth,
        type: 'draw',
      })
    }

    this.lastPos = pos
  }

  stopDrawing() {
    this.isDrawing = false
  }

  clearCanvas() {
    if (!this.canvas || !this.ctx) return
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  clear() {
    this.clearCanvas()
    if (this.onClear) {
      this.onClear()
    }
  }

  resizeCanvas() {
    if (!this.canvas || !this.ctx) return

    const maxWidth = window.innerWidth * 0.9
    const maxHeight = window.innerHeight * 0.8
    const aspectRatio = 16 / 9

    let displayWidth = maxWidth
    let displayHeight = displayWidth / aspectRatio

    if (displayHeight > maxHeight) {
      displayHeight = maxHeight
      displayWidth = displayHeight * aspectRatio
    }

    // 고해상도 디스플레이 지원
    const dpr = window.devicePixelRatio || 1
    this.canvas.width = displayWidth * dpr
    this.canvas.height = displayHeight * dpr
    this.ctx.scale(dpr, dpr)
    this.canvas.style.width = `${displayWidth}px`
    this.canvas.style.height = `${displayHeight}px`
  }

  cleanup() {
    this.canvas = null
    this.ctx = null
    this.isDrawing = false
    this.lastPos = { x: 0, y: 0 }
    this.onDraw = undefined
    this.onClear = undefined
    this.clear()
  }
}
