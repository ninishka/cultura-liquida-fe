import React, { Fragment, FC } from 'react';
import type { BenefitsProps } from '@/types/types'
import {
  BenefitsSection,
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

const Benefits: FC<BenefitsProps> = ({ benefitsHeaderData, benefitsCardsData, benefitsData }) => (
  <BenefitsSection>
    <HeaderBenefitsWrapper>
      {benefitsHeaderData?.length && benefitsHeaderData.map(({ title, description1 ,description2 }) => (
        <Fragment key={title}>
          <TextForBenefits>
            BENEFICIOS <br /> {title}
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
  </BenefitsSection>
);


export default Benefits
