import Formation from '../Formation/Formation'
import Benefits from '../Benefits/Benefits'
import Indications from '../Indications/Indications'

const ProductContent = ({
  setChoosedGood, formationDataTitle, formationData, benefitsHeaderData, benefitsCardsData, indicationsData, indicationsImg
}) => {

  return (
    <div>
      <Formation formationDataTitle={formationDataTitle} formationData={formationData} setChoosedGood={setChoosedGood} />
      <Benefits 
        benefitsHeaderData={benefitsHeaderData} 
        benefitsCardsData={benefitsCardsData} 
      />
      <Indications indicationsData={indicationsData} indicationsImg={indicationsImg}  />
    </div>
  );
}

export default ProductContent;
