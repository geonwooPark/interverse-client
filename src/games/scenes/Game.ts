import { createAvatarAnims } from '../animation/AvatarAnims'
import OtherPlayer from '../avatars/OtherPlayer'
import Player from '../avatars/Player'
import Chair from '../items/Chair'
import { RoomManager } from '@managers/RoomManager'
import { ChatManager } from '@managers/ChatManager'
import { ChairManager } from '@managers/ChairManager'
import { PlayManager } from '@managers/PlayManager'
import { VideoManager } from '@managers/VideoManager'
import { INIT_POSITION } from '@constants/index'
import { DMManager } from '@managers/DMManager'
import { socketService } from '@services/socketService'
import ObjectItem from '@games/items/ObjectItem'
import Whiteboard from '@games/items/Whiteboard'

export default class Game extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  private cursur?: Phaser.Types.Input.Keyboard.CursorKeys
  private overlap?: Phaser.Physics.Arcade.StaticGroup
  private keySpace?: Phaser.Input.Keyboard.Key
  private keyEscape?: Phaser.Input.Keyboard.Key
  readonly ws = socketService
  roomNum!: string
  texture!: string
  nickname!: string
  player!: Player
  otherPlayers!: Phaser.Physics.Arcade.Group
  room: RoomManager
  chat: ChatManager
  chair: ChairManager
  play: PlayManager
  video: VideoManager
  dm: DMManager

  constructor() {
    // Scene Key
    super('game')

    this.room = new RoomManager(this)
    this.chat = new ChatManager(this)
    this.chair = new ChairManager(this)
    this.play = new PlayManager(this)
    this.video = new VideoManager(this)
    this.dm = new DMManager(this)
  }

  setUpKeys() {
    this.cursur = this.input.keyboard?.createCursorKeys()
    this.keySpace = this.input.keyboard?.addKey('space')
    this.keyEscape = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC,
    )
    if (this.input.keyboard) {
      this.input.keyboard.disableGlobalCapture()
      this.input.keyboard.on('keydown-ENTER', () => {
        this.cursur?.left.reset()
        this.cursur?.right.reset()
        this.cursur?.up.reset()
        this.cursur?.down.reset()
        this.events.emit('onFocusChat')
      })
    }
  }

  enableKeys() {
    if (!this.input.keyboard) return
    this.input.keyboard.enabled = true
  }

  disableKeys() {
    if (!this.input.keyboard) return
    this.input.keyboard.enabled = false
  }

  // 	씬이 시작되기 전 초기화 작업
  init(data: { roomNum: string; nickname: string; texture: string }) {
    this.roomNum = data.roomNum
    this.texture = data.texture
    this.nickname = data.nickname
  }

  // Scene이 로드될 때 한번 호출, 게임 오브젝트 배치
  create() {
    // 아바타 생성
    createAvatarAnims(this.anims)
    this.player = new Player(
      this,
      INIT_POSITION[0],
      INIT_POSITION[1],
      this.texture,
      this.nickname,
    )
    this.add.existing(this.player)
    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer })

    // 타일맵 로드
    this.map = this.make.tilemap({ key: 'tilemap' })
    const FloorAndGround = this.map.addTilesetImage(
      'FloorAndGround',
      'FloorAndGround',
    )
    this.map.addTilesetImage('Office', 'Office')

    const groundLayer = this.map
      .createLayer('Floor', FloorAndGround!)!
      .setCollisionByProperty({ collides: true })

    this.addGroupFromTiled('Wall', 'FloorAndGround', 'FloorAndGround', true)
    this.addGroupFromTiled('Collidable', 'Office', 'Office', true)
    this.addGroupFromTiled('NonCollidable', 'Office', 'Office', false)
    this.addInteractiveGroupFromTiled(
      Chair,
      'Chair',
      'object1x2',
      'object1x2',
      (chair, _index, tileObject) => {
        chair.heading = tileObject.properties[0].value

        if (chair.heading !== 'up') {
          chair.setDepth(chair.y - chair.height / 2)
        }
      },
    )
    this.addInteractiveGroupFromTiled(
      Whiteboard,
      'Whiteboard',
      'object2x2',
      'object2x2',
      (whiteboard, index) => {},
    )

    this.physics.add.collider(
      [this.player, this.player.avatarContainer],
      groundLayer,
    )

    // Camera Setting
    this.cameras.main.zoom = 1.6
    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.setBackgroundColor('#3498db')

    this.joinRoom()
  }

  /** 방에 입장 */
  joinRoom() {
    this.setUpKeys()

    this.room.joinRoom({
      roomNum: this.roomNum,
      nickname: this.nickname,
      texture: this.texture,
      x: INIT_POSITION[0],
      y: INIT_POSITION[1],
    })
  }

  // 주로 게임 상태를 업데이트하고 게임 객체들의 상태를 조작하는 데 사용. 게임이 실행되는 동안 지속적으로 호출됨
  update() {
    // 플레이어 이동
    if (this.player && this.cursur) {
      this.player.update(this.cursur)
    }

    // 플레이어 인터렉션
    if (this.keyEscape && this.keyEscape) {
      this.player.action(this.keySpace!, this.keyEscape)
    }

    if (!this.physics.overlap(this.player, this.overlap)) {
      this.player.setOffset(0, 20)
    }

    // 나의 말풍선 및 닉네임 위치 업데이트
    if (this.player) {
      this.player.setDepth(this.player.y)
      this.player.updateChatPosition()
      this.player.updateNicknamePosition()
    }

    // 다른 플레이어들의 말풍선 및 닉네임 위치 업데이트
    this.otherPlayers.children.entries.forEach((otherPlayer) => {
      if (otherPlayer instanceof OtherPlayer) {
        otherPlayer.setDepth(otherPlayer.y)
        otherPlayer.updateChatPosition()
        otherPlayer.updateNicknamePosition()
      }
    })
  }

  // Scene이 종료될 때 호출되는 메서드 - 리소스 정리
  shutdown() {
    const managers = [
      this.video,
      this.room,
      this.chat,
      this.chair,
      this.play,
      this.dm,
    ]

    managers.forEach((manager) => {
      if (manager && typeof manager.cleanup === 'function') {
        manager.cleanup()
      }
    })

    // 키보드 이벤트 리스너 제거
    if (this.input.keyboard) {
      this.input.keyboard.removeAllListeners()
    }

    // Scene 이벤트 리스너 제거
    this.events.removeAllListeners()
  }

  private addObjectFromTiled(
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    texture: string,
    tilesetName: string,
  ) {
    // Tiled 좌표계 기준을 Phaser 좌표계로 변환
    const actualX = object.x! + object.width! * 0.5
    const actualY = object.y! - object.height! * 0.5
    const obj = group
      .get(
        actualX,
        actualY,
        texture,
        object.gid! - this.map.getTileset(tilesetName)!.firstgid,
      )
      .setDepth(actualY + object.height! / 2)
    return obj
  }

  private addGroupFromTiled(
    objectLayerName: string,
    texture: string,
    tilesetName: string,
    collidable: boolean,
  ) {
    const group = this.physics.add.staticGroup()
    const objectLayer = this.map.getObjectLayer(objectLayerName)!

    objectLayer.objects.forEach((object) => {
      this.addObjectFromTiled(group, object, texture, tilesetName)
    })
    if (this.player && collidable) {
      this.physics.add.collider(
        [this.player, this.player.avatarContainer],
        group,
      )
    }
    return group
  }

  private addInteractiveGroupFromTiled<
    T extends typeof ObjectItem,
    S = InstanceType<T>,
  >(
    classType: T,
    objectLayerName: string,
    texture: string,
    tilesetName: string,
    updater: (
      object: S,
      index: number,
      tileObject: Phaser.Types.Tilemaps.TiledObject,
    ) => void,
  ) {
    const group = this.physics.add.staticGroup({ classType })
    const objectLayer = this.map.getObjectLayer(objectLayerName)!

    objectLayer.objects.forEach((chairObj, index) => {
      const item = this.addObjectFromTiled(
        group,
        chairObj,
        texture,
        tilesetName,
      ) as S
      updater(item, index, chairObj)
    })
    return group
  }
}
