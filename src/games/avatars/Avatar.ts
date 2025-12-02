import ObjectItem from '../items/ObjectItem'
import { DomNickname } from './DomNickname'
import { DomChatBubble } from './DomChatBubble'

export default class Avatar extends Phaser.Physics.Arcade.Sprite {
  avatarTexture: string
  avatarContainer: Phaser.GameObjects.Container
  nickname: Phaser.GameObjects.Text
  domNickname: DomNickname
  chatBox: Phaser.GameObjects.Container
  domChatBubble: DomChatBubble
  timeOut?: number
  selectedInteractionItem?: ObjectItem

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.avatarTexture = texture

    this.anims.play(`${texture}_stand_down`, true)

    this.setDepth(1000)

    this.avatarContainer = this.scene.add.container(x, y - 35).setDepth(10000)

    this.nickname = this.scene.add.text(0, 0, '')
    this.nickname.setVisible(false)
    this.domNickname = new DomNickname()

    this.chatBox = this.scene.add.container(0, 0)
    this.domChatBubble = new DomChatBubble()

    this.avatarContainer.add(this.nickname)
    this.avatarContainer.add(this.chatBox)

    this.scene.physics.world.enable(this)
    this.scene.physics.world.enable(this.avatarContainer)

    const collisionRange = [0.5, 0.1]
    this.setSize(
      this.width * collisionRange[0],
      this.height * collisionRange[1],
    )
  }

  // 아바타 텍스처 설정
  setAvatarTexture(avatarTexture: string) {
    this.avatarTexture = avatarTexture
    this.anims.play(`${avatarTexture}_stand_down`, true)
  }

  // 닉네임 설정
  setNickname(nickname: string) {
    this.nickname.setText(nickname)
    this.domNickname.show(
      nickname,
      this.avatarContainer.x,
      this.avatarContainer.y + 5,
      this.scene.cameras.main,
    )
  }

  // 닉네임 위치 업데이트
  updateNicknamePosition() {
    if (this.domNickname.isVisible()) {
      this.domNickname.updatePosition(
        this.avatarContainer.x,
        this.avatarContainer.y + 5,
        this.scene.cameras.main,
      )
    }
  }

  // 말풍선 표시
  updateChat(content: string) {
    this.clearChat()

    this.domChatBubble.show(
      content,
      this.avatarContainer.x,
      this.avatarContainer.y - 15,
      this.scene.cameras.main,
    )
  }

  // 말풍선 위치 업데이트
  updateChatPosition() {
    if (this.domChatBubble.isVisible()) {
      this.domChatBubble.updatePosition(
        this.avatarContainer.x,
        this.avatarContainer.y - 15,
        this.scene.cameras.main,
      )
    }
  }

  // 채팅 박스 삭제
  clearChat() {
    clearTimeout(this.timeOut)
    this.chatBox.removeAll(true)
    this.domChatBubble.clear()
  }
}
