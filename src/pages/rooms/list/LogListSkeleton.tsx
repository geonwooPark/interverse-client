import React from 'react'
import { LogSkeleton } from './LogSkeleton'

export default function LogListSkeleton() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 desktop:grid-cols-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <LogSkeleton key={i} />
        ))}
    </div>
  )
}
