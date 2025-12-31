import ObjectItem from './ObjectItem'
import Player from '@games/avatars/Player'
import i18n from '@locales/index'

export default class Whiteboard extends ObjectItem {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'whiteboard'
  }

  do(player: Player) {
    this.scene.events.emit('changeContent', i18n.t('game.items.esc_to_game'))
    this.scene.events.emit('openWhiteboard')
  }

  undo() {
    this.scene.events.emit('changeContent', '')
    this.scene.events.emit('closeWhiteboard')
  }

  onInteractionBox() {
    this.setInteractionBox(i18n.t('game.items.whiteboard_interaction'))
  }
}
