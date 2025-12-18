import FadeIn from '@components/Animation/FadeIn'
import Button from '@components/Button'
import IconButton from '@components/IconButton'
import RhfTextField from '@components/Rhf/RhfTextField'
import React, { useReducer } from 'react'
import RhfProfileUploader from '@components/Rhf/RhfProfileUploader'
import { StepProps } from '@components/StepFlow/types'
import { useTranslation } from 'react-i18next'

export default function Step3({ onPrev }: StepProps) {
  const { t } = useTranslation()

  const [showPassword, setShowPassword] = useReducer((prev) => !prev, false)

  const [showConfirmPassword, setShowConfirmPassword] = useReducer(
    (prev) => !prev,
    false,
  )

  return (
    <FadeIn>
      <div className="mb-3 flex w-full flex-1 flex-col gap-3">
        <div className="flex flex-col items-center gap-2">
          <RhfProfileUploader name="profile" />
          <p className="text-caption text-gray-400">
            {t('auth.sign_up.step3.profile_caption')}
          </p>
        </div>

        <RhfTextField
          name="nickname"
          placeholder={t('auth.sign_up.step3.nickname_placeholder')}
        />
        <RhfTextField
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder={t('auth.sign_up.step3.password_placeholder')}
          endIcon={
            <IconButton
              iconName={showPassword ? 'IconEyeSlash' : 'IconEye'}
              className="text-grey"
              onClick={setShowPassword}
            />
          }
        />
        <RhfTextField
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder={t('auth.sign_up.step3.confirm_password_placeholder')}
          endIcon={
            <IconButton
              iconName={showConfirmPassword ? 'IconEyeSlash' : 'IconEye'}
              className="text-grey"
              onClick={setShowConfirmPassword}
            />
          }
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="ghost"
          size="md"
          fullWidth
          onClick={onPrev}
        >
          {t('auth.sign_up.step3.prev')}
        </Button>

        <Button type="submit" variant="contained" size="md" fullWidth>
          {t('auth.sign_up.step3.submit')}
        </Button>
      </div>
    </FadeIn>
  )
}
