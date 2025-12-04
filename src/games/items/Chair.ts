import Player from '@games/avatars/Player'
import ObjectItem from './ObjectItem'
import GameScene from '@games/scenes/Game'
import i18n from '@locales/index'

export default class Chair extends ObjectItem {
  id!: number
  tempX = 0
  tempY = 0
  // 의자 방향
  heading?: string
  // 의자 타입
  interaction?: string

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'chair'
  }

  do(player: Player) {
    this.tempX = player.x
    this.tempY = player.y

    const game = this.scene.game.scene.getScene('game') as GameScene
    const sitAnims = `${player.texture.key}_sit_${this.heading}`

    player.setPosition(this.x, this.y + 5)
    player.avatarContainer.setPosition(player.x, player.y - 35)
    player.anims.play(sitAnims, true)

    game.play.sendAvatarPosition({
      x: this.x,
      y: this.y,
      animation: sitAnims,
      isLast: true,
    })
    game.chair.sendChairId(this.id.toString())

    this.scene.events.emit(
      'changeContent',
      'ESC 키를 누르면 의자에서 일어날 수 있습니다.',
    )
  }

  undo(player: Player) {
    player.setPosition(this.tempX, this.tempY)

    const game = this.scene.game.scene.getScene('game') as GameScene
    const standAnims = `${player.texture.key}_stand_${this.heading}`

    game.play.sendAvatarPosition({
      x: this.tempX,
      y: this.tempY,
      animation: standAnims,
    })
    game.chair.sendChairId(this.id.toString())

    this.scene.events.emit('changeContent', '')
  }

  onInteractionBox() {
    this.setInteractionBox(i18n.t('game.items.chair_default_interaction'))
  }
}
