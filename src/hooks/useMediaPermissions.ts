import { useEffect, useState, useCallback } from 'react'

type PermissionState = 'granted' | 'denied' | 'prompt'

type MediaErrorType =
  | 'NotFoundError'
  | 'NotAllowedError'
  | 'NotReadableError'
  | 'UnknownError'

type MediaErrorHandler = (
  type: MediaErrorType,
  device: 'camera' | 'microphone',
) => void

type UseMediaPermissionsParams = {
  onError?: MediaErrorHandler
}

type DeviceType = 'camera' | 'microphone'

export default function useMediaPermissions({
  onError,
}: UseMediaPermissionsParams = {}) {
  const [permissions, setPermissions] = useState<{
    camera: PermissionState
    microphone: PermissionState
  }>({
    camera: 'prompt',
    microphone: 'prompt',
  })

  const updatePermissionState = useCallback(async (device: DeviceType) => {
    try {
      const permission = await navigator.permissions.query({ name: device })

      setPermissions((prev) => ({ ...prev, [device]: permission.state }))
    } catch (error) {
      console.error(`Error querying ${device} permission:`, error)
    }
  }, [])

  const handleToggle = useCallback(
    async (device: DeviceType, enabled: boolean) => {
      if (enabled) {
        try {
          const constraints =
            device === 'camera' ? { video: true } : { audio: true }

          const stream = await navigator.mediaDevices.getUserMedia(constraints)

          stream.getTracks().forEach((track) => track.stop())

          await updatePermissionState(device)
        } catch (error) {
          console.error(`Error requesting ${device} permission:`, error)
          await updatePermissionState(device)

          if (error instanceof DOMException) {
            const errorType = (error.name as MediaErrorType) || 'UnknownError'
            onError?.(errorType, device)
          } else {
            onError?.('UnknownError', device)
          }
        }
      } else {
        await updatePermissionState(device)
      }
    },
    [onError, updatePermissionState],
  )

  const toggleCamera = useCallback(
    (enabled: boolean) => handleToggle('camera', enabled),
    [handleToggle],
  )

  const toggleMicrophone = useCallback(
    (enabled: boolean) => handleToggle('microphone', enabled),
    [handleToggle],
  )

  useEffect(() => {
    const updatePermissions = async () => {
      try {
        const camera = await navigator.permissions.query({ name: 'camera' })
        const mic = await navigator.permissions.query({ name: 'microphone' })

        setPermissions({
          camera: camera.state,
          microphone: mic.state,
        })

        camera.onchange = () =>
          setPermissions((prev) => ({ ...prev, camera: camera.state }))
        mic.onchange = () =>
          setPermissions((prev) => ({ ...prev, microphone: mic.state }))
      } catch (error) {
        console.log(error)
      }
    }

    updatePermissions()
  }, [])

  return {
    permissions,
    toggleCamera,
    toggleMicrophone,
  }
}
