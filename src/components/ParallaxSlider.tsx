import { cn } from '@utils/cn'
import React, {
  useRef,
  useState,
  useEffect,
  Children,
  cloneElement,
  PropsWithChildren,
  PointerEvent,
  TouchEvent,
} from 'react'

interface ParallaxSliderProps {
  className?: string
}

export default function ParallaxSlider({
  children,
  className,
}: PropsWithChildren<ParallaxSliderProps>) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slides = Children.toArray(children).filter(React.isValidElement)

  const [current, setCurrent] = useState(0)

  const [dragging, setDragging] = useState(false)

  const [startX, setStartX] = useState(0)

  const [startY, setStartY] = useState(0)

  const [dragX, setDragX] = useState(0)

  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)

  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const [clipPercent, setClipPercent] = useState<number>(100)

  const nextIndex = (current + 1) % slides.length

  const prevIndex = (current - 1 + slides.length) % slides.length

  const overlayImage =
    direction === 'next'
      ? slides[nextIndex]
      : direction === 'prev'
        ? slides[prevIndex]
        : null

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isAnimating) return
    e.preventDefault()

    const clientX = e.clientX
    const clientY = e.clientY

    setDragging(true)
    setStartX(clientX)
    setStartY(clientY)
    setDragX(0)
    setDirection(null)
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging || isAnimating || e.pointerType === 'touch') return

    const x = e.clientX
    const diff = x - startX
    const containerWidth =
      containerRef.current?.offsetWidth || window.innerWidth
    const dir = diff > 0 ? 'next' : diff < 0 ? 'prev' : null

    setDragX(diff)
    setDirection(dir)
    setClipPercent(Math.min(100, (Math.abs(diff) / containerWidth) * 100))
  }

  const handleMouseUp = () => {
    const containerWidth =
      containerRef.current?.offsetWidth || window.innerWidth
    const threshold = containerWidth / 4
    const shouldSlide = direction && Math.abs(dragX) > threshold

    if (shouldSlide) {
      setIsAnimating(true)
      setClipPercent(0)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setClipPercent(100)
        })
      })
    } else if (direction) {
      setIsAnimating(true)
      setClipPercent(clipPercent)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setClipPercent(0)
        })
      })
    }
    setDragging(false)
  }

  const handleTransitionEnd = () => {
    if (!isAnimating) return

    if (clipPercent === 100 && direction) {
      setCurrent((prev) =>
        direction === 'next'
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length,
      )
    }

    setIsAnimating(false)
    setDragging(false)
    setDirection(null)
    setClipPercent(0)
    setDragX(0)
  }

  const startAutoSlide = () => {
    if (dragging || isAnimating) return

    setDirection('next')
    setIsAnimating(true)
    setClipPercent(0)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setClipPercent(100)
      })
    })
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging || isAnimating) return

      const touch = e.touches[0]
      const diffX = touch.clientX - startX
      const diffY = touch.clientY - startY

      if (Math.abs(diffY) > Math.abs(diffX)) return
      e.preventDefault()

      const containerWidth = el.offsetWidth || window.innerWidth
      const dir = diffX > 0 ? 'next' : diffX < 0 ? 'prev' : null

      setDragX(diffX)
      setDirection(dir)
      setClipPercent(Math.min(100, (Math.abs(diffX) / containerWidth) * 100))
    }

    el.addEventListener('touchmove', handleTouchMove as any, { passive: false })
    return () => {
      el.removeEventListener('touchmove', handleTouchMove as any)
    }
  }, [dragging, isAnimating, startX, startY])

  useEffect(() => {
    autoPlayRef.current = setInterval(startAutoSlide, 4000)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [current, dragging, isAnimating])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing',
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handleMouseUp}
      onPointerCancel={handleMouseUp}
      onPointerLeave={handleMouseUp}
    >
      <div className="relative size-full">
        {cloneElement(slides[current] as React.ReactElement<any>, {
          draggable: false,
        })}
      </div>

      {overlayImage && (
        <div className="pointer-events-none absolute inset-0 z-20">
          <div
            className="pointer-events-none absolute left-0 top-0 size-full"
            style={{
              clipPath:
                direction === 'next'
                  ? `inset(0 ${Math.max(0.1, 100 - clipPercent)}% 0 0)`
                  : `inset(0 0 0 ${Math.max(0.1, 100 - clipPercent)}%)`,
              transition: isAnimating ? 'clip-path 0.6s ease' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {cloneElement(
              overlayImage as React.ReactElement<{ draggable?: boolean }>,
              {
                draggable: false,
              },
            )}
          </div>
        </div>
      )}
    </div>
  )
}
