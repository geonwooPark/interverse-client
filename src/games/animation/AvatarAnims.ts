import Phaser from 'phaser'

// 캐릭터별 방향 및 액션에 따른 프레임 범위를 정의
const characterAnimations = {
  stand: {
    right: [0, 5],
    up: [6, 11],
    left: [12, 17],
    down: [18, 23],
  },
  run: {
    right: [24, 29],
    up: [30, 35],
    left: [36, 41],
    down: [42, 47],
  },
  sit: {
    right: [48, 48],
    left: [49, 49],
    down: [50, 50],
    up: [51, 51],
  },
}

// 적용할 캐릭터 목록
const characters = ['conference', 'bob', 'emma', 'james', 'sofia']

export const createAvatarAnims = (
  anims: Phaser.Animations.AnimationManager,
) => {
  const frameRate = 12

  characters.forEach((character) => {
    Object.entries(characterAnimations).forEach(([action, directions]) => {
      Object.entries(directions).forEach(([direction, [start, end]]) => {
        const key = `${character}_${action}_${direction}`
        if (anims.exists(key)) return // 이미 등록된 키는 스킵

        anims.create({
          key,
          frames: anims.generateFrameNumbers(character, { start, end }),
          frameRate,
          repeat: action === 'sit' ? 0 : -1,
        })
      })
    })
  })
}
