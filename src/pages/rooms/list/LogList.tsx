import { useRoomsQuery } from '@hooks/queries/roomsQueries'
import React from 'react'
import Log from './Log'
import { useModal } from '@providers/ModalProvider'
import ConfirmModal from '@components/ConfirmModal'
import { useDeleteRoomMutation } from '@hooks/mutations/roomsMutation'
import Empty from './Empty'
import { useTranslation } from 'react-i18next'

export default function LogList() {
  const { addModal, removeModal } = useModal()

  const { data: logs } = useRoomsQuery()

  const { mutate: deleteMutate } = useDeleteRoomMutation()

  const { t } = useTranslation()

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
    <div className="grid size-full grid-cols-1 gap-6 pb-[60px] tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-8">
      {logs?.map((log) => (
        <Log key={log.joinedAt} log={log} onDelete={handleDeleteModal} />
      ))}
    </div>
  )
}
