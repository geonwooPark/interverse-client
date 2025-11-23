import React from 'react'
import Image from './Image'

interface LogoProps {
  width: number
  className?: string
}

export default function Logo({ width, className }: LogoProps) {
  return (
    <div className={className}>
      <Image src="/images/logo.png" alt="logo" width={width} />
    </div>
  )
}
