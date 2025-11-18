import { IconClose, IconUser } from '@assets/svgs'
import { CustomFile, FileUploader as VFileUploader } from 'ventileco-ui'

interface ProfileUploaderProps {
  value: CustomFile[]
  onChange: (files: CustomFile[]) => void
  onDelete: (e: React.MouseEvent, file: CustomFile) => void
}

export default function ProfileUploader({
  value,
  onChange,
  onDelete,
}: ProfileUploaderProps) {
  return (
    <div className="relative mx-auto size-40">
      <div className="size-full overflow-hidden rounded-full border border-gray-200">
        <VFileUploader
          value={value}
          onChange={onChange}
          accept={'image/*'}
          limit={1}
          onError={(error) => console.log(error.message)}
        >
          {({ isDragOver }) => (
            <div
              className={`
              flex size-full cursor-pointer items-center justify-center
              ${isDragOver && 'bg-blue-100 duration-200'}
            `}
            >
              {value.length > 0 ? (
                <img
                  src={value[0].preview}
                  className="size-full object-cover"
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
