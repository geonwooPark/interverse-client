import { IconError, IconInfo, IconSuccess } from '@assets/svgs'
import { cn } from '@utils/cn'
import { useTranslation } from 'react-i18next'

const iconMap = {
  success: {
    progressBarColor: 'bg-green-500',
    icon: <IconSuccess className="size-5 shrink-0 text-green-400" />,
    titleKey: 'common.toast.success',
  },
  error: {
    progressBarColor: 'bg-red-500',
    icon: <IconError className="size-5 shrink-0 text-red-400" />,
    titleKey: 'common.toast.error',
  },
  info: {
    progressBarColor: 'bg-blue-500',
    icon: <IconInfo className="size-5 shrink-0 text-blue-400" />,
    titleKey: 'common.toast.info',
  },
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomToast({ toastItem, removeToast }: any) {
  const { t } = useTranslation()

  const { type, message, title, id } = toastItem

  const { progressBarColor, icon, titleKey } =
    iconMap[type as keyof typeof iconMap]

  const handleRemove = () => {
    removeToast(id)
  }

  return (
    <div className="relative flex w-[360px] cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-lg transition hover:scale-[1.01] hover:bg-gray-50">
      <span
        className={cn(
          'absolute inset-y-0 left-0 w-1 rounded-r-full',
          progressBarColor,
        )}
      />

      <div className="flex w-full items-start gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-gray-100">
          {icon}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <strong className="text-sm font-semibold text-gray-900">
            {title ?? t(titleKey)}
          </strong>
          <p className="line-clamp-2 break-words text-sm text-gray-600">
            {message}
          </p>
        </div>

        <button
          type="button"
          className="ml-auto rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
          onClick={(event) => {
            event.stopPropagation()
            handleRemove()
          }}
        >
          {t('common.toast.close')}
        </button>
      </div>
    </div>
  )
}
