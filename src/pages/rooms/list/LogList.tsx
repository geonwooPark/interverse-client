import { useRoomsQuery } from '@hooks/queries/roomsQueries'
import React from 'react'
import Log from './Log'

export default function LogList() {
  const { data: logs } = useRoomsQuery()

  return (
    <div className="grid w-full grid-cols-2 gap-4 desktop:grid-cols-4">
      {logs?.map((log) => <Log key={log.joinedAt} log={log} />)}
    </div>
  )
}
