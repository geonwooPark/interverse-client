import React from 'react'

export function LogSkeleton() {
  return (
    <div>
      <div className="relative aspect-[4/3] w-full animate-pulse overflow-hidden rounded-lg bg-gray-300" />
      <div className="mt-2 space-y-2">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-300" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  )
}
