import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import KO from './ko'
import EN from './en'
import JA from './ja'
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage'
import { LANGUAGE_STORAGE_KEY } from '@constants/index'

export const setLanguage = (lang: 'ko' | 'en' | 'ja') => {
  i18n.changeLanguage(lang)
  setLocalStorageItem(LANGUAGE_STORAGE_KEY, lang)
}

const getInitialLang = () => {
  const saved = getLocalStorageItem(LANGUAGE_STORAGE_KEY)
  if (saved === 'ko' || saved === 'en' || saved === 'ja') return saved

  const browser = navigator.language
  if (browser.startsWith('ko')) return 'ko'
  if (browser.startsWith('ja')) return 'ja'
  return 'en'
}

const initI18n = async () => {
  i18n.use(initReactI18next).init({
    resources: {
      ko: { translation: KO },
      en: { translation: EN },
      ja: { translation: JA },
    },
    lng: getInitialLang(),
    fallbackLng: {
      'ko-*': ['ko'],
      'en-*': ['en'],
      'ja-*': ['ja'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
}

initI18n()

export default i18n
