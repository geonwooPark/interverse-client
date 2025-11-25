import { IconChevronLeft, IconChevronRight } from '@assets/svgs'
import { useCharactersQuery } from '@hooks/queries/assetsQueries'

interface AvatarSelectorProps {
  texture: number
  onChange: (value: number) => void
}

function AvatarSelector({ texture, onChange }: AvatarSelectorProps) {
  const { data: characters } = useCharactersQuery()

  const charactersLength = characters?.length ?? 0

  const onLeftArrowClick = () => {
    if (texture > 0) {
      onChange(texture - 1)
    } else if (texture === 0) {
      onChange(charactersLength - 1)
    }
  }

  const onRightArrowClick = () => {
    if (texture < charactersLength - 1) {
      onChange(texture + 1)
    } else if (texture === charactersLength - 1) {
      onChange(0)
    }
  }

  return (
    <div className="relative w-full py-14">
      <div className="flex items-center justify-center gap-10">
        <IconChevronLeft
          className="size-6 cursor-pointer"
          onClick={onLeftArrowClick}
        />

        {Array.isArray(characters) &&
          charactersLength > 0 &&
          characters[texture] && (
            <div className="flex">
              <img
                src={characters[texture].source}
                alt={characters[texture].name}
                crossOrigin="anonymous"
                style={{
                  width: '32px',
                  height: '52px',
                  transform: 'scale(1.5)',
                  objectFit: 'none',
                  objectPosition: '-608px 0',
                }}
                onError={() => {
                  console.error(
                    'Failed to load image:',
                    characters[texture].source,
                  )
                }}
              />
            </div>
          )}

        <IconChevronRight
          className="size-6 cursor-pointer"
          onClick={onRightArrowClick}
        />
      </div>
    </div>
  )
}

export default AvatarSelector
