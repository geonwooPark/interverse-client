import dayjs from 'dayjs'
import React from 'react'

interface LogProps {
  log: {
    userId?: string
    joinedAt?: string
    room?: {
      _id?: string
      title?: string
      host?: string
      headCount?: number
      mapId?: string
    }
    map?: {
      _id?: string
      name?: string
      thumbnail?: string
      source?: string
    }
  }
}

export default function Log({ log }: LogProps) {
  return (
    <a href={`/rooms/${log.room?._id}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <img
          src={log.map?.thumbnail}
          alt={`map-${log.map?.name}`}
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="pointer-events-none mt-2">
        <p className="text-h6">{log.room?.title}</p>
        <p className="text-caption text-gray-400">
          최근 참여: {dayjs(log.joinedAt).format('YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
    </a>
  )
}
