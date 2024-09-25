// import { useContext } from 'react';
import Formation from '../Formation/Formation'
import Benefits from '../Benefits/Benefits'
import Indications from '../Indications/Indications'
// import { AirtableContext } from '@/app/contexts/airtableContext/airtableContext'

const ProductContent = ({
  formationDataTitle, formationData, benefitsHeaderData, benefitsCardsData, indicationsImg
}) => {
  // const { getRecords } = useContext(AirtableContext);
  // console.log('getRecords', getRecords())

  return (
    <div>
      <Formation formationDataTitle={formationDataTitle} formationData={formationData}/>
      <Benefits 
        benefitsHeaderData={benefitsHeaderData} 
        benefitsCardsData={benefitsCardsData} 
      />
      <Indications indicationsImg={indicationsImg}  />
    </div>
  )
}

export default ProductContent
