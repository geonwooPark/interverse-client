import Button from '@components/Button'
import Select from '@components/Select'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { getLocalStorageItem } from '@utils/localStorage'
import { LANGUAGE_OPTIONS, LANGUAGE_STORAGE_KEY } from '@constants/index'
import { setLanguage } from '@locales/index'

export default function LanguageSection() {
  const { t } = useTranslation()

  const [language, setLanguageState] = useState<'ko' | 'en' | 'ja'>(
    () =>
      (getLocalStorageItem(LANGUAGE_STORAGE_KEY) as 'ko' | 'en' | 'ja') || 'ko',
  )

  const handleApplyLanguage = () => {
    setLanguage(language)
  }

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <h6 className="mb-4 text-h6">{t('setting.language_section_title')}</h6>

      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end">
        <div className="flex-1">
          <label className="mb-2 block text-body2 text-gray-700">
            {t('setting.language_label')}
          </label>

          <Select
            value={language}
            onChange={(value) => {
              if (value === 'ko' || value === 'en' || value === 'ja') {
                setLanguageState(value)
              }
            }}
            options={LANGUAGE_OPTIONS}
          />
        </div>

        <Button
          type="button"
          size="md"
          variant="outlined"
          onClick={handleApplyLanguage}
        >
          {t('setting.language_submit')}
        </Button>
      </div>

      <p className="mt-2 text-caption text-gray-400">
        {t('setting.language_helper')}
      </p>
    </section>
  )
}
