export class ChatBubbleManager {
  private element: HTMLDivElement | null = null
  private container: HTMLElement
  private gameContainer: HTMLElement
  private timeoutId?: number

  constructor(containerId: string = 'game-container') {
    const gameContainer = document.getElementById(containerId)

    if (!gameContainer) {
      throw new Error(`Container with id "${containerId}" not found`)
    }
    this.gameContainer = gameContainer
    this.container = document.body
  }

  /**
   * 말풍선을 표시합니다.
   * @param content 말풍선에 표시할 텍스트
   * @param worldX Phaser 월드 X 좌표
   * @param worldY Phaser 월드 Y 좌표
   * @param camera Phaser 카메라 (화면 좌표 변환용)
   */
  show(
    content: string,
    worldX: number,
    worldY: number,
    camera: Phaser.Cameras.Scene2D.Camera,
  ) {
    this.clear()

    const limitedText =
      content.length <= 60 ? content : content.substring(0, 60).concat('...')

    const bubble = document.createElement('div')
    bubble.className = 'chat-bubble'
    bubble.style.cssText = `
      position: fixed;
      background: white;
      border: 1.5px solid black;
      border-radius: 5px;
      padding: 2px 4px;
      font-size: 14px;
      color: #000000;
      max-width: 150px;
      word-wrap: break-word;
      white-space: pre-wrap;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -100%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `

    const text = document.createElement('div')
    text.textContent = limitedText
    text.style.cssText = `
      line-height: 1.4;
    `

    bubble.appendChild(text)
    this.container.appendChild(bubble)
    this.element = bubble

    this.updatePosition(worldX, worldY, camera)

    // 5초 후 자동 삭제
    this.timeoutId = window.setTimeout(() => {
      this.clear()
    }, 5000)
  }

  /**
   * 말풍선 위치를 업데이트합니다.
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
      console.error('Error updating chat bubble position:', error)
    }
  }

  // 말품선 제거
  clear() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }

    if (this.element) {
      this.element.remove()
      this.element = null
    }
  }

  // 말풍선이 표시 확인
  isVisible(): boolean {
    return this.element !== null
  }
}
