'use client'

import React, { ReactNode } from 'react';
import Script from 'next/script'
import { Suspense } from 'react'

const isProd = process.env.NODE_ENV === 'production';

export default function Layout({ children }: { children: ReactNode } ) {
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
      <Suspense>
        {children}
      </Suspense>
    </>
  );
}