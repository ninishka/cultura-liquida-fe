import { useState, createContext } from 'react'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import ProductContent from './components/ProductContent/ProductContent'
import Modal from './components/Modal/Modal'
import { indicationsData, productContentComponents } from './data'

const getActiveComponent = selectedItem => {
  return productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
}

export const DataContext = createContext();


const App = () => {
  const [displayingItem, setDisplayingItem] = useState('1')
  const [showModal, setShowModal] = useState(false);
  const [choosedGood, setChoosedGood] = useState([]);
  
  return (
    <DataContext.Provider value={{ choosedGood, setChoosedGood }}>
      <HeaderComponent setDisplayingItem={setDisplayingItem} setShowModal={setShowModal} />
      {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal} />
      )}
      <ProductContent
        key={displayingItem}
        indicationsData={indicationsData}
        setChoosedGood={setChoosedGood}
        {...getActiveComponent(displayingItem)}
      />
      <FooterComponent setDisplayingItem={setDisplayingItem} />
    </DataContext.Provider>
  );
}

export default App;
