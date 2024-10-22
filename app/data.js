import icon1 from './icons/icon_caps.svg'
import icon2 from './icons/icon_ex100.svg'
import icon3 from './icons/icon_ex30.svg'
import melenacaps from './icons/Frame_878.png'
import melenaextract from './icons/Frame_87.png'

import img1 from './icons/icon_LM1.png'
import img2 from './icons/icon_LM7.png'
import img3 from './icons/icon_LM3.png'
import img4 from './icons/icon_LM4.png'
import img5 from './icons/icon_LM8.png'
import img6 from './icons/icon_LM6.png'

import indicationsMelena from './icons/icon_indications_for_the_use.png'
import indicationsReishi from './icons/icon_indications_for_the_use_R.png'
import indicationsCola from './icons/icon_indications_for_the_use_C.png'

import reishiextract from './icons/Frame_87R.png'
import imgR1 from './icons/icon_LR1.svg'
import imgR3 from './icons/icon_LR2.svg'
import imgR4 from './icons/icon_LR3.svg'
import imgR6 from './icons/icon_LR4.svg'

import colaextract from './icons/Frame_87C.png'
import imgC1 from './icons/icon_LC1.svg'
import imgC2 from './icons/icon_LC2.svg'
import imgC4 from './icons/icon_LC5.svg'
import imgC5 from './icons/icon_LC4.svg'

import HowTo from './icons/icon_step1.svg'
import imgC6 from './icons/icon_step2.svg'
import imgC7 from './icons/icon_step3.svg'
import imgC8 from './icons/icon_step4.svg'
import imgC9 from './icons/arrow_next.svg'

import imgC10 from './icons/icon_ex30.svg'
import imgC11 from './icons/icon_ex100.svg'

import melenaCapsulsSrc from './icons/icon_caps_melena_cart.png'
import melenaExtractSrc from'./icons/icon_melena_cart.png'
import colaSrc from './icons/icon_cola_cart.png'
import reishiSrc from './icons/icon_reishi_cart.png'


// [
//   {
//       "_id": "67061ea1dea30f1fed0e5cc9",
//       "title": "MELENA DE LEON",
//       "description": "Cuerpo fructífero de hongos y micelio de Hericium erinaceus.",
//       "type": "capsules",
//       "price": 12000,
//       "stock": 20,
//       "__v": 0,
//       "ingredient": "Hericium erinaceus"
//   },
//   {
//       "_id": "67066324b61982c75ddce096",
//       "title": "MELENA DE LEON",
//       "description": "Cuerpo fructífero de hongos y micelio de Hericium erinaceus.",
//       "ingredient": "Hericium erinaceus",
//       "type": "extracts",
//       "price": 10000,
//       "stock": 39,
//       "__v": 0,
//       "size": "100ml" @
//   },
//   {
//       "_id": "67066324b61982c75ddce096",
//       "title": "MELENA DE LEON",
//       "description": "Cuerpo fructífero de hongos y micelio de Hericium erinaceus.",
//       "ingredient": "Hericium erinaceus",
//       "type": "extracts",
//       "price": 8000,
//       "stock": 88,
//       "__v": 0,
//       "size": "30ml" @
//   }
// ]

// [
//   {
//       "_id": "67066324b61982c75ddce096",
//       "title": "REISHI",
//       "description": "Cuerpo fructífero de hongos y micelio de Ganoderma lucidum.", @@
//       "ingredient": "Ganoderma lucidum", @@
//       "type": "extracts",
//       "price": 11000,
//       "stock": 77,
//       "__v": 0,
//       "size": "100ml" @
//   },
//   {
//       "_id": "67066324b61982c75ddce096",
//       "title": "REISHI",
//       "description": "Cuerpo fructífero de hongos y micelio de Ganoderma lucidum.", @@
//       "ingredient": "Ganoderma lucidum", @@
//       "type": "extracts",
//       "price": 7000,
//       "stock": 66,
//       "__v": 0,
//       "size": "30ml" @
//   }
// ]

// [
//   {
//       "_id": "67066324b61982c75ddce096",
//       "title": "COLA",
//       "description": "Cuerpo fructífero de hongos y micelio de Trametes Versicolor.", @@
//       "ingredient": "Trametes Versicolor", @@
//       "type": "extracts",
//       "price": 9000,
//       "stock": 55,
//       "__v": 0,
//       "size": "100ml" @
//   },
//   {
//       "_id": "67066324b61982c75ddce096",
//       "title": "COLA",
//       "description": "Cuerpo fructífero de hongos y micelio de Trametes Versicolor.", @@
//       "ingredient": "Trametes Versicolor", @@
//       "type": "extracts",
//       "price": 6000, @@@
//       "stock": 44, @@@
//       "__v": 0,
//       "size": "30ml" @
//   }
// ]

