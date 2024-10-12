import { useContext } from 'react';
import Formation from '../Formation/Formation'
import Benefits from '../Benefits/Benefits'
import Indications from '../Indications/Indications'
// import { Suspense } from 'react'
import Loading from './loading'
// import { AirtableContext } from '@/app/contexts/airtableContext/airtableContext'
import CartContext from '@/app/contexts/cartContext/cartContext'

const ProductContent = ({ bdData,
  formationData, benefitsHeaderData, benefitsCardsData, indicationsImg
  
}) => {
  // const { getRecords } = useContext(AirtableContext);
  // console.log('getRecords', getRecords())

  // const { data, displayingItem } = useContext(CartContext)
  return (
    <div>
      <Formation formationData={formationData} bdData={bdData}/>
      <Benefits 
        benefitsHeaderData={benefitsHeaderData} 
        benefitsCardsData={benefitsCardsData} 
      />
      <Indications indicationsImg={indicationsImg}  />
    </div>
  )
}

export default ProductContent
