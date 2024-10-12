'use client'

import React, {  useState, useEffect } from 'react'
import { TitleH1, Description } from './styled'

export default function LazyComponent({ checkedState, data }) {
  const [localData, setLocalData] = useState(null)

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredData = data.find((item, index) => checkedState === `${index+1}`)
      setLocalData(filteredData)
    }
  }, [data, checkedState])

  if (!localData) {
    return <div>Loading...</div> // Не выбрасываем ошибку, а просто показываем текст загрузки
  }

  return (
    <>
      <TitleH1>{localData.title}</TitleH1>
      <Description>{localData.description}</Description>
    </>
  )
}
