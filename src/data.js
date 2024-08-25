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

import indicationsMelena from './assets/icons/icon_indications_for_the_use.png'
import indicationsReishi from './assets/icons/icon_indications_for_the_use_R.png'

import reishiextract from './assets/icons/Frame_87R.png'
import imgR1 from './assets/icons/icon_LR1.svg'
import imgR3 from './assets/icons/icon_LR2.svg'
import imgR4 from './assets/icons/icon_LR3.svg'
import imgR6 from './assets/icons/icon_LR4.svg'

const melenaFormationDataTitle = [
  {
    title: 'MELENA DE LEON',
    description: 'Cuerpo fructífero de hongos y micelio de Hericium erinaceus.',
  }
]

const melenaFormationData = [
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

export const indicationsData = [
  {
    indication1: '20 ml dos veces al día 30 minutos antes de las comidas.',
    indication2: 'Este polvo biodisponible tiene un perfil de sabor suave y se puede mezclar con su bebida o receta de comida favorita.',
    caution: ' si tiene una condición médica, está tomando medicamentos o está embarazada o amamantando, consulte a un profesional de la salud antes de usar este producto. Mantener fuera del alcance de los niños.'
  }
]

// ===================== //

const reishiFormationDataTitle = [
  {
    title: 'REISHI, EXTRACTO',
    description: 'Cuerpo fructífero de hongos y micelio de Ganoderma lucidum.',
  }
]

const reishiFormationData = [
  {
    id: '1',
    icon: icon2,
    text: 'Extracto 100ml',
    src: reishiextract,
  },
  {
    id: '2',
    icon: icon3,
    text: 'Extracto 30ml',
    src: reishiextract,
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
    description: 'Mejora de la inmunidad'
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

// PLACE HERE THE COLA DATA

// ======================= //

export const productContentComponents = [
  {
    itemNumber: '1',
    formationDataTitle: melenaFormationDataTitle,
    formationData: melenaFormationData,
    benefitsHeaderData: melenaBenefitsHeaderData,
    benefitsCardsData: melenaBenefitsCardsData,
    indicationsImg: indicationsMelena
  },
  {
    itemNumber: '2',
    formationDataTitle: reishiFormationDataTitle,
    formationData: reishiFormationData,
    benefitsHeaderData: reishiBenefitsHeaderData,
    benefitsCardsData: reishiBenefitsCardsData,
    indicationsImg: indicationsReishi
  },
  // Add one more 
];