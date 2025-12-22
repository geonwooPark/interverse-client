import { useRoomsQuery } from '@hooks/queries/roomsQueries'
import React, { useState } from 'react'
import Log from './Log'
import { useModal } from '@providers/ModalProvider'
import ConfirmModal from '@components/ConfirmModal'
import { useDeleteRoomMutation } from '@hooks/mutations/roomsMutation'
import Empty from './Empty'
import { useTranslation } from 'react-i18next'
import Pagination from '@components/Pagination'

const ITEMS_PER_PAGE = 6

export default function LogList() {
  const { addModal, removeModal } = useModal()

  const { t } = useTranslation()

  const [page, setPage] = useState(1)

  const { data } = useRoomsQuery(page, ITEMS_PER_PAGE)

  const { mutate: deleteMutate } = useDeleteRoomMutation()

  const logs = data?.logs || []

  const metadata = data?.metadata

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (logs?.length === 0 && page === 1) {
    return <Empty label={t('rooms.log_list.empty_label')} />
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 pb-[60px] tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-8">
        {logs.map((log) => (
          <Log key={log.joinedAt} log={log} onDelete={handleDeleteModal} />
        ))}
      </div>

      {metadata && metadata.totalPages && metadata.totalPages > 1 && (
        <div className="flex justify-center pb-8">
          <Pagination
            page={metadata.page || 1}
            totalItemCount={metadata.totalCount || 0}
            listItemCount={metadata.limit || ITEMS_PER_PAGE}
            numberingCount={5}
            onNavigate={handlePageChange}
          />
        </div>
      )}
    </>
  )
}
