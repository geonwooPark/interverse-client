import { IconDelete } from '@assets/svgs'
import { useMeQuery } from '@hooks/queries/authQueries'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'

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
  onDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    roomId: string,
  ) => void
}

export default function Log({ log, onDelete }: LogProps) {
  const { data: me } = useMeQuery()

  return (
    <div className="group relative">
      <Link to={`/rooms/${log.room?._id}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <img
            src={log.map?.thumbnail}
            alt={`map-${log.map?.name}`}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="mt-2">
          <p className="truncate text-h6">{log.room?.title}</p>

          <p className="text-start text-caption text-gray-400">
            최근 참여: {dayjs(log.joinedAt).format('YYYY-MM-DD HH:mm:ss')}
          </p>
        </div>
      </Link>

      {me?.user?.id === log.room?.host && (
        <button
          onClick={(e) => onDelete(e, log.room?._id || '')}
          className="absolute right-2 top-2 hidden size-10 items-center justify-center rounded-md bg-white/50 duration-200 hover:bg-white/30 group-hover:flex"
        >
          <IconDelete className="size-5 text-error" />
        </button>
      )}
    </div>
  )
}
