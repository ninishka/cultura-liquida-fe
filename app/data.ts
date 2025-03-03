import icon1 from './icons/icon_caps.svg'
import icon2 from './icons/icon_ex100.svg'
import icon3 from './icons/icon_ex30.svg'
import melenacaps from './icons/main-mc.png'
import melenaextract from './icons/main-me.png'

import img1 from './icons/icon_LM1.svg'
import img2 from './icons/icon_LM7.svg'
import img3 from './icons/icon_LM3.svg'
import img4 from './icons/icon_LM4.svg'
import img5 from './icons/icon_LM8.svg'
import img6 from './icons/icon_LM6.svg'

import indicationsMelena from './icons/icon_indications_for_the_use.png'
import indicationsReishi from './icons/icon_indications_for_the_use_R.png'
import indicationsCola from './icons/icon_indications_for_the_use_C.png'

import reishiextract from './icons/main-r.png'
import imgR1 from './icons/icon_LR1.svg'
import imgR3 from './icons/icon_LR2.svg'
import imgR4 from './icons/icon_LR3.svg'
import imgR6 from './icons/icon_LR4.svg'

import colaextract from './icons/main-c.png'
import imgC1 from './icons/icon_LC1.svg'
import imgC2 from './icons/icon_LC2.svg'
import imgC4 from './icons/icon_LC5.svg'
import imgC5 from './icons/icon_LC4.svg'

import HowTo from './icons/icon_step1.svg'
import imgC6 from './icons/icon_step2.svg'
import imgC7 from './icons/icon_step3.svg'
import imgC8 from './icons/icon_step4.svg'

import imgC10 from './icons/icon_ex30.svg'
import imgC11 from './icons/icon_ex100.svg'

const melenaFormationData = [
  {
    id: '1',
    icon: icon1,
    src: melenacaps,
    // iconSrc: melenaCapsulsSrc,
    url: 'melena-de-leon',
    title: 'Melena de León',
    description: 'Cuerpo fructífero de hongos y micelio de Hericium erinaceus.',

    type: 'capsules',
  },
  {
    id: '2',
    icon: icon2,
    src: melenaextract,
    // iconSrc: melenaExtractSrc,
    url: 'melena-de-leon',
    title: 'Melena de León',
    description: 'Cuerpo fructífero de hongos y micelio de Hericium erinaceus.',

    type: 'extracts',
    size: '100ml',
  },
  {
    id: '3',
    icon: icon3,
    src: melenaextract,
    // iconSrc: melenaExtractSrc,
    url: 'melena-de-leon',
    title: 'Melena de León',
    description: 'Cuerpo fructífero de hongos y micelio de Hericium erinaceus.',

    type: 'extracts',
    size: '30ml',
  },
]

const melenaBenefitsHeaderData = [
  {
    title: 'DE LA MELENA DE LEÓN',
    description1: `Conocida como 'La seta inteligente', la Melena de León es ideal para quienes buscan mejorar su rendimiento cognitivo, memoria y estado de ánimo.`,
    description2: `Reconocida desde hace mucho tiempo por apoyar el sistema nervioso, los estudios han demostrado que la melena de león puede aumentar el factor de crecimiento nervioso.`,
  }
]

