"use client"

import { useContext } from 'react'
import { AirtableProvider } from './contexts/airtableContext/airtableProvider'
import CartProvider from './contexts/cartContext/cartProvider'

import CartContext from './contexts/cartContext/cartContext'
import ProductContent from './components/ProductContent/ProductContent'
// import FormikContext from './components/FormikContext/FormikContext'
import HowTo from './components/HowTo/HowTo'
import Complex from './components/Complex/Complex'
import ModalComponent from './components/ModalComponent/ModalComponent'
import { productContentComponents } from './data'
import IfQuestions from './components/IfQuestions/IfQuestions'

import Error from './error'

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


export default function Home() {
  const { displayingItem, showCart, data } = useContext(CartContext)
  const grouping = groupObjectsByTitle(data);

  const getActiveComponent = selectedItem => {
    const staticData = productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
    const dynamicData = grouping.find((item, index) => `${index + 1}` === selectedItem)
    const combinedData = { ...dynamicData, ...staticData }
    return combinedData
  }

  return (
      <main>
        {showCart && <ModalComponent />}
        <ProductContent
          key={displayingItem}
          {...getActiveComponent(displayingItem)}
        />
        <HowTo soe='joi' />
        <Complex something='something'/>
        <IfQuestions something='something'/>
      </main>
  )
}
