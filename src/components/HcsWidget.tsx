'use client'

import Script from 'next/script'

export function HcsWidget() {
  return (
    <Script
      id="hcs-widget"
      src="https://hcs-widget-mvp.vercel.app/widget/v3/hcs-widget.js"
      strategy="beforeInteractive"
      data-widget="HYtUigkEXGYU1cu8gzgTadzm2HjaOF7k"
    />
  )
}
