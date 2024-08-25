import { useState } from 'react'
import './App.css';
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import Melena from './components/Melena/Melena'
import Reishi from './components/Reishi/Reishi'
import Cola from './components/Cola/Cola'
import MelenaBenefit from './components/MelenaBenefit/MelenaBenefit'
import Indications from './components/Indications/Indications'

function App() {
  const [displayingItem, setDisplayingItem] = useState('1')

  return (
    <>
      <HeaderComponent setDisplayingItem={setDisplayingItem} />
      {displayingItem === '1' && <Melena />}
      {displayingItem === '1' && <MelenaBenefit />}
      {displayingItem === '1' && <Indications />}
      {displayingItem === '2' && <Reishi />}
      {displayingItem === '3' && <Cola />}
    </>
  );
}

export default App;
