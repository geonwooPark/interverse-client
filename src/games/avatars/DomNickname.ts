export class DomNickname {
  private element: HTMLDivElement | null = null
  private container: HTMLElement
  private gameContainer: HTMLElement

  constructor(containerId: string = 'game-container') {
    const gameContainer = document.getElementById(containerId)

    if (!gameContainer) {
      throw new Error(`Container with id "${containerId}" not found`)
    }
    this.gameContainer = gameContainer
    this.container = document.body
  }

  /**
   * 닉네임을 표시합니다.
   * @param nickname 표시할 닉네임
   * @param worldX Phaser 월드 X 좌표
   * @param worldY Phaser 월드 Y 좌표
   * @param camera Phaser 카메라 (화면 좌표 변환용)
   */
  show(
    nickname: string,
    worldX: number,
    worldY: number,
    camera: Phaser.Cameras.Scene2D.Camera,
  ) {
    // 이미 표시 중이면 업데이트만
    if (this.element) {
      this.updateText(nickname)
      this.updatePosition(worldX, worldY, camera)
      return
    }

    // 닉네임 DOM 요소 생성
    const nicknameElement = document.createElement('div')
    nicknameElement.className = 'game-nickname'
    nicknameElement.style.cssText = `
      position: fixed;
      background: rgba(0, 0, 0, 0.6);
      color: #ffffff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      pointer-events: none;
      z-index: -1;
      transform: translate(-50%, -100%);
      white-space: nowrap;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    `

    nicknameElement.textContent = nickname
    this.container.appendChild(nicknameElement)
    this.element = nicknameElement

    // 초기 위치 설정
    this.updatePosition(worldX, worldY, camera)
  }

  /**
   * 닉네임 텍스트를 업데이트합니다.
   */
  updateText(nickname: string) {
    if (this.element) {
      this.element.textContent = nickname
    }
  }

  /**
   * 닉네임 위치를 업데이트합니다.
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
      console.error('Error updating nickname position:', error)
    }
  }

  /**
   * 닉네임을 제거합니다.
   */
  clear() {
    if (this.element) {
      this.element.remove()
      this.element = null
    }
  }

  /**
   * 닉네임이 표시 중인지 확인합니다.
   */
  isVisible(): boolean {
    return this.element !== null
  }
}
