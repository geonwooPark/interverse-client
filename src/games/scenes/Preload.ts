export default class Preload extends Phaser.Scene {
  private mapSrc!: string
  private builder!: string
  private charactersSrc!: {
    _id: string
    name: string
    source: string
    width: number
    height: number
  }[]

  constructor() {
    // Scene Key
    super('preload')
  }

  init(data: {
    mapSrc: string
    builder: string
    charactersSrc: {
      _id: string
      name: string
      source: string
      width: number
      height: number
    }[]
  }) {
    this.mapSrc = data.mapSrc
    this.builder = data.builder
    this.charactersSrc = data.charactersSrc
  }

  // Scene이 로드되기 전에 호출, 사용할 에셋을 로드
  preload() {
    // Tiled로 생성된 JSON 형식의 타입맵을 로드
    this.load.tilemapTiledJSON('tilemap', this.mapSrc)

    // 스프라이트 시트 이미지 파일을 로드
    this.load.spritesheet('Office', this.builder, {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.spritesheet('FloorAndGround', `/assets/FloorAndGround.png`, {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.spritesheet('object1x2', '/assets/object1x2.png', {
      frameWidth: 32,
      frameHeight: 64,
    })
    this.load.spritesheet('object2x2', '/assets/object2x2.png', {
      frameWidth: 64,
      frameHeight: 64,
    })

    this.charactersSrc.forEach((character) =>
      this.load.spritesheet(character.name, character.source, {
        frameWidth: character.width,
        frameHeight: character.height,
      }),
    )
  }
}
