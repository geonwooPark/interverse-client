import { useNavigate } from 'react-router-dom'
import { paths } from '@routes/paths'
import Button from '@components/Button'
import FadeIn from '@components/Animation/FadeIn'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import RhfTextField from '@components/Rhf/RhfTextField'
import FormProvider from '@components/Rhf/FormProvider'
import { useReducer } from 'react'
import IconButton from '@components/IconButton'
import { useLoginMutation } from '@hooks/mutations/authMutations'
import { IconGoogle } from '@assets/svgs'
import { useTranslation } from 'react-i18next'

function LoginPage() {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const { mutate: loginMutate } = useLoginMutation()

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, reset } = methods

  const [showPassword, setShowPassword] = useReducer((prev) => !prev, false)

  const login = handleSubmit(async (loginData) => {
    loginMutate(loginData, {
      onSuccess: () => {
        reset()
      },
    })
  })

  return (
    <FadeIn>
      <FormProvider methods={methods} onSubmit={login}>
        <div className="flex flex-col gap-8">
          <div>
            <h4 className="mb-4 text-center text-h4">
              {t('auth.login.title')}
            </h4>

            <div className="mb-3 flex w-full flex-1 flex-col gap-3">
              <RhfTextField
                type="email"
                name="email"
                placeholder={t('auth.login.email_placeholder')}
              />
              <RhfTextField
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder={t('auth.login.password_placeholder')}
                endIcon={
                  <IconButton
                    type="button"
                    iconName={showPassword ? 'IconEyeSlash' : 'IconEye'}
                    className="text-grey"
                    onClick={setShowPassword}
                  />
                }
              />
            </div>

            <div className="text-caption">
              <span className="mr-1">
                {t('auth.login.forgot_password_question')}
              </span>
              <button
                type="button"
                className="font-semibold text-cyan-600"
                onClick={() => navigate(paths.recovery)}
              >
                {t('auth.login.forgot_password')}
              </button>
            </div>
          </div>

          <div className="w-full space-y-4">
            <Button type="submit" size="md" variant="contained" fullWidth>
              {t('auth.login.submit')}
            </Button>

            <div className="h-[2px] w-full bg-gray-200" />

            <Button
              type="button"
              size="md"
              variant="ghost"
              fullWidth
              leftIcon={<IconGoogle className="size-5" />}
              className="gap-1"
              onClick={() =>
                (window.location.href = `${
                  import.meta.env.VITE_API_V1_SERVER
                }/auth/google`)
              }
            >
              {t('auth.login.google_login')}
            </Button>

            <div className="mt-4 text-center text-caption">
              {t('auth.login.first_visit_question')}{' '}
              <button
                className="text-caption font-semibold text-cyan-600"
                onClick={() => navigate(paths.sign_up)}
              >
                {t('auth.login.go_sign_up')}
              </button>
            </div>
          </div>
        </div>
      </FormProvider>
    </FadeIn>
  )
}

export default LoginPage
