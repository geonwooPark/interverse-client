import IconButton from '@components/IconButton'
import OtherPlayer from '@games/avatars/OtherPlayer'

interface UserItemProps {
  user: OtherPlayer
  handleMessageModal: (id: string) => void
  isLast?: boolean
}

function UserItem({ user, handleMessageModal, isLast = false }: UserItemProps) {
  return (
    <li
      key={user.socketId}
      className={`group flex items-center justify-between px-5 py-3 transition-colors hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 ${
        isLast ? '' : 'border-b border-gray-100'
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          style={{
            backgroundImage: `url(${
              import.meta.env.VITE_ASSET
            }/characters/source/${user.texture.key}.png)`,
            backgroundSize: 'auto 48px',
            backgroundPosition: '-606px center',
            backgroundRepeat: 'no-repeat',
          }}
          className="size-10 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 shadow-sm transition-transform group-hover:scale-105 group-hover:border-cyan-300"
        />
        <p className="min-w-0 truncate text-body2 font-medium text-gray-800 group-hover:text-gray-900">
          {user.nickname.text}
        </p>
      </div>

      <IconButton
        iconName="IconMessage"
        className="size-5 shrink-0 text-gray-400 transition-all hover:scale-110 hover:text-cyan-600 active:scale-95"
        onClick={() => handleMessageModal(user.socketId as string)}
      />
    </li>
  )
}

export default UserItem
