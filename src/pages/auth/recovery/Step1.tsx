import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Button from '@components/Button'
import FadeIn from '@components/Animation/FadeIn'
import useTimer from '@hooks/useTimer'
import TextField from '@components/TextField'
import { Link } from 'react-router-dom'
import RhfTextField from '@components/Rhf/RhfTextField'
import Icon from '@components/Icon'
import { StepProps } from '@components/StepFlow/types'
import {
  useCheckVerificationCode,
  useSendVerificationEmailMutation,
} from '@hooks/mutations/authMutations'
import { useTranslation } from 'react-i18next'

export default function Step1({ onNext }: StepProps) {
  const { t } = useTranslation()

  const {
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext()

  const { mutate: sendVerificationEmailMutate } =
    useSendVerificationEmailMutation()

  const { mutate: checkVerificationCodeMutate } = useCheckVerificationCode()

  const { timer, isTimerActive, canResend, activeTimer } = useTimer()

  const [code, setCode] = useState('')

  const goNext = async () => {
    if (!onNext) return

    const isEmailValid = await trigger('email')
    if (isEmailValid) {
      const email = getValues('email')

      checkVerificationCodeMutate(
        {
          email,
          code: Number(code),
        },
        {
          onSuccess() {
            onNext()
          },
        },
      )
    }
  }

  const onVerifyClick = async () => {
    const isEmailValid = await trigger('email')

    if (isEmailValid) {
      const email = getValues('email')

      sendVerificationEmailMutate(
        { email },
        {
          onSuccess: () => activeTimer(),
        },
      )
    }
  }

  const onResendClick = () => {
    activeTimer()
    onVerifyClick()
  }

  return (
    <FadeIn>
      <div className="mb-6">
        <div className="mb-3 flex items-start gap-2">
          <RhfTextField
            name="email"
            placeholder={t('auth.recovery.step1.email_placeholder')}
          />
          <Button
            type="button"
            variant="ghost"
            size="md"
            disabled={!canResend}
            onClick={onVerifyClick}
            className="w-[96px] px-2"
          >
            {t('auth.recovery.step1.verify')}
          </Button>
        </div>
        {isTimerActive && (
          <div>
            <TextField
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t('auth.recovery.step1.code_placeholder')}
              endIcon={<div className="mr-3">{timer}</div>}
              className="mb-2 w-full"
            />
            <div className="flex gap-1 px-3 py-2 text-caption">
              <p>{t('auth.recovery.step1.not_received')}</p>
              <button
                className="cursor-pointer font-semibold text-primary-dark"
                onClick={onResendClick}
              >
                {t('auth.recovery.step1.resend')}
              </button>
            </div>
          </div>
        )}
      </div>

      <Button
        type="button"
        size="md"
        variant="contained"
        fullWidth
        className="mb-4"
        onClick={goNext}
      >
        {t('auth.recovery.step1.next')}
      </Button>

      <div className="flex justify-center text-caption">
        <Link to={'/login'} className="flex items-center gap-1">
          <Icon iconName="IconChevronLeft" className="size-3" />
          {t('auth.recovery.step1.go_login')}
        </Link>
      </div>
    </FadeIn>
  )
}
