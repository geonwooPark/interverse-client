import Button from '@components/Button'
import ModalBody from '@components/Modal/ModalBody'
import ModalDim from '@components/Modal/ModalDim'
import ModalTitle from '@components/Modal/ModalTitle'
import ModalContainer from '@components/Modal/ModalContainer'
import { useTranslation } from 'react-i18next'

interface PrivacyModalProps {
  hasDim?: boolean
  onClose: () => void
}

export default function PrivacyModal({
  hasDim = true,
  onClose,
}: PrivacyModalProps) {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 z-overlay flex h-screen w-screen items-center justify-center">
      {/* Dim */}
      {hasDim && <ModalDim onClose={onClose} />}

      {/* Modal */}
      <ModalContainer className="flex h-screen w-full flex-col overflow-hidden rounded-none tablet:h-fit tablet:max-h-[80vh] tablet:w-[600px] tablet:max-w-[600px] tablet:rounded-md">
        <ModalTitle title={t('auth.privacy_modal.title')} onClose={onClose} />

        <ModalBody className="overflow-y-auto">
          {t('auth.privacy_modal.content')}
        </ModalBody>

        <div className="flex items-center justify-end border-t border-gray-200 p-4">
          <Button size="md" variant="contained" onClick={onClose}>
            {t('common.confirm')}
          </Button>
        </div>
      </ModalContainer>
    </div>
  )
}
