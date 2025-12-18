import placeholder from '@assets/images/placeholder.jpg'
import { AnimatePresence, motion as m } from 'motion/react'
import { useMeQuery } from '@hooks/queries/authQueries'
import { useState, useRef } from 'react'
import { removeLocalStorageItem } from '@utils/localStorage'
import { useQueryClient } from '@tanstack/react-query'
import { TOKEN } from '@constants/index'
import { useStore } from 'ventileco-store'
import { isLoggedInStore } from '@store/index'
import slide from '@components/Animation/motions/slide'
import { toast } from 'ventileco-ui'
import Image from '@components/Image'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Icon from '@components/Icon'

export default function UserProfile() {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { t } = useTranslation()

  const { data: me } = useMeQuery()

  const [, setIsLoggedIn] = useStore(isLoggedInStore, (state) => state)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const logout = () => {
    toast.success(t('common.logout_success'))
    removeLocalStorageItem(TOKEN)
    setIsLoggedIn(false)
    queryClient.clear()
    setIsMenuOpen(false)
  }

  const goSetting = () => {
    navigate('/setting')
    setIsMenuOpen(false)
  }

  return (
    <div ref={menuRef} className="relative flex items-center gap-2">
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 transition-all duration-200 ${
          isMenuOpen
            ? 'bg-gradient-to-br from-gray-100 to-gray-200 shadow-md'
            : 'hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:shadow-sm'
        }`}
      >
        <div className="relative size-9 overflow-hidden rounded-full border-2 border-gray-200 shadow-sm transition-transform group-hover:scale-105 group-hover:border-gray-300">
          <Image
            src={me?.user?.profile || placeholder}
            alt="placeholder"
            ratio={1}
          />
        </div>
        <p className="text-body2 font-medium text-gray-800">
          {me?.user?.nickname}
        </p>
        <Icon
          iconName="IconChevronLeft"
          className={`size-4 text-gray-500 transition-transform duration-200 ${
            isMenuOpen ? 'rotate-90' : '-rotate-90'
          }`}
        />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dim */}
            <div
              className="fixed inset-0 z-[4] bg-black/50"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu */}
            <m.ul
              {...slide({ distance: -20, isFade: true }).inY}
              className="absolute right-0 top-12 z-overlay w-[180px] overflow-hidden rounded-xl bg-white shadow-2xl"
            >
              <li>
                <button
                  className="group flex w-full items-center gap-3 bg-white px-4 py-3 text-start text-body2 transition-colors hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 active:scale-[0.98]"
                  onClick={goSetting}
                >
                  <Icon
                    iconName="IconUser"
                    className="size-5 shrink-0 text-gray-400 transition-colors group-hover:text-cyan-600"
                  />
                  <span className="text-gray-800 group-hover:text-gray-900">
                    {t('common.menu.setting')}
                  </span>
                </button>
              </li>
              <li className="border-t border-gray-100">
                <button
                  className="group flex w-full items-center gap-3 bg-white px-4 py-3 text-start transition-colors hover:bg-gradient-to-r hover:from-red-50/50 hover:to-pink-50/50 active:scale-[0.98]"
                  onClick={logout}
                >
                  <Icon
                    iconName="IconOff"
                    className="size-5 shrink-0 text-gray-400 transition-colors group-hover:text-red-600"
                  />
                  <span className="text-body2 text-gray-800 group-hover:text-red-600">
                    {t('common.menu.logout')}
                  </span>
                </button>
              </li>
            </m.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
