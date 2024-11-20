'use client'
import { usePathname } from 'next/navigation';

import React, { FC } from 'react'

const CheckoutPage: FC = () => {
  const pathname = usePathname()
  return (
    <div>
      CheckoutPage {pathname}
    </div>
  );
}

export default CheckoutPage