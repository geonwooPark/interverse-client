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

function CreateRoomPage() {
  const navigate = useNavigate()

  const { mutate: createRoomMutate } = useCreateRoomMutation()

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      password: '',
      headCount: 4,
      mapId: undefined,
    },
  })

  const { handleSubmit, setValue, reset } = methods

  const onSubmit = handleSubmit(async (data) => {
    if (!data.mapId) return

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
        <h4 className="mb-4 text-center text-h4">새로운 방 만들기</h4>

        <MapSelector onChange={(map) => setValue('mapId', map)} />

        <FormProvider methods={methods}>
          <div className="mb-6 space-y-3 text-center">
            <RhfTextField type="text" name="title" placeholder="제목" />
            <RhfTextField
              type="password"
              name="password"
              placeholder="비밀번호"
            />
            <div className="flex items-center justify-end gap-4">
              <p className="text-body2">참여인원 </p>
              <RhfCounter name="headCount" />
            </div>
          </div>
        </FormProvider>

        <Button size="lg" variant="contained" fullWidth onClick={onSubmit}>
          생성하기
        </Button>
      </div>
    </div>
  )
}

export default CreateRoomPage
