import React, { Fragment, FC } from 'react'
import { howToCardsData } from '@/app/data'
import Image from 'next/image'
import arrowNext from '@/app/icons/arrow_next.svg'

import {
  HowToSection,
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
  <HowToSection>
    <TextForHeader>cómo recibir un pedido</TextForHeader>
    <HowToWrapper>
    {howToCardsData.map(({img1, description, description2 }, index) => (
      <Fragment key={description}>
        <CardsWrapper>
          <HowToImage src={img1} alt={`Paso-${index + 1} del pedido`}/>
          <DescWrapper>
            <HowToDesc>{description}</HowToDesc>
            <SecondDesc>{description2}</SecondDesc>
          </DescWrapper>
        </CardsWrapper>
        {index < howToCardsData.length - 1 && (
          <div>
            <Image src={arrowNext} alt='Luego' />
          </div>
        )}
      </Fragment> 
    ))}
    </HowToWrapper>
    <LeaveReview>
      <ReviewText>
        Deje una reseña y obtenga un 10% de descuento adicional en su próximo pedido
      </ReviewText>
    </LeaveReview>
  </HowToSection>
)

export default HowTo