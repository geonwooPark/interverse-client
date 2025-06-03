import React, { Suspense } from 'react'
import Button from '@components/Button'
import { IconPlus } from '@assets/svgs'
import { useNavigate } from 'react-router-dom'
import { paths } from '@routes/paths'
import LogList from './LogList'
import LogListSkeleton from './LogListSkeleton'

export default function RoomListPage() {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`${paths.rooms.create}`)
  }

  return (
    <div className="pb-[60px]">
      <div className="flex items-center justify-between pb-8 pt-4">
        <h2 className="text-h2 font-semibold">현재 이용 중인 공간</h2>

        <Button
          size="sm"
          variant="contained"
          leftIcon={<IconPlus className="mr-2 size-6" />}
          className="ml-auto"
          onClick={onClick}
        >
          방 만들기
        </Button>
      </div>

      <Suspense fallback={<LogListSkeleton />}>
        <LogList />
      </Suspense>
    </div>
  )
}
