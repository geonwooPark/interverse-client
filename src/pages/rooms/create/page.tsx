import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/Button'
import { useCreateRoomMutation } from '@hooks/mutations/roomsMutation'
import { paths } from '@routes/paths'
import Boundary from '@components/Boundary'
import Icon from '@components/Icon'
import MapSelectorLoading from './MapSelector/Loading'
import MapSelectorError from './MapSelector/Error'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import RhfTextField from '@components/Rhf/RhfTextField'
import FormProvider from '@components/Rhf/FormProvider'
import RhfCounter from '@components/Rhf/RhfCounter'
import { useTranslation } from 'react-i18next'
import { MapSelectorWithCaption } from './MapSelector'

function CreateRoomPage() {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { mutate: createRoomMutate } = useCreateRoomMutation()

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      password: '',
      headCount: 4,
      mapSrc: '',
    },
  })

  const { handleSubmit, setValue, reset, formState } = methods

  const onSubmit = handleSubmit(async (data) => {
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

        <FormProvider methods={methods}>
          <div className="mb-6 space-y-3 text-center">
            <Boundary
              LoadingFallback={<MapSelectorLoading />}
              ErrorFallback={MapSelectorError}
            >
              <MapSelectorWithCaption
                onChange={(map) => setValue('mapSrc', map)}
                caption={
                  formState.errors.mapSrc?.message && (
                    <div className="ml-2 mt-1 flex items-center gap-1 text-red-600">
                      <Icon iconName="IconExclamation" className="size-4" />
                      <p className="text-caption">
                        {formState.errors.mapSrc.message}
                      </p>
                    </div>
                  )
                }
              />
            </Boundary>

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
