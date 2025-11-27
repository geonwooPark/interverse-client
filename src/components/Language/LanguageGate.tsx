import { useEffect } from 'react'
import { useModal } from '@providers/ModalProvider'
import LanguageSelectModal from './LanguageSelectModal'
import { getLocalStorageItem } from '@utils/localStorage'
import { LANGUAGE_STORAGE_KEY } from '@constants/index'

export default function LanguageGate() {
  const { addModal, removeModal } = useModal()

  useEffect(() => {
    const saved = getLocalStorageItem(LANGUAGE_STORAGE_KEY)

    if (saved) return

    addModal(<LanguageSelectModal onClose={removeModal} />)
  }, [addModal, removeModal])

  return null
}
