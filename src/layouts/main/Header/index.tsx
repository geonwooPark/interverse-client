import Logo from '@components/Logo'
import UserProfile from './UserProfile'
import { Link } from 'react-router-dom'
import Boundary from '@components/Boundary'
import { Loading } from './Loading'
import Error from './Error'

export default function Header() {
  return (
    <header className="h-[64px] w-full border-b bg-white px-6">
      <div className="flex h-full items-center justify-between">
        <Link to={'/'}>
          <Logo width={160} />
        </Link>

        <Boundary LoadingFallback={<Loading />} ErrorFallback={Error}>
          <UserProfile />
        </Boundary>
      </div>
    </header>
  )
}
