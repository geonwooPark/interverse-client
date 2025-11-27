import ObjectItem from './ObjectItem'
import i18n from '@locales/index'

export default class Printer extends ObjectItem {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'printer'
  }

  do() {
    this.scene.events.emit('openSurveyModal')
    this.scene.events.emit('changeContent', i18n.t('game.items.esc_to_game'))
  }

  undo() {
    this.scene.events.emit('closeModal')
    this.scene.events.emit('changeContent', '')
  }

  onInteractionBox() {
    this.setInteractionBox(i18n.t('game.items.printer_interaction'))
  }
}
