import * as yup from 'yup'
import i18n from '@locales/index'

export const schema = yup.object().shape({
  title: yup.string().required(() => i18n.t('validation.room_title_required')),
  password: yup
    .string()
    .required(() => i18n.t('validation.room_password_required')),
  headCount: yup.number().required(),
  mapSrc: yup.string().required(),
})
