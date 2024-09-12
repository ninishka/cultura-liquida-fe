import { useState, createContext } from 'react'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import ProductContent from './components/ProductContent/ProductContent'
import Modal from './components/Modal/Modal'
import { indicationsData, productContentComponents } from './data'
import HowTo from './components/HowTo/HowTo'
import Complex from './components/Complex/Complex'



const getActiveComponent = selectedItem => {
  return productContentComponents.find(({ itemNumber }) => itemNumber === selectedItem)
}

export const DataContext = createContext()


const App = () => {
  const [displayingItem, setDisplayingItem] = useState('1')
  const [showModal, setShowModal] = useState(false)
  const [choosedGood, setChoosedGood] = useState([])
  const [ count, setCount ] = useState(1)

  return (
    <DataContext.Provider value={{ choosedGood, setChoosedGood, count, setCount }}>
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
    </DataContext.Provider>
  )
}

export default App
