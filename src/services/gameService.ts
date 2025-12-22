import Phaser from 'phaser'
import Game from '../games/scenes/Game'
import Preload from '../games/scenes/Preload'

class GameService {
  private static instance: Phaser.Game | null = null

  private constructor() {}

  public static getInstance(): Phaser.Game {
    if (!GameService.instance) {
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

      GameService.instance = new Phaser.Game(config)
    }

    return GameService.instance
  }

  public static destroy() {
    if (GameService.instance) {
      GameService.instance.destroy(true)
      GameService.instance = null
    }
  }
}

export default GameService
