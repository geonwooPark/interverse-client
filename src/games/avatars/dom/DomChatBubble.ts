import { DomElement } from './DomElement'

export class DomChatBubble extends DomElement {
  private timeoutId?: number

  /**
   * 말풍선을 표시합니다.
   * @param worldX Phaser 월드 X 좌표
   * @param worldY Phaser 월드 Y 좌표
   * @param camera Phaser 카메라 (화면 좌표 변환용)
   * @param content 말풍선에 표시할 텍스트
   */
  show(
    worldX: number,
    worldY: number,
    camera: Phaser.Cameras.Scene2D.Camera,
    content: string,
  ) {
    this.clear()

    const limitedText =
      content.length <= 60 ? content : content.substring(0, 60).concat('...')

    const bubble = document.createElement('div')
    bubble.className = 'chat-bubble'
    bubble.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
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
      will-change: transform;
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

    super.updatePosition(worldX, worldY, camera, true)

    // 5초 후 자동 삭제
    this.timeoutId = window.setTimeout(() => {
      this.clear()
    }, 5000)
  }

  // 말풍선 제거
  clear() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }

    super.clear()
  }
}
