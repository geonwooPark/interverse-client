import { IWhiteboardDraw } from '@managers/WhiteboardManager'
import { Observable } from '@utils/observables/Observable'
import {
  CanvasOptions,
  CanvasOptionsInput,
  ColorOption,
  SizeOption,
} from './CanvasOptions'
import {
  IDrawingStrategy,
  PenStrategy,
  EraserStrategy,
} from './DrawingStrategy'

export type DrawingTool = 'pen' | 'eraser'

interface WhiteboardState {
  tool: DrawingTool
  options: { colors: ColorOption[]; sizes: SizeOption[] }
  // 전략에서 가져온 설정 (펜 전략의 경우에만 값이 있음)
  color: string | null
  lineWidth: number | null
  // 전략이 지원하는 기능
  supportsColor: boolean
  supportsLineWidth: boolean
}

export class CanvasManager extends Observable<WhiteboardState> {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private isDrawing = false
  private lastPos = { x: 0, y: 0 }
  private state: WhiteboardState
  private canvasOptions: CanvasOptions
  private strategies: Map<DrawingTool, IDrawingStrategy>
  private currentStrategy: IDrawingStrategy

  constructor(canvas: HTMLCanvasElement | null, options?: CanvasOptionsInput) {
    super()
    this.canvas = canvas
    if (canvas) {
      this.ctx = canvas.getContext('2d')
    }
    this.canvasOptions = new CanvasOptions(options)
    const penStrategy = new PenStrategy()
    const eraserStrategy = new EraserStrategy()

    this.strategies = new Map<DrawingTool, IDrawingStrategy>([
      ['pen', penStrategy],
      ['eraser', eraserStrategy],
    ])
    this.currentStrategy = penStrategy
    this.state = {
      tool: 'pen',
      options: this.canvasOptions.getState(),
      color: penStrategy.getColor(),
      lineWidth: penStrategy.getLineWidth(),
      supportsColor: penStrategy.supportsColor(),
      supportsLineWidth: penStrategy.supportsLineWidth(),
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
    if (!this.currentStrategy.supportsColor() || !this.currentStrategy.setColor)
      return

    this.currentStrategy.setColor(color)
    this.state = {
      ...this.state,
      color: this.currentStrategy.getColor(),
    }
    this.notify(this.state)
  }

  setLineWidth(lineWidth: number) {
    if (
      !this.currentStrategy.supportsLineWidth() ||
      !this.currentStrategy.setLineWidth
    )
      return
    this.currentStrategy.setLineWidth(lineWidth)
    this.state = {
      ...this.state,
      lineWidth: this.currentStrategy.getLineWidth(),
    }
    this.notify(this.state)
  }

  setTool(tool: DrawingTool) {
    const strategy = this.strategies.get(tool)
    if (strategy) {
      this.currentStrategy = strategy
      this.state = {
        ...this.state,
        tool,
        color: strategy.getColor(),
        lineWidth: strategy.getLineWidth(),
        supportsColor: strategy.supportsColor(),
        supportsLineWidth: strategy.supportsLineWidth(),
      }
      this.notify(this.state)
    }
  }

  getState(): WhiteboardState {
    return this.state
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

    // 적절한 전략 찾기
    const strategy = Array.from(this.strategies.values()).find((s) =>
      s.canHandle(draw),
    )

    if (strategy) {
      strategy.drawOnCanvas(this.ctx, draw)
    }
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
  ): IWhiteboardDraw | null {
    if (!this.isDrawing || !this.canvas || !this.ctx) return null
    e.preventDefault()

    const pos = this.getMousePos(e)

    // 현재 전략에 따라 컨텍스트 설정
    const strategyColor = this.currentStrategy.getColor() ?? '#000000'
    const strategyLineWidth = this.currentStrategy.getLineWidth() ?? 5
    const effectiveLineWidth =
      this.currentStrategy.getEffectiveLineWidth(strategyLineWidth)
    this.currentStrategy.configureContext(
      this.ctx,
      strategyColor,
      effectiveLineWidth,
    )

    this.ctx.beginPath()
    this.ctx.moveTo(this.lastPos.x, this.lastPos.y)
    this.ctx.lineTo(pos.x, pos.y)
    this.ctx.stroke()

    // 전략에 따라 그리기 데이터 생성
    const drawData = this.currentStrategy.getDrawData(
      pos.x,
      pos.y,
      this.lastPos.x,
      this.lastPos.y,
      strategyColor,
      effectiveLineWidth,
    )

    this.lastPos = pos

    return drawData
  }

  stopDrawing() {
    this.isDrawing = false
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
  }
}
