import placeholder from '@assets/images/placeholder.jpg'
import { AnimatePresence, motion as m } from 'motion/react'
import { useMeQuery } from '@hooks/queries/authQueries'
import { useState } from 'react'
import { removeLocalStorageItem } from '@utils/localStorage'
import { useQueryClient } from '@tanstack/react-query'
import { TOKEN } from '@constants/index'
import { useStore } from 'ventileco-store'
import { isLoggedInStore } from '@store/index'
import slide from '@components/Animation/motions/slide'
import GameManager from '@managers/GameManager'

export default function UserProfile() {
  const queryClient = useQueryClient()

  const { data: me } = useMeQuery()

  const [, setIsLoggedIn] = useStore(isLoggedInStore, (state) => state)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const logout = () => {
    removeLocalStorageItem(TOKEN)
    setIsLoggedIn(false)
    queryClient.clear()

    GameManager.destroy()

    const gameContainer = document.getElementById(
      'game-container',
    ) as HTMLElement
    if (gameContainer) {
      gameContainer.style.display = 'none'
    } else {
      console.warn('game-container 없음!')
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md px-3 py-2 duration-200 hover:bg-gray-100"
      >
        <div className="pointer-events-none size-8 overflow-hidden rounded-full border">
          <img src={placeholder} alt="placeholder" />
        </div>
        <p className="pointer-events-none text-body2">{me?.user?.nickname}</p>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <m.ul
            {...slide({ distance: -20, isFade: true }).inY}
            className="absolute -bottom-12 w-full overflow-hidden rounded-md bg-white shadow-level2"
          >
            <li>
              <button
                className="w-full bg-white px-3 py-2 duration-200 hover:bg-gray-50"
                onClick={logout}
              >
                <p className="pointer-events-none text-start text-body2 text-red-600">
                  로그아웃
                </p>
              </button>
            </li>
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
