import { Fragment } from 'react';
import Image from 'next/image'
import {
  HeaderBenefitsWrapper,
  TextForBenefits,
  DescrWrapper,
  Description,
  BenefitsCards,
  Card,
  DescriptionCard,
  BenefitIconWrapper,
  BenefitIcon,
} from './styled'

const Benefits = ({ benefitsHeaderData, benefitsCardsData, benefitsData }) => (
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
          <BenefitIconWrapper>
            <BenefitIcon 
              src={src}
              sizes="100vw"
              alt={description}   
              // placeholder="blur" // just img hightlighting on loading time
            />
          </BenefitIconWrapper>
          <DescriptionCard>{description}</DescriptionCard>
        </Card>
      ))}
    </BenefitsCards>
  </section>
);


export default Benefits
