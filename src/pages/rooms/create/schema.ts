import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string().required('방제목을 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
  headCount: yup.number().required(),
  mapId: yup.string().required(),
})
