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


const getActiveComponent = selectedItem => {
  return productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
}

export default function Home() {
  const { displayingItem, showCart } = useContext(CartContext)

  return (
    // <AirtableProvider>
      <main>
        {/* <CartProvider> */}
          {showCart && <ModalComponent />}
        {/* </CartProvider> */}
        <ProductContent
          key={displayingItem}
          {...getActiveComponent(displayingItem)}
        />
        <HowTo soe='joi' />
        <Complex something='something'/>
        <IfQuestions something='something'/>
      </main>
    // </AirtableProvider>

  )
}
