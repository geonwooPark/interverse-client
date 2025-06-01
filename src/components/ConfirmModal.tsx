import { cn } from '@utils/cn'
import Button from './Button'

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
      {hasDim && <div onClick={onClose} className="size-full bg-black/70" />}

      {/* Modal */}
      <div
        className={`absolute left-[50%] top-[50%] size-full h-fit w-[360px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white`}
      >
        <div className="p-4">
          <p className="text-h6">{title}</p>
        </div>

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
