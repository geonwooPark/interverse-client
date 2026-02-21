import Logo from '@components/Logo'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="h-[64px] w-full border-b bg-white px-6">
      <div className="flex h-full items-center justify-between">
        <Link to={'/'}>
          <Logo width={160} />
        </Link>
      </div>
    </header>
  )
}
