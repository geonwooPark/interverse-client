import Button from '@components/Button'
import { useTranslation } from 'react-i18next'

interface SurveyModalProps {
  hasDim?: boolean
}

function SurveyModal({ hasDim = false }: SurveyModalProps) {
  const { t } = useTranslation()

  const handleClick = () => {
    window.open(
      'https://forms.gle/4eHQ4eCEokt2EgfQ6',
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="fixed inset-0 z-popover h-screen w-screen">
      {/* Dim */}
      {hasDim && <div className="size-full bg-black/30" />}

      {/* Modal */}
      <div className="absolute left-[50%] top-[50%] w-[480px] translate-x-[-50%] translate-y-[-50%] space-y-6 rounded-md bg-white p-6">
        <h4 className="text-subtitle1">{t('rooms.room.survey.title')}</h4>

        <p className="whitespace-pre-line">
          {t('rooms.room.survey.description')}
        </p>

        <p className="text-body2 text-gray-400">
          {t('rooms.room.survey.notice')}
        </p>

        <Button size="lg" variant="contained" fullWidth onClick={handleClick}>
          {t('rooms.room.survey.cta')}
        </Button>
      </div>
    </div>
  )
}

export default SurveyModal
