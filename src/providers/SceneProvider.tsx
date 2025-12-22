import React, { PropsWithChildren } from 'react'
import { _createContext } from '../utils/_createContext'
import GameScene from '@games/scenes/Game'
import GameService from '@services/gameService'

export const [useScene, Provider] = _createContext<GameScene>()

export default function SceneProvider({ children }: PropsWithChildren) {
  const game = GameService.getInstance()

  const gameScene = game.scene.getScene('game') as GameScene

  return <Provider value={gameScene}>{children}</Provider>
}
