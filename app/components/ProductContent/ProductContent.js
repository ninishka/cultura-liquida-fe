import Formation from '../Formation/Formation'
import Benefits from '../Benefits/Benefits'
import Indications from '../Indications/Indications'
import { useAirtable } from '@/app/contexts/airtableContext/AirtableContext'

const ProductContent = ({
  formationDataTitle, formationData, benefitsHeaderData, benefitsCardsData, indicationsImg
}) => {
  const { getRecords } = useAirtable();
  console.log('getRecords', getRecords())

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
