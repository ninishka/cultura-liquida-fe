'use client'

import HowTo from '@/app/components/HowTo/HowTo'
import Complex from '@/app/components/Complex/Complex'
import IfQuestions from '@/app/components/IfQuestions/IfQuestions'

export default function Layout({ children }) {
    console.log('process.env.VERCEL_URL', process.env.VERCEL_URL)
    console.log('process.env.MONGODB_URI', process.env.MONGODB_URI)
    console.log('`https://${process.env.VERCEL_URL}`', `https://${process.env.VERCEL_URL}`)
    
    return (
      <div style={{ color: '#fff'}}>
        {children}
        <HowTo />
        <Complex />
        <IfQuestions />
      </div>
    );
  }