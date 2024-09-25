import { useState } from 'react'
import melenaCapsulsSrc from '@/app/icons/icon_caps_melena_cart.png'
import melenaExtractSrc from'@/app/icons/icon_melena_cart.png'
import colaSrc from '@/app/icons/icon_cola_cart.png'
import reishiSrc from '@/app/icons/icon_reishi_cart.png'


// TODO

const сardList = ({
  formationDataTitle: [{ title, description }],
  filterdContent: [{ icon, id, src, type }],
}) => {
  const [productCount, setProductCount] = useState(0)

  const defaultChoise = [{
    description: "Cuerpo fructífero de hongos y micelio de Hericium erinaceus.",
    icon: "/cultura-liquida-fe/static/media/icon_caps.73274297e64c0cb4e0cc92cbe8e40966.svg",
    id: "1",
    src: "/cultura-liquida-fe/static/media/Frame_878.54c18a7c984b0f021ffa.png",
    type: "Cápsulas",
    title: "MELENA DE LEON",

    innerCounter: 1,
    modalSrc: melenaCapsulsSrc,
  }]

  // const { title, description } = formationDataTitle[0]
  // const { icon, id, src, type } = filterdContent[0]

  // src - main img
  // icon - button icon
  // modalSrc - modalSrc
  // type - kind of product

  const isReishi =  title === 'REISHI, EXTRACTO' && reishiSrc
  const isCola =  title === 'COLA DE PAVO, EXTRACTO' && colaSrc
  const condMelena = type === 'Cápsulas' ?  melenaCapsulsSrc : melenaExtractSrc
  const isMelena =  title === 'MELENA DE LEON' && condMelena

  const condition = isReishi || isCola || isMelena 

  return {
    id,
    title,
    description,
    src,
    icon,
    modalSrc: condition,
    type,
    productCount,
  }
}

export default сardList