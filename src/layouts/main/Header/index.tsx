import Logo from '@components/Logo'
import UserProfile from './UserProfile'
import { Link } from 'react-router-dom'
import GameManager from '@managers/GameManager'
import Boundary from '@components/Boundary'
import { Loading } from './Loading'
import Error from './Error'

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

        <Boundary LoadingFallback={<Loading />} ErrorFallback={Error}>
          <UserProfile onGameReset={onGameReset} />
        </Boundary>
      </div>
    </header>
  )
}
