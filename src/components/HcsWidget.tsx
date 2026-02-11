'use client'

import Script from 'next/script'

export function HcsWidget() {
  return (
    <Script
      src="https://widget.hcs-u7.online/v3/hcs-widget.js"
      strategy="afterInteractive"
      async
      data-widget="HYtUigkEXGYU1cu8gzgTadzm2HjaOF7k"
    />
  )
}
