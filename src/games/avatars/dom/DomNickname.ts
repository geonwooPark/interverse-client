import { DomElement } from './DomElement'

export class DomNickname extends DomElement {
  /**
   * 닉네임을 표시합니다.
   * @param worldX Phaser 월드 X 좌표
   * @param worldY Phaser 월드 Y 좌표
   * @param camera Phaser 카메라 (화면 좌표 변환용)
   * @param nickname 표시할 닉네임
   */
  show(
    worldX: number,
    worldY: number,
    camera: Phaser.Cameras.Scene2D.Camera,
    nickname: string,
  ) {
    // 이미 표시 중이면 업데이트만
    if (this.element) {
      this.updateText(nickname)
      super.updatePosition(worldX, worldY, camera, false)
      return
    }

    // 닉네임 DOM 요소 생성
    const nicknameElement = document.createElement('div')
    nicknameElement.className = 'game-nickname'
    nicknameElement.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.6);
      color: #ffffff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      pointer-events: none;
      z-index: 10001;
      will-change: transform;
      white-space: nowrap;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    `

    nicknameElement.textContent = nickname
    this.container.appendChild(nicknameElement)
    this.element = nicknameElement

    // 초기 위치 설정
    super.updatePosition(worldX, worldY, camera, true)
  }

  /**
   * 닉네임 텍스트를 업데이트합니다.
   */
  updateText(nickname: string) {
    if (this.element) {
      this.element.textContent = nickname
    }
  }
}
