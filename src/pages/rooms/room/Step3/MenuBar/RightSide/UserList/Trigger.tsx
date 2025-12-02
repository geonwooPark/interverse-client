import Icon from '@components/Icon'
import React from 'react'
import { ToolTip } from 'ventileco-ui'
import { useTranslation } from 'react-i18next'

interface TriggerProps {
  headCount: number
  onClick: () => void
}

export default function Trigger({ headCount, onClick }: TriggerProps) {
  const { t } = useTranslation()

  return (
    <ToolTip direction="bottom" enterDelay={1000}>
      <ToolTip.Trigger>
        <button
          tabIndex={-1}
          onClick={onClick}
          className="group relative flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 px-3.5 py-2.5 text-white shadow-lg transition-all duration-200 hover:from-gray-700 hover:to-gray-800 hover:shadow-xl active:scale-95"
        >
          <Icon
            iconName="IconUsers"
            className="pointer-events-none size-5 transition-transform group-hover:scale-110"
          />
          <span className="pointer-events-none font-medium">{headCount}</span>
        </button>
      </ToolTip.Trigger>
      <ToolTip.Content>
        <div className="rounded bg-white px-2 py-1 text-caption">
          {t('rooms.room.controller.headcount')}
        </div>
        <ToolTip.Triangle className="size-2.5 bg-white" />
      </ToolTip.Content>
    </ToolTip>
  )
}
