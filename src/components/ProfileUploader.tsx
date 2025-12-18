import { IconClose, IconUser } from '@assets/svgs'
import { CustomFile, FileUploader as VFileUploader } from 'ventileco-ui'
import { toast } from 'ventileco-ui'
import { useTranslation } from 'react-i18next'
import Image from './Image'

interface ProfileUploaderProps {
  value: CustomFile[]
  onChange: (files: CustomFile[]) => void
  onDelete: (e: React.MouseEvent, file: CustomFile) => void
}

const MAX_FILE_SIZE = 2 * 1024 * 1024

export default function ProfileUploader({
  value,
  onChange,
  onDelete,
}: ProfileUploaderProps) {
  const { t } = useTranslation()

  const handleChange = (files: CustomFile[]) => {
    if (files.length > 0) {
      const file = files[0]
      if (file.size && file.size > MAX_FILE_SIZE) {
        toast.error(t('validation.file_size_exceeded'))
        return
      }
    }
    onChange(files)
  }

  const handleError = (error: Error) => {
    const errorMessage = error.message.toLowerCase()

    if (
      errorMessage.includes('size') ||
      errorMessage.includes('크기') ||
      errorMessage.includes('size')
    ) {
      toast.error(t('validation.file_size_exceeded'))
    } else {
      toast.error(t('validation.file_upload_error'))
    }
  }

  return (
    <div className="relative mx-auto size-40">
      <div className="size-full overflow-hidden rounded-full border border-gray-200">
        <VFileUploader
          value={value}
          onChange={handleChange}
          accept={'image/*'}
          limit={1}
          onError={handleError}
        >
          {({ isDragOver }) => (
            <div
              className={`
              flex size-full cursor-pointer items-center justify-center
              ${isDragOver && 'bg-blue-100 duration-200'}
            `}
            >
              {value.length > 0 ? (
                <Image
                  src={value[0].preview}
                  className="size-full object-cover"
                  alt="Profile"
                  loading="lazy"
                  ratio={1}
                />
              ) : (
                <IconUser className="size-8 text-grey" />
              )}
            </div>
          )}
        </VFileUploader>
      </div>

      {value.length > 0 && (
        <button
          onClick={(e) => onDelete(e, value[0])}
          className="absolute right-3 top-3 rounded-full border bg-white p-1 shadow-level2 duration-200 hover:bg-white/80"
        >
          <IconClose />
        </button>
      )}
    </div>
  )
}
