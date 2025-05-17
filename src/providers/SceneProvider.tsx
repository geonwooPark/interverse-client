import React, { PropsWithChildren } from 'react'
import { _createContext } from '../utils/_createContext'
import GameScene from '@games/scenes/Game'
import GameManager from '@managers/GameManager'

export const [useScene, Provider] = _createContext<GameScene>()

export default function SceneProvider({ children }: PropsWithChildren) {
  const game = GameManager.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  return <Provider value={gameScene}>{children}</Provider>
}
