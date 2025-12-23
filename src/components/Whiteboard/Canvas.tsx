import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useScene } from '@providers/SceneProvider'
import { IWhiteboardDraw } from '@managers/WhiteboardManager'
import { useTranslation } from 'react-i18next'
import Select from '@components/Select'
import Button from '@components/Button'

interface CanvasProps {
  isOpen: boolean
}

export default function Canvas({ isOpen }: CanvasProps) {
  const { t } = useTranslation()

  const gameScene = useScene()

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const whiteboardManager = gameScene.whiteboard

  const canvasManager = whiteboardManager?.getCanvasManager()

  const state = useSyncExternalStore(
    (callback) => canvasManager?.subscribe(() => callback()) ?? (() => {}),
    () => canvasManager?.getState(),
  )

  const color = state.color

  const lineWidth = String(state.lineWidth)

  const options = state.options

  // Canvas 설정
  useEffect(() => {
    if (canvasRef.current && canvasManager) {
      canvasManager.setCanvas(canvasRef.current)
    }
  }, [canvasManager])

  // Manager와 상태 동기화
  const handleColorChange = (color: string) => {
    canvasManager?.setColor(color)
  }

  const handleLineWidthChange = (lineWidth: string) => {
    canvasManager?.setLineWidth(Number(lineWidth))
  }

  const handleClear = () => {
    canvasManager?.clear()
  }

  useEffect(() => {
    if (!canvasManager) return

    const handleDraw = (draw: IWhiteboardDraw) => {
      canvasManager.drawOnCanvas(draw)
    }

    const handleClear = () => {
      canvasManager.clearCanvas()
    }

    gameScene.events.on('whiteboardDraw', handleDraw)
    gameScene.events.on('whiteboardClear', handleClear)

    return () => {
      gameScene.events.off('whiteboardDraw', handleDraw)
      gameScene.events.off('whiteboardClear', handleClear)
    }
  }, [gameScene, canvasManager])

  useEffect(() => {
    if (!isOpen || !canvasRef.current || !canvasManager) return

    canvasManager.setCanvas(canvasRef.current)
    canvasManager.resizeCanvas()

    const handleResize = () => {
      canvasManager.resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, canvasManager])

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3 rounded bg-gray-100 p-3">
        <div className="flex items-center gap-2">
          <span className="text-body2 text-gray-700">
            {t('game.items.whiteboard_color')}
          </span>
          <Select value={color} onChange={handleColorChange}>
            {options.colors.map((c) => (
              <Select.Item key={c.value} value={c.value} label={c.label}>
                <div className="flex items-center gap-2">
                  <div
                    className="size-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: c.value }}
                  />
                  {c.label}
                </div>
              </Select.Item>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-body2 text-gray-700">
            {t('game.items.whiteboard_line_width')}
          </span>
          <Select value={lineWidth} onChange={handleLineWidthChange}>
            {options.sizes.map((size) => (
              <Select.Item
                key={size.value}
                value={size.value}
                label={size.label}
              />
            ))}
          </Select>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleClear}
          className="ml-auto"
        >
          {t('game.items.whiteboard_clear')}
        </Button>
      </div>

      <canvas
        ref={canvasRef}
        className="cursor-crosshair touch-none rounded border-2 border-gray-300"
        onMouseDown={(e) => canvasManager?.startDrawing(e)}
        onMouseMove={(e) => canvasManager?.draw(e)}
        onMouseUp={() => canvasManager?.stopDrawing()}
        onMouseLeave={() => canvasManager?.stopDrawing()}
        onTouchStart={(e) => canvasManager?.startDrawing(e)}
        onTouchMove={(e) => canvasManager?.draw(e)}
        onTouchEnd={() => canvasManager?.stopDrawing()}
      />
    </div>
  )
}
