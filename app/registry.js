'use client'
 
import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
 
export default function StyledRegistry({ children }) {
  const [styledSheet] = useState(() => new ServerStyleSheet())
 
  useServerInsertedHTML(() => {
    const styles = styledSheet.getStyleElement()
    styledSheet.instance.clearTag()
    return <>{styles}</>
  })
 
  if (typeof window !== 'undefined') return <>{children}</>
 
  return (
    <StyleSheetManager
     shouldForwardProp={['htmltype']} 
     sheet={styledSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}