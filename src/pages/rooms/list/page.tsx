import React from 'react'
import Button from '@components/Button'
import { IconPlus } from '@assets/svgs'
import { useNavigate } from 'react-router-dom'
import { paths } from '@routes/paths'
import LogList from './LogList'
import Boundary from '@components/Boundary'
import Loading from './Loading'
import Error from './Error'

export default function RoomListPage() {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`${paths.rooms.create}`)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-2 pt-4 tablet:pb-6 tablet:pt-8">
        <h2 className="text-h4 font-semibold tablet:text-h3">
          현재 이용 중인 공간
        </h2>

        <Button
          size="sm"
          variant="contained"
          leftIcon={<IconPlus className="mr-2 size-6" />}
          className="ml-auto hidden tablet:flex"
          onClick={onClick}
        >
          방 만들기
        </Button>
      </div>

      <Boundary LoadingFallback={<Loading />} ErrorFallback={Error}>
        <LogList />
      </Boundary>

      {/* 모바일용 플로팅 버튼 */}
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 z-popover flex size-14 items-center justify-center rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 transition-all duration-200 hover:bg-cyan-400 active:scale-95 tablet:hidden"
        aria-label="방 만들기"
      >
        <IconPlus className="size-6 text-white" />
      </button>
    </div>
  )
}
