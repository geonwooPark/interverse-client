import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Button from '@components/Button'
import FadeIn from '@components/Animation/FadeIn'
import useTimer from '@hooks/useTimer'
import TextField from '@components/TextField'
import RhfTextField from '@components/Rhf/RhfTextField'
import { StepProps } from '@components/StepFlow/types'
import {
  useCheckIdMutation,
  useCheckVerificationCode,
  useSendVerificationEmailMutation,
} from '@hooks/mutations/authMutations'
import { useTranslation } from 'react-i18next'

export default function Step2({ onNext, onPrev }: StepProps) {
  const { t } = useTranslation()

  const { trigger, getValues } = useFormContext()

  const { mutate: checkIdMutate } = useCheckIdMutation()

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

      checkIdMutate(
        { email },
        {
          onSuccess: () => {
            sendVerificationEmailMutate(
              { email },
              {
                onSuccess: () => activeTimer(),
              },
            )
          },
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
            placeholder={t('auth.sign_up.step2.email_placeholder')}
          />
          <Button
            type="button"
            variant="ghost"
            size="md"
            disabled={!canResend}
            onClick={onVerifyClick}
            className="w-[96px] px-2"
          >
            {t('auth.sign_up.step2.verify')}
          </Button>
        </div>
        {isTimerActive && (
          <div>
            <TextField
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t('auth.sign_up.step2.code_placeholder')}
              endIcon={<div className="mr-3">{timer}</div>}
              className="mb-2 w-full"
            />
            <div className="flex gap-1 px-3 py-2 text-caption">
              <p>{t('auth.sign_up.step2.not_received')}</p>
              <button
                className="cursor-pointer font-semibold text-primary-dark"
                onClick={onResendClick}
              >
                {t('auth.sign_up.step2.resend')}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="ghost"
          size="md"
          fullWidth
          onClick={onPrev}
        >
          {t('auth.sign_up.step2.prev')}
        </Button>

        <Button
          type="button"
          variant="contained"
          size="md"
          fullWidth
          onClick={goNext}
        >
          {t('auth.sign_up.step2.next')}
        </Button>
      </div>
    </FadeIn>
  )
}
