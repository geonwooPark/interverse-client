import IconButton from '@components/IconButton'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProfileSection from './ProfileSection'
import LanguageSection from './LanguageSection'

export default function SettingPage() {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 tablet:gap-8 tablet:px-6 tablet:py-8">
      <header className="mb-1 flex items-center gap-2 tablet:mb-2 tablet:gap-3">
        <IconButton
          iconName="IconChevronLeft"
          className="size-6 tablet:size-8"
          aria-label={t('common.prev')}
          onClick={handleGoBack}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-h4 tablet:text-h3">{t('setting.title')}</h1>
          <p className="text-caption text-gray-500 tablet:text-body2">
            {t('setting.description')}
          </p>
        </div>
      </header>

      <ProfileSection />
      <LanguageSection />
    </main>
  )
}
