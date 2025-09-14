'use client'

import React, { ReactNode, Suspense } from 'react'
import Script from 'next/script'
import LoadingComponent from '@/app/components/LoadingComponent/LoadingComponent'
import { isProd } from '@/helpers/constants'

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {isProd && (
        <Script id="google-ads-conversion" strategy="beforeInteractive">
          {`
            gtag('event', 'conversion', {
              'send_to': 'AW-17259177669/Qa0tCPqUleIaEMXN6KVA',
              'transaction_id': ''
            });
          `}
        </Script>
      )}
      <Suspense fallback={<LoadingComponent fullScreen text="Cargando checkout..." />}>
        {children}
      </Suspense>
    </>
  )
}