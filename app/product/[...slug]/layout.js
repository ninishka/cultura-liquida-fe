'use client'

import HowTo from '@/app/components/HowTo/HowTo'
import Complex from '@/app/components/Complex/Complex'
import IfQuestions from '@/app/components/IfQuestions/IfQuestions'

export default function Layout({ children }) {
    console.log('process.env.VERCEL_URL', process.env.VERCEL_URL)
    console.log('process.env', process.env)

    return (
      <div style={{ color: '#fff'}}>
        {children}
        <HowTo />
        <Complex />
        <IfQuestions />
      </div>
    );
  }