import { cn } from '@utils/cn'
import Button from './Button'
import ModalDim from './Modal/ModalDim'
import ModalTitle from './Modal/ModalTitle'
import ModalBody from './Modal/ModalBody'
import ModalContainer from './Modal/ModalContainer'
import { useTranslation } from 'react-i18next'

interface ConfirmModalProps {
  title: string
  description: string
  leftLabel?: string
  rightLabel?: string
  rightButtonClassName?: string
  hasDim?: boolean
  onClose: () => void
  onSubmit: () => void
  hideLeftButton?: boolean
}

function ConfirmModal({
  title,
  description,
  leftLabel,
  rightLabel,
  rightButtonClassName,
  hasDim = true,
  onClose,
  onSubmit,
  hideLeftButton = false,
}: ConfirmModalProps) {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      {/* Dim */}
      {hasDim && <ModalDim onClose={onClose} />}

      {/* Modal */}
      <ModalContainer className="h-fit w-[360px]">
        <ModalTitle title={title} />

        <ModalBody>{description}</ModalBody>

        <div className="flex justify-end gap-2 p-4">
          {hideLeftButton || (
            <Button size="md" variant="ghost" onClick={onClose}>
              {leftLabel || t('common.close')}
            </Button>
          )}
          <Button
            size="md"
            variant="contained"
            onClick={onSubmit}
            className={cn('shadow-none', rightButtonClassName)}
          >
            {rightLabel || t('common.confirm')}
          </Button>
        </div>
      </ModalContainer>
    </div>
  )
}

export default ConfirmModal