const melenaBenefitsCardsData = [
  {
    src: img1,
    description: 'Ayuda a reducir la ansiedad y la irritabilidad'
  },
  {
    src: img2,
    description: 'Fortalece el sistema inmunológico'
  },
  {
    src: img3,
    description: 'Apoya la salud cognitiva y neuronal'
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

export const indicationsData = [
  {
    indication1: '20 ml dos veces al día 30 minutos antes de las comidas.',
    indication2: 'Este extracto es de fácil absorción y puede mezclarse con agua o su bebida favorita.',
    caution: ' Si está tomando medicamentos o tiene una condición médica, consulte a su médico antes de usar este producto.'
  }
]

// ===================== //

const reishiFormationData = [
  {
    id: '1',
    icon: icon2,
    src: reishiextract,
    url: 'reishi',
    title: 'Reishi',
    description: 'Cuerpo fructífero de hongos y micelio de Ganoderma lucidum.',
    
    type: 'extracts',
    size: '100ml',
    // iconSrc: reishiSrc,
  },
  {
    id: '2',
    icon: icon3,
    src: reishiextract,
    url: 'reishi',
    title: 'Reishi',
    description: 'Cuerpo fructífero de hongos y micelio de Ganoderma lucidum.',

    type: 'extracts',
    size: '30ml',
    // iconSrc: reishiSrc,
  },
]

const reishiBenefitsHeaderData = [
  {
    title: 'DE LA REISHI',
    description1: `El Reishi ha sido utilizado durante siglos por sus potentes beneficios para la salud. Rico en polisacáridos, triterpenoides y antioxidantes, el Reishi fortalece el sistema inmunológico, apoya la salud cardiovascular y mejora el bienestar general. A diferencia de otros remedios, el Reishi se destaca por su falta de efectos secundarios y su amplia gama de compuestos naturales que favorecen la salud.`,
    description2: `El extracto de hongo Reishi es un producto natural único. Tiene una amplia gama de efectos en el cuerpo humano debido a su rica composición química. Vitaminas, polisacáridos, micro y macroelementos, proteínas, grasas, ácidos: todas estas sustancias están contenidas en el extracto.`,
  }
]

const reishiBenefitsCardsData = [
  {
    src: imgR1,
    description: 'Apoya el metabolismo y el control del peso'
  },
  {
    src: img2,
    description: 'Fortalece el sistema inmunológico'
  },
  {
    src: imgR3,
    description: 'Apoya la salud cardiovascular'
  },
  {
    src: img5,
    description: 'Apoya la salud gastrointestinal y reduce la inflamación'
  },
  {
    src: imgR4,
    description: 'Reduce la fatiga y mejora el bienestar general'
  },
  {
    src: imgR6,
    description: 'Rico en compuestos bioactivos y antioxidantes'
  },
]

// ======================= //

const colaFormationData = [
  {
    id: '1',
    icon: icon2,
    src: colaextract,
    url: 'cola-de-pavo',
    title: 'Cola de Pavo',
    description: 'Cuerpo fructífero de hongos y micelio de Trametes Versicolor.',

    type: 'extracts',
    size: '100ml',
    // iconSrc: colaSrc,
  },
  {
    id: '2',
    icon: icon3,
    src: colaextract,
    url: 'cola-de-pavo',
    title: 'Cola de Pavo',
    description: 'Cuerpo fructífero de hongos y micelio de Trametes Versicolor.',

    type: 'extracts',
    size: '30ml',
    // iconSrc: colaSrc,
  },
]

const colaBenefitsHeaderData = [
  {
    title: 'DE LA COLA DE PAVO',
    description1: `El Trametes versicolor, conocido comúnmente como "Cola de Pavo", es un hongo reconocido por su capacidad para activar el sistema inmunológico. Estimula las células inmunitarias y ayuda al organismo en la lucha contra infecciones y virus gracias a su contenido en polisacáridos. También ha demostrado eficacia en la prevención de ciertos tipos de cáncer y otras enfermedades inflamatorias.`,
    description2: `Destruye infecciones, toxinas y patógenos que ingresan a la sangre, previene la formación de células cancerosas y ayuda a los glóbulos blancos a destruirlas en las primeras etapas. Trametes ha demostrado ser eficaz en la prevención del VPH, la psoriasis y las enfermedades renales.`,
  }
]

const colaBenefitsCardsData = [
  {
    src: imgC1,
    description: 'Ayuda a reducir la ansiedad y la irritabilidad'
  },
  {
    src: imgC2,
    description: 'Ayuda en la prevención de infecciones bacterianas y virales'
  },
  {
    src: img5,
    description: 'Ayuda a limpiar el organismo de toxinas y mejorar el funcionamiento cardiovascular'
  },
  {
    src: imgC4,
    description: 'Tiene un efecto beneficioso sobre la función renal'
  },
  {
    src: imgC5,
    description: 'Favorece la regeneración de la piel'
  },
  {
    src: img2,
    description: 'Fortalece el sistema inmunológico'
  },
]

// ======================= //

export const productContentComponents = [
  {
    itemUrl: 'melena',
    itemNumber: '1',
    formationData: melenaFormationData,
    benefitsHeaderData: melenaBenefitsHeaderData,
    benefitsCardsData: melenaBenefitsCardsData,
    indicationsImg: indicationsMelena
  },
  {
    itemUrl: 'reishi',
    itemNumber: '2',
    formationData: reishiFormationData,
    benefitsHeaderData: reishiBenefitsHeaderData,
    benefitsCardsData: reishiBenefitsCardsData,
    indicationsImg: indicationsReishi
  },
  {
    itemUrl: 'cola',
    itemNumber: '3',
    formationData: colaFormationData,
    benefitsHeaderData: colaBenefitsHeaderData,
    benefitsCardsData: colaBenefitsCardsData,
    indicationsImg: indicationsCola
  },
];

//===========================//




export const howToCardsData = [
  {
    img1: HowTo,
    description: 'Añade los productos que te gusten a tu carrito.'
  },
  {
    img1: imgC6,
    description: 'Elige tu método de pago preferido y completa tu compra',
    description2: 'Aceptamos pago vía Mercado Pago'
  },
  {
    img1: imgC7,
    description: 'En un plazo de 24 horas recogeremos tu pedido y te lo enviaremos.',
    description2: 'Para pedidos superiores a 200.000 COP el envío es gratuito.'
  },
  {
    img1: imgC8,
    description: 'Recibe tu pedido y comienza a mejorar tu salud con Cultura Liquida!'
  },
];

//==================//

interface ComplexData {
  id: string;
  title: string;
  type: string;
  // iconSrc: any; // any to avoid conflicts with @svgr/webpack plugin or babel-plugin-inline-react-svg plugin.
  icon: any; // any to avoid conflicts with @svgr/webpack plugin or babel-plugin-inline-react-svg plugin.
  price: number;
  originalPrice: number;
  size: string;
}

export const complexData2: ComplexData[] = [
  {
    title:'complejo',
    id: '1',
    type: 'Extracto 100ml',
    size: '3x 100ml',
    // iconSrc: colaSrc,
    icon: imgC10,
    price: 240000,
    originalPrice: 300000
  },
  {
    title:'complejo',
    id: '2',
    type: 'Extracto 30ml',
    size: '3x 30ml',
    // iconSrc: colaSrc,
    icon: imgC11,
    price: 84000,
    originalPrice: 105000
  },
]
