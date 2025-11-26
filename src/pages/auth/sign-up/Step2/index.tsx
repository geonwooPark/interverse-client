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

export default function Step2({ onNext, onPrev }: StepProps) {
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
          <RhfTextField name="email" placeholder="이메일" />
          <Button
            type="button"
            size="lg"
            variant="ghost"
            disabled={!canResend}
            onClick={onVerifyClick}
            className="w-[96px] px-2"
          >
            인증하기
          </Button>
        </div>
        {isTimerActive && (
          <div>
            <TextField
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호"
              endIcon={<div className="mr-3">{timer}</div>}
              className="mb-2 w-full"
            />
            <div className="flex gap-1 px-3 py-2 text-caption">
              <p>인증번호가 전송되지 않으셨나요? </p>
              <button
                className="cursor-pointer font-semibold text-primary-dark"
                onClick={onResendClick}
              >
                다시 전송하기
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          fullWidth
          onClick={onPrev}
        >
          이전
        </Button>

        <Button
          type="button"
          variant="contained"
          size="lg"
          fullWidth
          onClick={goNext}
        >
          다음
        </Button>
      </div>
    </FadeIn>
  )
}
