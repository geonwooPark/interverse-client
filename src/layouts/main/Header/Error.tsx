import { IconRefresh } from '@assets/svgs'
import Button from '@components/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Error({ error, onReset }: any) {
  const { t } = useTranslation()

  return (
    <Button
      size="sm"
      variant="outlined"
      onClick={onReset}
      rightIcon={<IconRefresh className="ml-2 size-4" />}
      className="h-[48px] w-[120px]"
    >
      {t('common.retry')}
    </Button>
  )
}
