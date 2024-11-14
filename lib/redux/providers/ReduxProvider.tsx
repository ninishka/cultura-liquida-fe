"use client";
import React, { useRef } from "react";

import {makeStore, AppStore} from "../store/store";
/* Core */
import {Provider} from "react-redux";

/* Instruments */

export const ReduxProvider = (props: React.PropsWithChildren) => {
      const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
    return <Provider store={storeRef.current}>{props.children}</Provider>;
};


// Этот компонент будет перерисовываться только один раз за запрос на сервере,
//  но может перерисовываться несколько раз на клиенте, если выше этого компонента 
// в дереве находятся клиентские компоненты с сохранением состояния 
// или если этот компонент также содержит другое изменяемое состояние, которое вызывает перерисовку.

// Любой компонент, который взаимодействует с хранилищем Redux 
// (создавая его, предоставляя его, считывая из него или записывая в него),
// должен быть клиентским компонентом. Это связано с тем, что для доступа к хранилищу требуется React Context 
// (Это Context API React 16.8 для передачи данных между компонентами без явного передачи пропсов),
// а контекст доступен только в клиентских компонентах.