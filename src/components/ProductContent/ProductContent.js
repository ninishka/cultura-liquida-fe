import Formation from '../Formation/Formation'
import Benefits from '../Benefits/Benefits'
import Indications from '../Indications/Indications'

const ProductContent = (props) => {

  return (
    <div>
      <Formation checkBoxes={props.checkBoxes} />
      <Benefits melenaBenefitsHeaderData={props.melenaBenefitsHeaderData} melenaBenefitsCardsData={props.melenaBenefitsCardsData} />
      <Indications indicationsMelenaData={props.indicationsMelenaData}  />
    </div>
  );
}

export default ProductContent;
