import { useState } from 'react'
import { useScene } from '@providers/SceneProvider'
import { useMeQuery } from '@hooks/queries/authQueries'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ChatInputProps {
  inputRef: React.RefObject<HTMLInputElement>
}

function ChatInput({ inputRef }: ChatInputProps) {
  const { data: me } = useMeQuery()

  const { id: roomId } = useParams()

  const gameScene = useScene()

  const player = gameScene.player

  const ChatManager = gameScene.chat

  const [inputValue, setInputValue] = useState('')

  const { t } = useTranslation()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }

  const handleBlur = () => {
    gameScene.enableKeys()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!me) return
    if (!roomId) return
    if (!inputValue) {
      inputRef.current?.blur()
    } else {
      ChatManager.sendChat({
        message: inputValue,
        roomNum: roomId,
        sender: player.nickname.text,
      })

      inputRef.current?.blur()
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t('game.chat.input_placeholder')}
        autoComplete="off"
        className="w-full bg-transparent px-4 py-2 outline-none placeholder:text-black"
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </form>
  )
}

export default ChatInput
