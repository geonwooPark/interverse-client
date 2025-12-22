import Avatar from './Avatar'

export default class OtherPlayer extends Avatar {
  socketId?: string

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    nickname: string,
    frame?: string | number,
    socketId?: string,
  ) {
    super(scene, x, y, texture, frame)
    this.setNickname(nickname)
    this.socketId = socketId
  }

  updatePosition({
    x,
    y,
    animation,
  }: {
    x: number
    y: number
    animation: string
  }) {
    this.setPosition(x, y)
    this.avatarContainer.setPosition(x, y - 35)
    this.anims.play(animation, true)
  }

  destroy(scene?: boolean) {
    // DOM 닉네임 및 채팅 정리
    this.domNickname.clear()
    this.domChatBubble.clear()
    if (this.avatarContainer) {
      this.avatarContainer.destroy()
    }

    super.destroy(scene)
  }
}
