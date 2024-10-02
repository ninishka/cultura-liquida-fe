"use client"

import { useContext } from 'react'
import { AirtableProvider } from './contexts/airtableContext/airtableProvider'
import CartProvider from './contexts/cartContext/cartProvider'

import CartContext from './contexts/cartContext/cartContext'
import ProductContent from './components/ProductContent/ProductContent'
// import FormikContext from './components/FormikContext/FormikContext'
import HowTo from './components/HowTo/HowTo'
import Complex from './components/Complex/Complex'
import Modal from './components/Modal/Modal'
import { productContentComponents } from './data'

const getActiveComponent = selectedItem => {
  return productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
}

export default function Home() {
  const { displayingItem, showCart } = useContext(CartContext)

  return (
    <AirtableProvider>
      <main>
        {/* <CartProvider> */}
          {showCart && <Modal />}
        {/* </CartProvider> */}
        <ProductContent
          key={displayingItem}
          {...getActiveComponent(displayingItem)}
        />
        <HowTo soe='joi' />
        <Complex something='something'/>
      </main>
    </AirtableProvider>

  )
}
