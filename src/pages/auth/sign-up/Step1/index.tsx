import FadeIn from '@components/Animation/FadeIn'
import Button from '@components/Button'
import RhfCheckbox from '@components/Rhf/RhfCheckbox'
import { StepProps } from '@components/StepFlow/types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useModal } from '@providers/ModalProvider'
import TermsModal from './TermsModal'
import PrivacyModal from './PrivacyModal'
import { Link } from 'react-router-dom'
import Icon from '@components/Icon'
import CheckBox from '@components/CheckBox'

export default function Step1({ onNext }: StepProps) {
  const { watch, setValue, trigger } = useFormContext()

  const { addModal, removeModal } = useModal()

  const termsOfService = watch('termsOfService')

  const privacyPolicy = watch('privacyPolicy')

  const handleSelectAll = () => {
    const allChecked = termsOfService && privacyPolicy
    setValue('termsOfService', !allChecked)
    setValue('privacyPolicy', !allChecked)
  }

  const handleTermsLink = () => {
    addModal(<TermsModal hasDim onClose={removeModal} />)
  }

  const handlePrivacyLink = () => {
    addModal(<PrivacyModal hasDim onClose={removeModal} />)
  }

  const goNext = async () => {
    if (!onNext) return

    const isTermsValid = await trigger('termsOfService')
    const isPrivacyValid = await trigger('privacyPolicy')

    if (isTermsValid && isPrivacyValid) {
      onNext()
    }
  }

  return (
    <FadeIn>
      <div className="mb-6">
        <div className="rounded-md border border-gray-200 p-4">
          <div className="pb-3">
            <CheckBox
              checked={termsOfService && privacyPolicy}
              onClick={handleSelectAll}
              className="py-2"
            >
              <span className="text-body2 font-semibold text-gray-900">
                전체 동의
              </span>
            </CheckBox>
          </div>

          <div className="flex flex-col border-t border-gray-200 pt-3 text-body2">
            <RhfCheckbox name="termsOfService" className="py-2">
              <span>
                <button
                  type="button"
                  onClick={handleTermsLink}
                  className="font-semibold underline"
                >
                  이용약관
                </button>
                에 동의합니다.
                <span className="text-red-500"> (필수)</span>
              </span>
            </RhfCheckbox>
            <RhfCheckbox name="privacyPolicy" className="py-2">
              <span>
                <button
                  type="button"
                  onClick={handlePrivacyLink}
                  className="font-semibold underline"
                >
                  개인정보처리방침
                </button>
                에 동의합니다.
                <span className="text-red-500"> (필수)</span>
              </span>
            </RhfCheckbox>
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="contained"
        size="lg"
        fullWidth
        className="mb-4"
        onClick={goNext}
      >
        다음
      </Button>

      <div className="flex justify-center text-caption">
        <Link to={'/login'} className="flex items-center gap-1">
          <Icon iconName="IconChevronLeft" className="size-3" />
          로그인 페이지로 돌아가기
        </Link>
      </div>
    </FadeIn>
  )
}
