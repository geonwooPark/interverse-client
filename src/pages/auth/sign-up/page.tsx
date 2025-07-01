import { useState } from 'react'
import { schema } from './schema'
import FormProvider from '@components/Rhf/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import StepFlow from '@components/StepFlow'
import Step1 from './Step1'
import Step2 from './Step2'
import { useNavigate } from 'react-router-dom'
import { paths } from '@routes/paths'
import { useSignUpMutation } from '@hooks/mutations/authMutations'
import { CustomFile } from 'ventileco-ui'

function SignUpPage() {
  const navigate = useNavigate()

  const { mutate } = useSignUpMutation()

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      profile: [],
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  })

  const [activeStep, setActiveStep] = useState(0)

  const { handleSubmit } = methods

  const onSubmit = handleSubmit(async (data) => {
    const { confirmPassword, profile, ...rest } = data

    const formData = new FormData()

    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    if (profile?.[0]) {
      formData.append('profile', profile?.[0] as CustomFile)
    }

    mutate(formData, {
      onSuccess: () => {
        navigate(paths.login)
      },
    })
  })

  const onNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <h4 className="mb-4 text-center text-h4">회원가입</h4>

      <StepFlow activeStep={activeStep} onNext={onNext}>
        <Step1 />
        <Step2 />
      </StepFlow>
    </FormProvider>
  )
}

export default SignUpPage
