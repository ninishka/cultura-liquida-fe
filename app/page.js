"use client"

import { useContext } from 'react'
import CartContext from './contexts/cartContext/cartContext'
import ProductContent from './components/ProductContent/ProductContent'
import HowTo from './components/HowTo/HowTo'
import Complex from './components/Complex/Complex'
import ModalComponent from './components/ModalComponent/ModalComponent'
import { productContentComponents } from './data'
import IfQuestions from './components/IfQuestions/IfQuestions'

function groupObjectsByTitle(arr) {
  // Группируем объекты по title
  const grouped = arr.reduce((acc, obj) => {
    if (!acc[obj.title]) {
      acc[obj.title] = [];
    }
    acc[obj.title].push(obj);
    return acc;
  }, {});

  return Object.keys(grouped).map(title => ({
    // title,
    bdData: grouped[title]
  }));
}

const getActiveComponent = (selectedItem, grouping, data) => {
  const staticData = productContentComponents?.find(({ itemNumber }) => itemNumber === selectedItem)
  const dynamicData = grouping?.find((item, index) => `${index + 1}` === selectedItem)

  const newFormationData = staticData?.formationData?.map(fItem => {
    let matchingBdItem;
  
    if (fItem?.type === 'extracts') {
      matchingBdItem = dynamicData?.bdData?.find(bItem => 
        bItem?.type === fItem.type && bItem.size === fItem.size
      );
    } else {
      matchingBdItem = dynamicData?.bdData?.find(bItem => bItem?.type === fItem.type);
    }
  
    if (matchingBdItem) {
      return { ...fItem, ...matchingBdItem };
    }
  
    return fItem;
  });
  
  
  const combinedData2 = { ...staticData, formationData: newFormationData }

  return combinedData2
}

export default function Home() {
  const { displayingItem, showCart, data } = useContext(CartContext)
  const grouping = groupObjectsByTitle(data);

  return (
      <main>
        {showCart && <ModalComponent />}
        <ProductContent
          key={displayingItem}
          {...getActiveComponent(displayingItem, grouping)}
        />
        <HowTo soe='joi' />
        <Complex something='something'/>
        <IfQuestions something='something'/>
      </main>
  )
}
