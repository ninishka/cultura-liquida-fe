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
  First,
  Second,
  ReviewLink
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
          <First>
            <Image src={arrowNext} alt='Luego' />
          </First>
        )}
        {index < howToCardsData.length - 1 && index !== 1 && (
          <Second>
            <Image src={arrowNext} alt='Luego' />
          </Second>
        )}
      </Fragment> 
    ))}
    </HowToWrapper>
    <LeaveReview>
      <ReviewLink href="https://www.instagram.com/cult.liq.co" target="_blank" aria-label="Instagram">
        Deje una reseña y obtenga un 10% de descuento adicional en su próximo pedido
      </ReviewLink>
    </LeaveReview>
  </HowToSection>
)

export default HowTo