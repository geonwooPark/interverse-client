import { useSingleRoomQuery } from '@hooks/queries/roomsQueries'
import { useParams } from 'react-router-dom'

function LeftSide() {
  const { id: roomId } = useParams()

  const { data: room } = useSingleRoomQuery(roomId as string)

  return (
    <div className="group flex max-w-[400px] items-center gap-3 truncate rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 px-4 py-2.5 font-neodgm text-white shadow-lg transition-all duration-200 hover:from-gray-700 hover:to-gray-800 hover:shadow-xl">
      <div className="flex shrink-0 items-center justify-center">
        <span className="text-xl transition-transform group-hover:scale-110">
          👾
        </span>
      </div>
      <span className="select-none truncate text-body2 font-medium">
        {room?.title || '방 제목'}
      </span>
    </div>
  )
}

export default LeftSide
