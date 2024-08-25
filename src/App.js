import { useState } from 'react'
import './App.css';
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import Formation from './components/Formation/Formation'
import Reishi from './components/Reishi/Reishi'
import Cola from './components/Cola/Cola'
import Benefits from './components/Benefits/Benefits'
import Indications from './components/Indications/Indications'
import ProductContent from './components/ProductContent/ProductContent'


import icon1 from './assets/icons/icon_caps.svg'
import icon2 from './assets/icons/icon_ex100.svg'
import icon3 from './assets/icons/icon_ex30.svg'
import melenacaps from './assets/icons/Frame_878.png'
import melenaextract from './assets/icons/Frame_87.png'

import img1 from './assets/icons/icon_LM1.png'
import img2 from './assets/icons/icon_LM7.png'
import img3 from './assets/icons/icon_LM3.png'
import img4 from './assets/icons/icon_LM4.png'
import img5 from './assets/icons/icon_LM8.png'
import img6 from './assets/icons/icon_LM6.png'


const checkBoxes = [
  {
    id: '1',
    icon: icon1,
    text: 'Cápsulas',
    src: melenacaps,
  },
  {
    id: '2',
    icon: icon2,
    text: 'Extracto 100ml',
    src: melenaextract,
  },
  {
    id: '3',
    icon: icon3,
    text: 'Extracto 30ml',
    src: melenaextract,
  },
]

const melenaBenefitsHeaderData = [
  {
    title: 'DE LA MELENA DE LEÓN',
    description1: `Conocida como "La seta inteligente", Lion's Mane es una opción ideal para cualquiera que busque apoyo cognitivo, memoria y estado de ánimo.`,
    description2: `Reconocida desde hace mucho tiempo por apoyar el sistema nervioso, los estudios han demostrado que la melena de león puede aumentar el factor de crecimiento nervioso.`,
  }
]

const melenaBenefitsCardsData = [
  {
    src: img1,
    description: 'Elimina la ansiedad y la irritabilidad'
  },
  {
    src: img2,
    description: 'Mejora de la inmunidad'
  },
  {
    src: img3,
    description: 'Induce sueños vívidos e intensos'
  },
  {
    src: img4,
    description: 'Mejora la memoria y la concentración'
  },
  {
    src: img5,
    description: 'Prevención de enfermedades del tracto gastrointestinal'
  },
  {
    src: img6,
    description: 'Aumenta la creatividad'
  },
]

const indicationsMelenaData = [
  {
    indication1: '20 ml dos veces al día 30 minutos antes de las comidas.',
    indication2: 'Este polvo biodisponible tiene un perfil de sabor suave y se puede mezclar con su bebida o receta de comida favorita.',
    caution: ' si tiene una condición médica, está tomando medicamentos o está embarazada o amamantando, consulte a un profesional de la salud antes de usar este producto. Mantener fuera del alcance de los niños.'
  }
]

function App() {
  const [displayingItem, setDisplayingItem] = useState('1')

  return (
    <>
      <HeaderComponent setDisplayingItem={setDisplayingItem} />

      {displayingItem === '1' && (
        <ProductContent 
          checkBoxes={checkBoxes}
          melenaBenefitsHeaderData={melenaBenefitsHeaderData}
          melenaBenefitsCardsData={melenaBenefitsCardsData}
          indicationsMelenaData={indicationsMelenaData}
        />
      )}

      {displayingItem === '2' && <Reishi />}
      {displayingItem === '3' && <Cola />}
    </>
  );
}

export default App;
