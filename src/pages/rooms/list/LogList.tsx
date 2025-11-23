import { useRoomsQuery } from '@hooks/queries/roomsQueries'
import React from 'react'
import Log from './Log'
import { useModal } from '@providers/ModalProvider'
import ConfirmModal from '@components/ConfirmModal'
import { useDeleteRoomMutation } from '@hooks/mutations/roomsMutation'
import Empty from './Empty'

export default function LogList() {
  const { addModal, removeModal } = useModal()

  const { data: logs } = useRoomsQuery()

  const { mutate: deleteMutate } = useDeleteRoomMutation()

  const handleDeleteModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    roomId: string,
  ) => {
    e.preventDefault()

    if (!roomId) return

    addModal(
      <ConfirmModal
        title="방 삭제"
        description={`삭제된 방은 되돌릴 수 없습니다.
          정말 방을 삭제하시겠습니까?`}
        rightLabel="삭제"
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
    return <Empty label="현재 참여 중인 방이 없습니다." />
  }

  return (
    <div className="grid size-full grid-cols-1 gap-4 pb-[60px] tablet:grid-cols-2 desktop:grid-cols-4">
      {logs?.map((log) => (
        <Log key={log.joinedAt} log={log} onDelete={handleDeleteModal} />
      ))}
    </div>
  )
}
