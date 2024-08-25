import { Fragment } from 'react';
import {
  HeaderBenefitsWrapper,
  TextForBenefits,
  DescrWrapper,
  Description,
  BenefitsCards,
  Card
} from './styled'

const Benefits = ({ benefitsHeaderData, benefitsCardsData }) => (
  <section>
    <HeaderBenefitsWrapper>
      {benefitsHeaderData.map(({ title, description1 ,description2 }) => (
        <Fragment key={title}>
          <TextForBenefits>
            BENEFICIOSAS <br /> {title}
          </TextForBenefits>
          <DescrWrapper>
            <Description>{description1}</Description>
            <Description>{description2}</Description>
          </DescrWrapper>
        </Fragment>
      ))}
    </HeaderBenefitsWrapper>
    <BenefitsCards>
      {benefitsCardsData.map(({src, description}) => (
        <Card key={description}>
          <img src={src} alt={description} />
          <p>{description}</p>
        </Card>
      ))}
    </BenefitsCards>
  </section>
);


export default Benefits
