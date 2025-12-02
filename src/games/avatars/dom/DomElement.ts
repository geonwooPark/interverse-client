export abstract class DomElement {
  protected element: HTMLDivElement | null = null
  protected container: HTMLElement
  protected gameContainer: HTMLElement

  constructor(containerId: string = 'game-container') {
    const gameContainer = document.getElementById(containerId)

    if (!gameContainer) {
      throw new Error(`Container with id "${containerId}" not found`)
    }
    this.gameContainer = gameContainer
    this.container = document.body
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
   */
  updatePosition(
    worldX: number,
    worldY: number,
    camera: Phaser.Cameras.Scene2D.Camera,
  ) {
    if (!this.element) return

    try {
      const zoom = camera.zoom
      const gameContainerRect = this.gameContainer.getBoundingClientRect()
      const worldView = camera.worldView

      // 월드 좌표를 화면 좌표로 변환
      const relativeX = worldX - worldView.x
      const relativeY = worldY - worldView.y

      // 줌을 적용하여 화면 좌표 계산
      const screenX = relativeX * zoom
      const screenY = relativeY * zoom

      // 게임 컨테이너의 위치를 기준으로 계산
      const absoluteX = gameContainerRect.left + screenX
      const absoluteY = gameContainerRect.top + screenY

      this.element.style.left = `${absoluteX}px`
      this.element.style.top = `${absoluteY}px`
    } catch (error) {
      console.error('Error updating DOM element position:', error)
    }
  }

  // DOM 요소 제거
  clear() {
    if (this.element) {
      this.element.remove()
      this.element = null
    }
  }

  // DOM 요소가 표시 확인
  isVisible(): boolean {
    return this.element !== null
  }
}
