import Alert from './Alert'
import MenuBar from './MenuBar'
import Modals from './Modals'
import useMediaPermissions from '@hooks/useMediaPermissions'
import ConfirmModal from '@components/ConfirmModal'
import { useModal } from '@providers/ModalProvider'
import Controller from './Controller'
import SceneProvider from '@providers/SceneProvider'
import { useTranslation } from 'react-i18next'

export default function Step3() {
  const { addModal, removeModal } = useModal()

  const { t } = useTranslation()

  // 권한 받기
  useMediaPermissions({
    fallback: () =>
      addModal(
        <ConfirmModal
          title={t('rooms.room.step3.permission_title')}
          description={t('rooms.room.step3.permission_description')}
          onClose={removeModal}
          onSubmit={removeModal}
          hideLeftButton
        />,
      ),
  })

  return (
    <SceneProvider>
      <MenuBar />
      <Controller />
      <Alert />
      <Modals />
    </SceneProvider>
  )
}
