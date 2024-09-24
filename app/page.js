"use client"

import { useState, useContext } from 'react'
import ProductContent from './components/ProductContent/ProductContent'
import CartContext from './contexts/cartContext/cartContext'
import HowTo from './components/HowTo/HowTo'
import Complex from './components/Complex/Complex'
import Modal from './components/Modal/Modal'
import { productContentComponents } from './data'
import Airtable from 'airtable'


const base =  new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}).base(process.env.NEXT_PUBLIC_APP_ID)

;['MELENA', 'REISHI', 'COLA'].forEach(i => {
  base(i).select({ view: "Grid view"}).all((err, records) => {
    if (!records) return

    records.forEach(record => {
      record.get('Name') && console.log(i, record.get('Name'), record.get('Amount'))
    })
  })
})


const getActiveComponent = selectedItem => {
  return productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
}

export default function Home() {
  const { displayingItem, showCart } = useContext(CartContext)

  return (
    <div>
      <main>
        {showCart && <Modal />}
        <ProductContent
          key={displayingItem}
          {...getActiveComponent(displayingItem)}
        />
        <HowTo soe='joi' />
        <Complex something='something'/>
      </main>
    </div>
  )
}
