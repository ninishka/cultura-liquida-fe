"use client"

import { useState, useContext } from 'react'
import styles from "./page.module.css";
import ProductContent from './components/ProductContent/ProductContent'
import CartContext from './contexts/cartContext/cartContext'
import HowTo from './components/HowTo/HowTo'
import Complex from './components/Complex/Complex'
import Modal from './components/Modal/Modal'

import { indicationsData, productContentComponents } from './data'

const getActiveComponent = selectedItem => {
  return productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
}

export default function Home() {
  const { cartItems, showModal } = useContext(CartContext) // context dont receive any info
  const [displayingItem, setDisplayingItem] = useState('1')

  return (
    <div>
      <main>
        {showModal && <Modal />}
        <ProductContent
          key={displayingItem}
          indicationsData={indicationsData}
          {...getActiveComponent(displayingItem)}
        />
        <HowTo soe='joi' />
        <Complex something='something'/>
      </main>
    </div>
  );
}
