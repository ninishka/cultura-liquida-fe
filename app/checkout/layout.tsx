'use client'

import React, { ReactNode } from 'react';
import Script from 'next/script'
import { Suspense } from 'react'

export default function Layout({ children }: { children: ReactNode } ) {
  return (
    <>
      <Script id="google-ads-conversion">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17259177669/Qa0tCPqUleIaEMXN6KVA',
            'transaction_id': ''
          });
        `}
      </Script>
      <Suspense>
        {children}
      </Suspense>
    </>
  );
}