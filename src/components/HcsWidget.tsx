'use client'

export function HcsWidget() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<script>(function(){var s=document.createElement("script");s.src="https://hcs-widget-mvp.vercel.app/widget/v3/hcs-widget.js";s.async=true;s.setAttribute("data-widget","HYtUigkEXGYU1cu8gzgTadzm2HjaOF7k");document.head.appendChild(s);})();</script>`,
      }}
    />
  )
}
