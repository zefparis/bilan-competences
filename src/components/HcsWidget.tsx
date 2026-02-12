'use client'

import { useEffect } from 'react'

export function HcsWidget() {
  useEffect(() => {
    // Avoid double-injection
    if (document.querySelector('script[data-widget]')) return

    const script = document.createElement('script')
    script.src = 'https://hcs-widget-mvp.vercel.app/widget/v3/hcs-widget.js'
    script.async = true
    script.setAttribute('data-widget', 'qPtZJHNXf9CuP2LCLHNX8nkOlaFWq8tC')
    document.body.appendChild(script)

    return () => {
      try { document.body.removeChild(script) } catch {}
    }
  }, [])

  return null
}
