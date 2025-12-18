import Button from '@components/Button'
import ModalBody from '@components/Modal/ModalBody'
import ModalContainer from '@components/Modal/ModalContainer'
import ModalDim from '@components/Modal/ModalDim'
import ModalTitle from '@components/Modal/ModalTitle'
import { setLanguage } from '@locales/index'
import { useTranslation } from 'react-i18next'
import Select from '@components/Select'
import { useState } from 'react'
import { LANGUAGE_OPTIONS } from '@constants/index'

interface LanguageSelectModalProps {
  hasDim?: boolean
  onClose: () => void
}

export default function LanguageSelectModal({
  hasDim = true,
  onClose,
}: LanguageSelectModalProps) {
  const { t } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState<'ko' | 'en' | 'ja'>(
    'ko',
  )

  const handleSelect = (lang: 'ko' | 'en' | 'ja') => {
    setLanguage(lang)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-overlay flex h-screen w-screen items-center justify-center">
      {/* Dim */}
      {hasDim && <ModalDim onClose={onClose} />}

      {/* Modal */}
      <ModalContainer className="relative z-overlay flex w-[320px] flex-col rounded-md">
        <ModalTitle title={t('common.language_modal.title')} />

        <ModalBody className="px-4 pb-4 pt-0">
          <p className="mb-4 text-body2">
            {t('common.language_modal.description')}
          </p>

          <div className="flex flex-col gap-4">
            <Select
              value={selectedLanguage}
              onChange={(value) => {
                if (value === 'ko' || value === 'en' || value === 'ja') {
                  setSelectedLanguage(value)
                }
              }}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </Select>

            <Button
              type="button"
              size="md"
              variant="contained"
              onClick={() => handleSelect(selectedLanguage)}
            >
              {t('common.confirm')}
            </Button>
          </div>
        </ModalBody>
      </ModalContainer>
    </div>
  )
}
