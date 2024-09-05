import { useState } from 'react'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import ProductContent from './components/ProductContent/ProductContent'
import Modal from './components/Modal/Modal'
import { indicationsData, productContentComponents } from './data'

const getActiveComponent = selectedItem => {
  return productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
}

const App = () => {
  const [displayingItem, setDisplayingItem] = useState('1')
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <HeaderComponent setDisplayingItem={setDisplayingItem} setShowModal={setShowModal} />
      {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal} />
      )}
      <ProductContent
        key={displayingItem}
        indicationsData={indicationsData}
        {...getActiveComponent(displayingItem)}
      />
      <FooterComponent setDisplayingItem={setDisplayingItem} />
    </>
  );
}

export default App;
