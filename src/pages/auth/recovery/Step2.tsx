import FadeIn from '@components/Animation/FadeIn'
import Button from '@components/Button'
import IconButton from '@components/IconButton'
import RhfTextField from '@components/Rhf/RhfTextField'
import { StepProps } from '@components/StepFlow/types'
import React, { useReducer } from 'react'
import { useTranslation } from 'react-i18next'

export default function Step2({ onNext }: StepProps) {
  const { t } = useTranslation()

  const [showPassword, setShowPassword] = useReducer((prev) => !prev, false)

  const [showConfirmPassword, setShowConfirmPassword] = useReducer(
    (prev) => !prev,
    false,
  )

  return (
    <FadeIn>
      <div className="mb-3 flex w-full flex-1 flex-col gap-3">
        <RhfTextField
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder={t('auth.recovery.step2.password_placeholder')}
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
          placeholder={t('auth.recovery.step2.confirm_password_placeholder')}
          endIcon={
            <IconButton
              iconName={showConfirmPassword ? 'IconEyeSlash' : 'IconEye'}
              className="text-grey"
              onClick={setShowConfirmPassword}
            />
          }
        />
      </div>

      <Button type="submit" variant="contained" size="lg" fullWidth>
        {t('auth.recovery.step2.submit')}
      </Button>
    </FadeIn>
  )
}
