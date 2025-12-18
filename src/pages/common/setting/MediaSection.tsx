import Switch from '@components/Switch'
import { useTranslation } from 'react-i18next'
import useMediaPermissions from '@hooks/useMediaPermissions'
import { toast } from 'ventileco-ui'

export default function MediaSection() {
  const { t } = useTranslation()

  const { permissions, toggleCamera, toggleMicrophone } = useMediaPermissions({
    onError: (errorType, device) => {
      const deviceKey = device === 'camera' ? 'camera' : 'microphone'

      if (errorType === 'NotFoundError') {
        toast.error(t(`setting.${deviceKey}_not_found`))
      } else if (errorType === 'NotAllowedError') {
        toast.error(t(`setting.${deviceKey}_permission_denied`))
      } else if (errorType === 'NotReadableError') {
        toast.error(t(`setting.${deviceKey}_not_readable`))
      } else {
        toast.error(t(`setting.${deviceKey}_error`))
      }
    },
  })

  const handleCameraToggle = (enabled: boolean) => {
    if (!enabled) {
      toast.info(t('setting.camera_disable_info'))
      return
    }
    toggleCamera()
  }

  const handleMicrophoneToggle = (enabled: boolean) => {
    if (!enabled) {
      toast.info(t('setting.microphone_disable_info'))
      return
    }
    toggleMicrophone()
  }

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <h6 className="mb-4 text-h6">{t('setting.media_section_title')}</h6>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <label className="text-body2 font-medium text-gray-700">
              {t('setting.camera_label')}
            </label>
            <p className="text-caption text-gray-400">
              {t('setting.camera_helper')}
            </p>
          </div>
          <Switch
            checked={permissions.camera === 'granted'}
            onChange={handleCameraToggle}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <label className="text-body2 font-medium text-gray-700">
              {t('setting.microphone_label')}
            </label>
            <p className="text-caption text-gray-400">
              {t('setting.microphone_helper')}
            </p>
          </div>
          <Switch
            checked={permissions.microphone === 'granted'}
            onChange={handleMicrophoneToggle}
          />
        </div>
      </div>
    </section>
  )
}
