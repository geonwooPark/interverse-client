import { useEffect } from 'react'

type IParams = {
  fallback?: () => void
}

export default function useRequestMediaPermissions({ fallback }: IParams) {
  useEffect(() => {
    const requestMediaPermissions = async (): Promise<MediaStream | null> => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        stream.getTracks().forEach((track) => track.stop())

        return stream
      } catch (error) {
        fallback && fallback()

        return null
      }
    }

    requestMediaPermissions()
  }, [])

  return null
}
