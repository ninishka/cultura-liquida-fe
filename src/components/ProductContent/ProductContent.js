import Formation from '../Formation/Formation'
import Benefits from '../Benefits/Benefits'
import Indications from '../Indications/Indications'

const ProductContent = ({
  setchoosedGood, formationDataTitle, formationData, benefitsHeaderData, benefitsCardsData, indicationsData, indicationsImg
}) => {

  return (
    <div>
      <Formation formationDataTitle={formationDataTitle} formationData={formationData} setchoosedGood={setchoosedGood} />
      <Benefits 
        benefitsHeaderData={benefitsHeaderData} 
        benefitsCardsData={benefitsCardsData} 
      />
      <Indications indicationsData={indicationsData} indicationsImg={indicationsImg}  />
    </div>
  );
}

export default ProductContent;
