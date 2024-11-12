'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/redux/store/store'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

// Этот компонент будет перерисовываться только один раз за запрос на сервере,
//  но может перерисовываться несколько раз на клиенте, если выше этого компонента 
// в дереве находятся клиентские компоненты с сохранением состояния 
// или если этот компонент также содержит другое изменяемое состояние, которое вызывает перерисовку.

// Любой компонент, который взаимодействует с хранилищем Redux 
// (создавая его, предоставляя его, считывая из него или записывая в него),
// должен быть клиентским компонентом. Это связано с тем, что для доступа к хранилищу требуется React Context 
// (Это Context API React 16.8 для передачи данных между компонентами без явного передачи пропсов),
// а контекст доступен только в клиентских компонентах.

