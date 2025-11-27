import * as yup from 'yup'
import i18n from '@locales/index'

export const schema = yup.object().shape({
  email: yup
    .string()
    .required(() => i18n.t('validation.email_required'))
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      () => i18n.t('validation.email_invalid'),
    ),
  password: yup
    .string()
    .required(() => i18n.t('validation.password_required'))
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, () =>
      i18n.t('validation.password_pattern'),
    ),
})
