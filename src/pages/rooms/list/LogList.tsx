import { useRoomsQuery } from '@hooks/queries/roomsQueries'
import React, { useEffect, useState } from 'react'
import Log from './Log'
import { useModal } from '@providers/ModalProvider'
import ConfirmModal from '@components/ConfirmModal'
import { useDeleteRoomMutation } from '@hooks/mutations/roomsMutation'
import Empty from './Empty'
import { useTranslation } from 'react-i18next'
import { socketService } from '@services/socketService'

type ParticipantCount = {
  roomId: string
  participantCount: number
}

export default function LogList() {
  const { addModal, removeModal } = useModal()

  const { data: logs } = useRoomsQuery()

  const { mutate: deleteMutate } = useDeleteRoomMutation()

  const { t } = useTranslation()

  const [participantCounts, setParticipantCounts] = useState<
    Record<string, number>
  >({})

  // 방 목록 로드 시 참여자 수 요청
  useEffect(() => {
    if (!logs?.length) return

    const roomIds = logs
      .map((log) => log.room?._id)
      .filter((id): id is string => !!id)

    if (roomIds.length > 0) {
      socketService.socket.emit('clientRequestRoomParticipantCounts', roomIds)
    }
  }, [logs])

  // Socket 이벤트 구독
  useEffect(() => {
    // 개별 방의 참여자 수 실시간 업데이트
    const handleParticipantCount = ({
      roomId,
      participantCount,
    }: ParticipantCount) => {
      setParticipantCounts((prev) => ({
        ...prev,
        [roomId]: participantCount,
      }))
    }

    // 방 목록의 참여자 수 일괄 응답
    const handleParticipantCounts = (counts: ParticipantCount[]) => {
      const countsMap = counts.reduce<Record<string, number>>(
        (acc, { roomId, participantCount }) => {
          acc[roomId] = participantCount
          return acc
        },
        {},
      )

      setParticipantCounts((prev) => ({
        ...prev,
        ...countsMap,
      }))
    }

    socketService.socket.on(
      'serverRoomParticipantCount',
      handleParticipantCount,
    )
    socketService.socket.on(
      'serverRoomParticipantCounts',
      handleParticipantCounts,
    )

    return () => {
      socketService.socket.off(
        'serverRoomParticipantCount',
        handleParticipantCount,
      )
      socketService.socket.off(
        'serverRoomParticipantCounts',
        handleParticipantCounts,
      )
    }
  }, [])

  const handleDeleteModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    roomId: string,
  ) => {
    e.preventDefault()

    if (!roomId) return

    addModal(
      <ConfirmModal
        title={t('rooms.log_list.delete_title')}
        description={t('rooms.log_list.delete_description')}
        rightLabel={t('common.delete')}
        rightButtonClassName="bg-error hover:bg-error/90"
        onClose={removeModal}
        onSubmit={() => {
          deleteMutate(roomId)
          removeModal()
        }}
      />,
    )
  }

  if (logs?.length === 0) {
    return <Empty label={t('rooms.log_list.empty_label')} />
  }

  return (
    <div className="grid grid-cols-1 gap-6 pb-[60px] tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-8">
      {logs?.map((log) => (
        <Log
          key={log.joinedAt}
          log={log}
          participantCount={participantCounts[log.room?._id]}
          onDelete={handleDeleteModal}
        />
      ))}
    </div>
  )
}
