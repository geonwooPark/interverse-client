import React from 'react'

export default function GlobalLoading() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-notification">
      <div className="global-loading-track h-1 w-full bg-black/10">
        <div className="global-loading-bar h-full bg-cyan-500" />
      </div>
    </div>
  )
}
