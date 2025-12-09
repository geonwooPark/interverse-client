import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import i18n from '@locales/index'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.tz.setDefault('Asia/Seoul')

export default dayjs

export const formatDate = (date: string) => {
  const joinedDate = dayjs(date)
  const now = dayjs()
  const yesterday = now.subtract(1, 'day')

  // 1분 이하
  if (now.diff(joinedDate, 'minute') <= 1) {
    return i18n.t('common.date.just_now')
  }

  // 오늘 (같은 날)
  if (joinedDate.isSame(now, 'day')) {
    const diffMinutes = now.diff(joinedDate, 'minute')
    if (diffMinutes < 60) {
      return i18n.t('common.date.minutes_ago', { minutes: diffMinutes })
    }
    return i18n.t('common.date.hours_ago', {
      hours: now.diff(joinedDate, 'hour'),
    })
  }

  // 어제
  if (joinedDate.isSame(yesterday, 'day')) {
    return i18n.t('common.date.yesterday')
  }

  // 7일 이내
  const diffDays = now.diff(joinedDate, 'day')
  if (diffDays < 7) {
    return i18n.t('common.date.days_ago', { days: diffDays })
  }

  // 7일 이상
  return joinedDate.format('YYYY-MM-DD')
}
