import useToast from '@hooks/useToast'
import { isLoggedInStore } from '@store/index'
import { setLocalStorageItem } from '@utils/localStorage'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from 'ventileco-store'

export default function OAuthPage() {
  const navigate = useNavigate()

  const toast = useToast()

  const [, setIsLoggedIn] = useStore(isLoggedInStore, (state) => state)

  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')

  const message = searchParams.get('message')

  useEffect(() => {
    if (token && message) {
      toast.success(message)
      setLocalStorageItem('interverse_token', token)
      setIsLoggedIn(true)
      navigate('/')
    }
  }, [])

  return null
}
