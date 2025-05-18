import Phaser from 'phaser'
import Game from '../games/scenes/Game'
import Preload from '../games/scenes/Preload'

class GameManager {
  private static instance: Phaser.Game | null = null

  private constructor() {}

  public static getInstance(): Phaser.Game {
    if (!GameManager.instance) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        pixelArt: true,
        parent: 'game-container',
        scale: {
          width: window.innerWidth,
          height: window.innerHeight,
          mode: Phaser.Scale.RESIZE,
        },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
          },
        },
        scene: [Preload, Game],
        backgroundColor: '#fff',
      }

      GameManager.instance = new Phaser.Game(config)
    }

    return GameManager.instance
  }

  public static destroy() {
    if (GameManager.instance) {
      GameManager.instance.destroy(true)
      GameManager.instance = null
    }
  }
}

export default GameManager
