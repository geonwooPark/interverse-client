import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import { useCreateRoomMutation } from '@hooks/mutations/roomsMutation'
import { paths } from '@routes/paths'
import MapSelector from './MapSelector'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import RhfTextField from '@components/Rhf/RhfTextField'
import FormProvider from '@components/Rhf/FormProvider'
import RhfCounter from '@components/Rhf/RhfCounter'
import { useTranslation } from 'react-i18next'

function CreateRoomPage() {
  const navigate = useNavigate()

  const { mutate: createRoomMutate } = useCreateRoomMutation()

  const { t } = useTranslation()

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      password: '',
      headCount: 4,
      mapSrc: undefined,
    },
  })

  const { handleSubmit, setValue, reset } = methods

  const onSubmit = handleSubmit(async (data) => {
    if (!data.mapSrc) return

    createRoomMutate(data, {
      onSuccess: () => {
        reset()
        navigate(paths.rooms.root)
      },
    })
  })

  return (
    <div className="flex size-full items-center justify-center">
      {/* 생성 폼 */}
      <div className="relative z-10 mt-10 h-full w-[400px] rounded-3xl">
        <h4 className="mb-4 text-center text-h4">{t('rooms.create.title')}</h4>

        <MapSelector onChange={(map) => setValue('mapSrc', map)} />

        <FormProvider methods={methods}>
          <div className="mb-6 space-y-3 text-center">
            <RhfTextField
              type="text"
              name="title"
              placeholder={t('rooms.create.title_placeholder')}
            />
            <RhfTextField
              type="password"
              name="password"
              placeholder={t('rooms.create.password_placeholder')}
            />
            <div className="flex items-center justify-end gap-4">
              <p className="text-body2">{t('rooms.create.headcount_label')}</p>
              <RhfCounter name="headCount" />
            </div>
          </div>
        </FormProvider>

        <Button size="md" variant="contained" fullWidth onClick={onSubmit}>
          {t('rooms.create.submit')}
        </Button>
      </div>
    </div>
  )
}

export default CreateRoomPage
