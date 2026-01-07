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

  const cursorOverlayRef = useRef<HTMLDivElement>(null)

  const whiteboardManager = gameScene.whiteboard

  const canvasManager = whiteboardManager?.getCanvasManager()

  const state = useSyncExternalStore(
    (callback) => canvasManager?.subscribe(() => callback()) ?? (() => {}),
    () => canvasManager?.getState(),
  )

  const color = state.color ?? '#000000'

  const lineWidth = state.lineWidth ?? 5

  const lineWidthString = String(lineWidth)

  const tool = state.tool

  const isEraser = tool === 'eraser'

  const options = state.options

  const supportsColor = state.supportsColor

  const supportsLineWidth = state.supportsLineWidth

  const cursorSize = isEraser ? 20 : lineWidth

  const handleEraserToggle = () => {
    canvasManager?.setTool(isEraser ? 'pen' : 'eraser')
  }

  // Manager와 상태 동기화
  const handleColorChange = (color: string) => {
    canvasManager?.setColor(color)
  }

  const handleLineWidthChange = (lineWidth: string) => {
    canvasManager?.setLineWidth(Number(lineWidth))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cursorOverlayRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const overlay = cursorOverlayRef.current
    overlay.style.left = `${x}px`
    overlay.style.top = `${y}px`
    overlay.style.visibility = 'visible'
  }

  const handleMouseLeave = () => {
    if (cursorOverlayRef.current) {
      cursorOverlayRef.current.style.visibility = 'hidden'
    }
  }

  // Canvas 설정
  useEffect(() => {
    if (canvasRef.current && canvasManager) {
      canvasManager.setCanvas(canvasRef.current)
    }
  }, [canvasManager])

  useEffect(() => {
    if (!canvasManager) return

    const handleDraw = (draw: IWhiteboardDraw) => {
      canvasManager.drawOnCanvas(draw)
    }

    const handleWhiteboardData = (draws: IWhiteboardDraw[]) => {
      // 저장된 모든 그리기 데이터를 캔버스에 복원
      draws.forEach((draw) => {
        canvasManager.drawOnCanvas(draw)
      })
    }

    gameScene.events.on('whiteboardDraw', handleDraw)
    gameScene.events.on('whiteboardData', handleWhiteboardData)

    return () => {
      gameScene.events.off('whiteboardDraw', handleDraw)
      gameScene.events.off('whiteboardData', handleWhiteboardData)
    }
  }, [gameScene, canvasManager])

  useEffect(() => {
    if (!isOpen || !canvasRef.current || !canvasManager) return

    canvasManager.setCanvas(canvasRef.current)
    canvasManager.resizeCanvas()

    // 화이트보드가 열릴 때 저장된 데이터 요청
    if (whiteboardManager) {
      whiteboardManager.requestWhiteboardData()
    }

    const handleResize = () => {
      canvasManager.resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, canvasManager, whiteboardManager])

  useEffect(() => {
    if (!cursorOverlayRef.current) return

    const overlay = cursorOverlayRef.current
    overlay.style.width = `${cursorSize}px`
    overlay.style.height = `${cursorSize}px`

    if (isEraser) {
      overlay.style.border = '2px solid rgb(156 163 175)'
      overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
    } else {
      overlay.style.border = 'none'
      overlay.style.backgroundColor = `${color}40`
    }
  }, [color, isEraser, cursorSize])

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3 rounded bg-gray-100 p-3">
        {supportsColor && (
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
        )}

        {supportsLineWidth && (
          <div className="flex items-center gap-2">
            <span className="text-body2 text-gray-700">
              {t('game.items.whiteboard_line_width')}
            </span>
            <Select value={lineWidthString} onChange={handleLineWidthChange}>
              {options.sizes.map((size) => (
                <Select.Item
                  key={size.value}
                  value={size.value}
                  label={size.label}
                />
              ))}
            </Select>
          </div>
        )}

        <Button
          size="sm"
          variant={isEraser ? 'contained' : 'ghost'}
          onClick={handleEraserToggle}
          className="ml-auto"
        >
          {t('game.items.whiteboard_eraser')}
        </Button>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="cursor-none touch-none rounded border-2 border-gray-300"
          onMouseDown={(e) => canvasManager?.startDrawing(e)}
          onMouseMove={(e) => {
            handleMouseMove(e)
            whiteboardManager?.handleDraw(e)
          }}
          onMouseUp={() => canvasManager?.stopDrawing()}
          onMouseLeave={() => {
            handleMouseLeave()
            canvasManager?.stopDrawing()
          }}
          onTouchStart={(e) => canvasManager?.startDrawing(e)}
          onTouchMove={(e) => whiteboardManager?.handleDraw(e)}
          onTouchEnd={() => canvasManager?.stopDrawing()}
        />

        {/* 커서 오버레이 */}
        <div
          ref={cursorOverlayRef}
          className="pointer-events-none absolute rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            visibility: 'hidden',
          }}
        />
      </div>
    </div>
  )
}
