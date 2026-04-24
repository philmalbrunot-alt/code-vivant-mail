'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

export default function MetaPurchaseEvent() {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    if (typeof window === 'undefined') return
    if (!window.fbq) return

    fired.current = true

    window.fbq('track', 'Purchase', {
      value: 7,
      currency: 'EUR',
      content_name: 'Profil complet Code Vivant',
    })
  }, [])

  return null
}
