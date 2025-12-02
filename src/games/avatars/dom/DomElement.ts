export abstract class DomElement {
  protected element: HTMLDivElement | null = null
  protected container: HTMLElement
  private lastWorldX: number = -Infinity
  private lastWorldY: number = -Infinity
  private lastScreenX: number = -Infinity
  private lastScreenY: number = -Infinity
  private rafId: number | null = null

  constructor(containerId: string = 'game-container') {
    const container = document.getElementById(containerId)

    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`)
    }
    this.container = container
  }

  /**
   * DOM 요소를 표시합니다.
   * @param worldX Phaser 월드 X 좌표
   * @param worldY Phaser 월드 Y 좌표
   * @param camera Phaser 카메라 (화면 좌표 변환용)
   * @param args 추가 인자들
   */
  abstract show(
    worldX: number,
    worldY: number,
    camera: Phaser.Cameras.Scene2D.Camera,
    ...args: unknown[]
  ): void

  /**
   * 위치를 업데이트합니다.
   * @param worldX Phaser 월드 X 좌표
   * @param worldY Phaser 월드 Y 좌표
   * @param camera Phaser 카메라
   * @param force 강제 업데이트 여부 (show 메서드에서 사용)
   */
  updatePosition(
    worldX: number,
    worldY: number,
    camera: Phaser.Cameras.Scene2D.Camera,
    force: boolean = false,
  ) {
    if (!this.element) return

    try {
      const zoom = camera.zoom
      const worldView = camera.worldView

      // 월드 좌표를 화면 좌표로 변환
      const screenX = (worldX - worldView.x) * zoom
      const screenY = (worldY - worldView.y) * zoom

      // 월드 좌표가 실제로 변경되었는지 확인
      // force가 true이거나 초기 위치 설정 시에는 항상 업데이트
      if (!force) {
        const worldThreshold = 0.1
        const worldDeltaX = Math.abs(worldX - this.lastWorldX)
        const worldDeltaY = Math.abs(worldY - this.lastWorldY)

        // 월드 좌표가 변하지 않았고, 화면 좌표도 거의 변하지 않았으면 스킵
        if (
          worldDeltaX < worldThreshold &&
          worldDeltaY < worldThreshold
        ) {
          const screenThreshold = 1
          const screenDeltaX = Math.abs(screenX - this.lastScreenX)
          const screenDeltaY = Math.abs(screenY - this.lastScreenY)

          if (screenDeltaX < screenThreshold && screenDeltaY < screenThreshold) {
            return // 위치가 거의 변경되지 않았으면 업데이트 스킵
          }
        }
      }

      this.lastWorldX = worldX
      this.lastWorldY = worldY
      this.lastScreenX = screenX
      this.lastScreenY = screenY

      // requestAnimationFrame으로 배치 처리
      if (this.rafId === null) {
        this.rafId = requestAnimationFrame(() => {
          if (this.element) {
            this.element.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -100%)`
          }
          this.rafId = null
        })
      }
    } catch (error) {
      console.error('Error updating DOM element position:', error)
    }
  }

  // DOM 요소 제거
  clear() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }

    if (this.element) {
      this.element.remove()
      this.element = null
    }

    this.lastWorldX = -Infinity
    this.lastWorldY = -Infinity
    this.lastScreenX = -Infinity
    this.lastScreenY = -Infinity
  }

  // DOM 요소가 표시 확인
  isVisible(): boolean {
    return this.element !== null
  }
}
