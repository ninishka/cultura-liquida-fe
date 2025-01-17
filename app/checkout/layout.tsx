'use client'

import React, { ReactNode } from 'react';
import { Suspense } from 'react'

export default function Layout({ children }: { children: ReactNode } ) {
  return (
    <Suspense>
      {children}
    </Suspense>
  );
}