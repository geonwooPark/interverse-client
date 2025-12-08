import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import ko from 'dayjs/locale/ko'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale(ko)
dayjs.tz.setDefault('Asia/Seoul')

export default dayjs

export const formatDate = (date: string) => {
  const joinedDate = dayjs(date)
  const now = dayjs()
  const yesterday = now.subtract(1, 'day')

  // 1분 이하
  if (now.diff(joinedDate, 'minute') <= 1) {
    return '방금 전'
  }

  // 오늘 (같은 날)
  if (joinedDate.isSame(now, 'day')) {
    const diffMinutes = now.diff(joinedDate, 'minute')
    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`
    }
    return `${now.diff(joinedDate, 'hour')}시간 전`
  }

  // 어제
  if (joinedDate.isSame(yesterday, 'day')) {
    return '어제'
  }

  // 7일 이내
  const diffDays = now.diff(joinedDate, 'day')
  if (diffDays < 7) {
    return `${diffDays}일 전`
  }

  // 7일 이상
  return joinedDate.format('YYYY-MM-DD')
}