const melenaFormationData = [
  {
    id: '1',
    icon: icon1,
    src: melenacaps,
    iconSrc: melenaCapsulsSrc,
    url: 'melena-de-leon',

    type: 'capsules',
  },
  {
    id: '2',
    icon: icon2,
    src: melenaextract,
    iconSrc: melenaExtractSrc,
    url: 'melena-de-leon',

    type: 'extracts',
    size: '100ml',
  },
  {
    id: '3',
    icon: icon3,
    src: melenaextract,
    iconSrc: melenaExtractSrc,
    url: 'melena-de-leon',

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

    type: 'extracts',
    size: '100ml',
    iconSrc: reishiSrc,
  },
  {
    id: '2',
    icon: icon3,
    src: reishiextract,
    url: 'reishi',

    type: 'extracts',
    size: '30ml',
    iconSrc: reishiSrc,
  },
]

const reishiBenefitsHeaderData = [
  {
    title: 'DE LA REISHI',
    description1: `El extracto de Reishi se ha utilizado durante mucho tiempo como tratamiento para muchas enfermedades. El extracto de Reishi contiene muchas sustancias beneficiosas, minerales y vitaminas. Y una característica importante de este remedio es la ausencia de efectos secundarios por su recepción.`,
    description2: `El extracto de hongo Reishi es un producto natural único. Tiene una amplia gama de efectos en el cuerpo humano debido a su rica composición química. Vitaminas, polisacáridos, micro y macroelementos, proteínas, grasas, ácidos: todas estas sustancias están contenidas en el extracto.`,
  }
]

const reishiBenefitsCardsData = [
  {
    src: imgR1,
    description: 'Promueve la pérdida de peso'
  },
  {
    src: img2,
    description: 'Fortalece el sistema inmunológico'
  },
  {
    src: imgR3,
    description: 'Mejora el funcionamiento del sistema cardiovascular'
  },
  {
    src: img5,
    description: 'Prevención de enfermedades del tracto gastrointestinal'
  },
  {
    src: imgR4,
    description: 'Elimina dolores de cabeza'
  },
  {
    src: imgR6,
    description: 'Fuente de minerales y vitaminas'
  },
]

// ======================= //

const colaFormationData = [
  {
    id: '1',
    icon: icon2,
    src: colaextract,
    url: 'cola-de-pavo',


    type: 'extracts',
    size: '100ml',
    iconSrc: colaSrc,
  },
  {
    id: '2',
    icon: icon3,
    src: colaextract,
    url: 'cola-de-pavo',


    type: 'extracts',
    size: '30ml',
    iconSrc: colaSrc,
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
    description: 'Añade los productos que te gusten a tu carrito.',
    arrow: imgC9
  },
  {
    img1: imgC6,
    description: 'Elige tu método de pago preferido y completa tu compra',
    description2: 'Aceptamos pago vía Mercado Pago',
    arrow: imgC9
  },
  {
    img1: imgC7,
    description: 'En un plazo de 24 horas recogeremos tu pedido y te lo enviaremos.',
    description2: 'Para pedidos superiores a 200.000 COP el envío es gratuito.',
    arrow: imgC9
  },
  {
    img1: imgC8,
    description: 'Recibe tu pedido y comienza a mejorar tu salud con Cultura Liquida!'
  },
];

//==================//


export const complexData2 = [
  {
    title:'complejo 100ml',
    id: '1',
    type: 'extracts 100ml',
    iconSrc: imgC10,
    price: 240000,
    originalPrice: 300000
  },
  {
    title:'complejo 30ml',
    id: '2',
    type: 'extracts 30ml',
    iconSrc: imgC11,
    price: 105000,
    originalPrice: 84000
  },
]



// =============================== //
// form

export const formDataSet = [
  { label: 'Nombre', name: 'name', type: 'text' },
  { label: 'Apellidos', name: 'surnames', type: 'text' },
  { label: 'Tipo documento', name: 'documentType', type: 'select', options: [
      { label: 'ID', value: 'ID' },
      { label: 'Passport', value: 'Passport' },
      { label: 'Driver\'s License', value: 'Driver\'s License' }
    ]
  },
  { label: 'Número de documento', name: 'documentNumber', type: 'text' },
  { label: 'Dirección de envío', name: 'shippingAddress', type: 'textarea' },
  { label: 'Departamento', name: 'department', type: 'select', options: [
      { label: "departments 1", value: "option1" },
      { label: "departments 2", value: "option2" },
    ]
  },
  { label: 'Ciudad / Municipio', name: 'cityMunicipality', type: 'select', options: [
      { label: "municipalities 1", value: "option11" },
      { label: "municipalities 2", value: "option22" },
    ]
  },
  { label: 'Celular / Teléfono', name: 'telephone', type: 'tel' },
  { label: 'Correo electrónico', name: 'email', type: 'email' },
  { label: 'I agree to the terms and conditions', name: 'agree', type: 'checkbox' } 
];