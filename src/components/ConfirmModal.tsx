import { cn } from '@utils/cn'
import Button from './Button'
import ModalDim from './Modal/ModalDim'
import ModalTitle from './Modal/ModalTitle'

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
  return (
    <div className="fixed inset-0 h-screen w-screen">
      {/* Dim */}
      {hasDim && <ModalDim onClose={onClose} />}

      {/* Modal */}
      <div
        className={`absolute left-1/2 top-1/2 size-full h-fit w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white`}
      >
        <ModalTitle title={title} />

        <div className="mb-4 px-4">
          <p className="whitespace-pre-line text-body2 leading-normal">
            {description}
          </p>
        </div>

        <div className="flex justify-end gap-2 p-4">
          {hideLeftButton || (
            <Button size="md" variant="ghost" onClick={onClose}>
              {leftLabel || '닫기'}
            </Button>
          )}
          <Button
            size="md"
            variant="contained"
            onClick={onSubmit}
            className={cn('shadow-none', rightButtonClassName)}
          >
            {rightLabel || '확인'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
