'use client'

import { useEffect } from 'react'
import { useLanguageStore } from '../utils/language'

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { setLanguage } = useLanguageStore()

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage === 'en' || storedLanguage === 'es' || storedLanguage === 'ru' || storedLanguage === 'zh') {
      setLanguage(storedLanguage)
    }
  }, [setLanguage])

  return <>{children}</>
}

