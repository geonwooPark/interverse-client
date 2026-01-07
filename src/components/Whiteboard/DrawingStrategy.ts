import { IWhiteboardDraw } from '@managers/WhiteboardManager'

export interface IDrawingStrategy {
  configureContext(
    ctx: CanvasRenderingContext2D,
    color: string,
    lineWidth: number,
  ): void
  getDrawData(
    x: number,
    y: number,
    prevX: number,
    prevY: number,
    color: string,
    lineWidth: number,
  ): IWhiteboardDraw
  getEffectiveLineWidth(lineWidth: number): number
  canHandle(draw: IWhiteboardDraw): boolean
  drawOnCanvas(ctx: CanvasRenderingContext2D, draw: IWhiteboardDraw): void
  supportsColor(): boolean
  supportsLineWidth(): boolean
  getColor(): string | null
  getLineWidth(): number | null
  setColor?(color: string): void
  setLineWidth?(lineWidth: number): void
}

export class PenStrategy implements IDrawingStrategy {
  private color: string = '#000000'
  private lineWidth: number = 5

  configureContext(
    ctx: CanvasRenderingContext2D,
    color: string,
    lineWidth: number,
  ): void {
    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  getDrawData(
    x: number,
    y: number,
    prevX: number,
    prevY: number,
    color: string,
    lineWidth: number,
  ): IWhiteboardDraw {
    return {
      x,
      y,
      prevX,
      prevY,
      color,
      lineWidth,
      type: 'draw',
    }
  }

  getEffectiveLineWidth(lineWidth: number): number {
    return lineWidth
  }

  canHandle(draw: IWhiteboardDraw): boolean {
    return draw.color !== 'transparent'
  }

  drawOnCanvas(ctx: CanvasRenderingContext2D, draw: IWhiteboardDraw): void {
    this.configureContext(ctx, draw.color, draw.lineWidth)
    ctx.beginPath()
    ctx.moveTo(draw.prevX, draw.prevY)
    ctx.lineTo(draw.x, draw.y)
    ctx.stroke()
  }

  supportsColor(): boolean {
    return true
  }

  supportsLineWidth(): boolean {
    return true
  }

  getColor(): string | null {
    return this.color
  }

  getLineWidth(): number | null {
    return this.lineWidth
  }

  setColor(color: string): void {
    this.color = color
  }

  setLineWidth(lineWidth: number): void {
    this.lineWidth = lineWidth
  }
}

export class EraserStrategy implements IDrawingStrategy {
  private readonly ERASER_SIZE = 20

  configureContext(
    ctx: CanvasRenderingContext2D,
    _color: string,
    _lineWidth: number,
  ): void {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth = this.ERASER_SIZE
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  getDrawData(
    x: number,
    y: number,
    prevX: number,
    prevY: number,
    _color: string,
    _lineWidth: number,
  ): IWhiteboardDraw {
    return {
      x,
      y,
      prevX,
      prevY,
      color: 'transparent',
      lineWidth: this.ERASER_SIZE,
      type: 'draw',
    }
  }

  getEffectiveLineWidth(_lineWidth: number): number {
    return this.ERASER_SIZE
  }

  canHandle(draw: IWhiteboardDraw): boolean {
    return draw.color === 'transparent'
  }

  drawOnCanvas(ctx: CanvasRenderingContext2D, draw: IWhiteboardDraw): void {
    this.configureContext(ctx, draw.color, draw.lineWidth)
    ctx.beginPath()
    ctx.moveTo(draw.prevX, draw.prevY)
    ctx.lineTo(draw.x, draw.y)
    ctx.stroke()
  }

  supportsColor(): boolean {
    return false
  }

  supportsLineWidth(): boolean {
    return false
  }

  getColor(): string | null {
    return null
  }

  getLineWidth(): number | null {
    return null
  }
}
