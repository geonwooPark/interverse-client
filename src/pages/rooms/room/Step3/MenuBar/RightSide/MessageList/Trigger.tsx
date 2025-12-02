import React, { useEffect, useState } from 'react'
import { motion as m } from 'motion/react'
import { ToolTip } from 'ventileco-ui'
import Icon from '@components/Icon'
import Badge from './Badge'
import { useTranslation } from 'react-i18next'

interface TriggerProps {
  onClick: () => void
  hasNewAlarm: boolean
}

export default function Trigger({ onClick, hasNewAlarm }: TriggerProps) {
  const { t } = useTranslation()

  const [isShaking, setIsShaking] = useState(false)

  const handleClick = () => {
    onClick()
    setIsShaking(true)
  }

  useEffect(() => {
    if (!isShaking) return

    const timer = setTimeout(() => setIsShaking(false), 400)

    return () => clearTimeout(timer)
  }, [isShaking])

  return (
    <ToolTip direction="bottom" enterDelay={1000}>
      <ToolTip.Trigger>
        <m.div
          animate={
            isShaking ? { rotate: [0, -10, 10, -10, 10, 0] } : { rotate: 0 }
          }
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={handleClick}
            className="group relative flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 px-3.5 py-2.5 text-white shadow-lg transition-all duration-200 hover:from-gray-700 hover:to-gray-800 hover:shadow-xl active:scale-95"
          >
            <div className="pointer-events-none relative">
              <Icon
                iconName="IconEvelope"
                className="size-5 transition-transform group-hover:scale-110"
              />
              {hasNewAlarm && (
                <Badge className="absolute right-[-4px] top-[-2px]" />
              )}
            </div>
            {hasNewAlarm && (
              <span className="absolute inset-0 animate-pulse rounded-lg bg-cyan-500/20" />
            )}
          </button>
        </m.div>
      </ToolTip.Trigger>
      <ToolTip.Content>
        <div className="rounded bg-white px-2 py-1 text-caption">
          {t('rooms.room.controller.dm')}
        </div>
        <ToolTip.Triangle className="size-2.5 bg-white" />
      </ToolTip.Content>
    </ToolTip>
  )
}
