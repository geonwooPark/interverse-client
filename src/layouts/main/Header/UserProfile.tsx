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
import { toast } from 'ventileco-ui'

interface UserProfileProps {
  onGameReset: () => void
}

export default function UserProfile({ onGameReset }: UserProfileProps) {
  const queryClient = useQueryClient()

  const { data: me } = useMeQuery()

  const [, setIsLoggedIn] = useStore(isLoggedInStore, (state) => state)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const logout = () => {
    toast.success('로그아웃 완료! 편안한 하루 보내세요 😊')
    removeLocalStorageItem(TOKEN)
    setIsLoggedIn(false)
    onGameReset()
    queryClient.clear()
  }

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md px-3 py-2 duration-200 hover:bg-gray-100"
      >
        <div className="size-8 overflow-hidden rounded-full border">
          <img src={me?.user?.profile || placeholder} alt="placeholder" />
        </div>
        <p className="text-body2">{me?.user?.nickname}</p>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <m.ul
            {...slide({ distance: -20, isFade: true }).inY}
            className="absolute -bottom-12 right-0 z-overlay w-[120px] overflow-hidden rounded-md bg-white shadow-level2"
          >
            <li>
              <button
                className="w-full bg-white px-3 py-2 duration-200 hover:bg-gray-50"
                onClick={logout}
              >
                <p className="text-start text-body2 text-red-600">로그아웃</p>
              </button>
            </li>
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
