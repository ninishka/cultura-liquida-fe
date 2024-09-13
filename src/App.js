import { useState } from 'react'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import ProductContent from './components/ProductContent/ProductContent'
import Modal from './components/Modal/Modal'
import { indicationsData, productContentComponents } from './data'
import CartProvider from './contexts/cartContext/cartProvider'
import HowTo from './components/HowTo/HowTo'
import Complex from './components/Complex/Complex'

const getActiveComponent = selectedItem => {
  return productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
}

const App = () => {
  const [displayingItem, setDisplayingItem] = useState('1')
  const [showModal, setShowModal] = useState(false)

  return (
    <CartProvider>
      <HeaderComponent setDisplayingItem={setDisplayingItem} setShowModal={setShowModal} />
      {showModal && <Modal setShowModal={setShowModal} />}
      <ProductContent
        key={displayingItem}
        indicationsData={indicationsData}
        {...getActiveComponent(displayingItem)}
      />
      <HowTo soe='joi' />
      <Complex something='something'/>
      <FooterComponent setDisplayingItem={setDisplayingItem} />
    </CartProvider>
  )
}

export default App
