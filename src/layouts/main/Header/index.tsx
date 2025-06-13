import Logo from '@components/Logo'
import UserProfile from './UserProfile'
import { Link } from 'react-router-dom'
import GameManager from '@managers/GameManager'

export default function Header() {
  const onGameReset = () => {
    GameManager.destroy()
  }

  return (
    <header className="h-[64px] w-full border-b bg-white px-6">
      <div className="flex h-full items-center justify-between">
        <Link to={'/'} onClick={onGameReset}>
          <Logo width={160} />
        </Link>

        <div className="flex items-center gap-2">
          <UserProfile onGameReset={onGameReset} />
        </div>
      </div>
    </header>
  )
}
