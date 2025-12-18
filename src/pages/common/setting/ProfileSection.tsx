import Button from '@components/Button'
import FormProvider from '@components/Rhf/FormProvider'
import RhfProfileUploader from '@components/Rhf/RhfProfileUploader'
import RhfTextField from '@components/Rhf/RhfTextField'
import {
  useChangeNicknameMutation,
  useChangeProfileMutation,
} from '@hooks/mutations/authMutations'
import { useMeQuery } from '@hooks/queries/authQueries'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CustomFile } from 'ventileco-ui'

interface ProfileImageFormData {
  profile: CustomFile[]
}

interface NicknameFormData {
  nickname: string
}

export default function ProfileSection() {
  const { t } = useTranslation()

  const { data: me } = useMeQuery()

  const changeProfileMutation = useChangeProfileMutation()

  const changeNicknameMutation = useChangeNicknameMutation()

  const profileMethods = useForm<ProfileImageFormData>({
    defaultValues: {
      profile: [
        {
          preview: me?.user?.profile ?? '',
        } as CustomFile,
      ],
    },
  })

  const nicknameMethods = useForm<NicknameFormData>({
    defaultValues: {
      nickname: me?.user?.nickname ?? '',
    },
  })

  const onProfileSubmit = profileMethods.handleSubmit(async (data) => {
    const { profile } = data

    const formData = new FormData()

    if (profile?.[0]) {
      formData.append('profile', profile[0] as CustomFile)
    }

    changeProfileMutation.mutate(formData, {
      onSuccess: (result) => {
        const newProfile =
          (result as { data?: { user?: { profile?: string } } })?.data?.user
            ?.profile ??
          me?.user?.profile ??
          ''
        profileMethods.reset({
          profile: [
            {
              preview: newProfile,
            } as CustomFile,
          ],
        })
      },
    })
  })

  const onNicknameSubmit = nicknameMethods.handleSubmit(async (data) => {
    const { nickname } = data

    changeNicknameMutation.mutate(
      { nickname },
      {
        onSuccess: () => {
          nicknameMethods.reset({ nickname })
        },
      },
    )
  })

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <h6 className="mb-4 text-h6">{t('setting.profile_section_title')}</h6>

      {/* 프로필 이미지 업로드  */}
      <FormProvider methods={profileMethods} onSubmit={onProfileSubmit}>
        <div className="mb-6 flex flex-col items-center gap-4">
          <RhfProfileUploader name="profile" />

          <p className="text-caption text-gray-400">
            {t('auth.sign_up.step3.profile_caption')}
          </p>

          {profileMethods.formState.isDirty && (
            <Button type="submit" size="md" variant="contained">
              {t('setting.profile_submit')}
            </Button>
          )}
        </div>
      </FormProvider>

      {/* 닉네임 변경  */}
      <FormProvider methods={nicknameMethods} onSubmit={onNicknameSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-body2 text-gray-700">
              {t('setting.nickname_label')}
            </label>
            <RhfTextField
              name="nickname"
              placeholder={t('setting.nickname_placeholder')}
            />
          </div>

          <Button type="submit" size="md" variant="contained">
            {t('setting.nickname_submit')}
          </Button>
        </div>

        <p className="mt-2 text-caption text-gray-400">
          {t('setting.nickname_helper')}
        </p>
      </FormProvider>
    </section>
  )
}
