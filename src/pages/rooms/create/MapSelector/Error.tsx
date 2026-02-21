import Button from '@components/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface MapSelectorErrorProps {
  onReset?: () => void
}

export default function MapSelectorError({ onReset }: MapSelectorErrorProps) {
  const { t } = useTranslation()

  return (
    <div className="mb-4 flex h-[300px] w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <p className="text-body2 text-gray-500">
          {t('rooms.create.map_load_error')}
        </p>
        <Button size="sm" variant="outlined" onClick={onReset}>
          {t('common.retry')}
        </Button>
      </div>
    </div>
  )
}
