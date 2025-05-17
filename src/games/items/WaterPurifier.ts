import ObjectItem from './ObjectItem'

export default class WaterPurifier extends ObjectItem {
  order = 0
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'waterPurifier'
  }

  do() {}

  undo() {}

  onInteractionBox() {}
}
