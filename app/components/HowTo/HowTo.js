import { howToCardsData } from '@/app/data'
import { Fragment } from 'react';

import {
  HowToWrapper,
  TextForHeader,
  CardsWrapper,
  HowToImage,
  DescWrapper,
  HowToDesc,
  SecondDesc,
  ArrowIcon,
  LeaveReview,
  ReviewText
} from './styled'

const HowTo = ({soe}) => {
  return (
    <section style={{borderBottom: ' 2px solid #9F9F9F ', margin: '10px 15px'}}>
      <TextForHeader> {'cómo recibir un pedido'.toUpperCase()}</TextForHeader>
      <HowToWrapper>
      {howToCardsData.map(({src, description, description2, arrow }) => (
        <Fragment key={src}>
          <CardsWrapper>
            <HowToImage src={src}/>
            <DescWrapper>
              <HowToDesc>{description}</HowToDesc>
              <SecondDesc>{description2}</SecondDesc>
            </DescWrapper>
          </CardsWrapper>
          <ArrowIcon src={arrow}/>
        </Fragment> 
      ))}
      </HowToWrapper>
      <LeaveReview>
        <ReviewText>
          Deje una reseña y obtenga un 10% de descuento adicional en su próximo pedido
        </ReviewText>
      </LeaveReview>
    </section>
    
)}


export default HowTo