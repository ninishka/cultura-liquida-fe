import { useState } from 'react'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import ProductContent from './components/ProductContent/ProductContent'
import { indicationsData, productContentComponents } from './data'

const getActiveComponent = selectedItem => {
  return productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
}

const App = () => {
  const [displayingItem, setDisplayingItem] = useState('1')
  
  return (
    <>
      <HeaderComponent setDisplayingItem={setDisplayingItem} />
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
