import Button from '@components/Button'
import TextField from '@components/TextField'
import { useMeQuery } from '@hooks/queries/authQueries'
import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'ventileco-ui'

export default function ProfileSection() {
  const { t } = useTranslation()
  const { data: me } = useMeQuery()

  const [nickname, setNickname] = useState(me?.user?.nickname ?? '')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.info(t('setting.nickname_todo'))
  }

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <h6 className="mb-4 text-h6">{t('setting.profile_section_title')}</h6>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-2 block text-body2 text-gray-700">
            {t('setting.nickname_label')}
          </label>
          <TextField
            value={nickname}
            placeholder={t('setting.nickname_placeholder')}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <Button type="submit" size="md" variant="contained">
          {t('setting.nickname_submit')}
        </Button>
      </form>

      <p className="mt-2 text-caption text-gray-400">
        {t('setting.nickname_helper')}
      </p>
    </section>
  )
}
