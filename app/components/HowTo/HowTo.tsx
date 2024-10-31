import React, { Fragment, FC } from 'react'
import { howToCardsData } from '@/app/data'

import {
  HowToWrapper,
  TextForHeader,
  CardsWrapper,
  HowToImage,
  DescWrapper,
  HowToDesc,
  SecondDesc,
  LeaveReview,
  ReviewText
} from './styled'

const HowTo: FC = () => (
  <section style={{borderBottom: ' 2px solid #9F9F9F ', margin: '10px 15px'}}>
    <TextForHeader> {'cómo recibir un pedido'.toUpperCase()}</TextForHeader>
    <HowToWrapper>
    {howToCardsData.map(({img1, description, description2, arrow }, index) => (
      <Fragment key={description}>
        <CardsWrapper>
          <HowToImage src={img1} alt={`step-${index + 1}`}/>
          <DescWrapper>
            <HowToDesc>{description}</HowToDesc>
            <SecondDesc>{description2}</SecondDesc>
          </DescWrapper>
        </CardsWrapper>
        {/* {arrow && <ArrowIcon src={arrow} alt='arrow-icon'/>} */}
      </Fragment> 
    ))}
    </HowToWrapper>
    <LeaveReview>
      <ReviewText>
        Deje una reseña y obtenga un 10% de descuento adicional en su próximo pedido
      </ReviewText>
    </LeaveReview>
  </section>
)

export default HowTo