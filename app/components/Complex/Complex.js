import { complexData, FormationData } from '@/app/data'
import { Fragment, useContext } from 'react';
// import Counter from '../Counter/Counter'

import imgC9 from '@/app/icons/CL-703.png'

import {
  AllWrap,
  ImgSide,
  ImgItself,
  RightContentWrap,
  TitleWrap,
  Benefits,
  DiscountText,
  ComplexItemsWrap,
  LeftSide,
  LeftTitle,
  ThreeItemsWrap,
  InsideItemWrap,
  Item123,
  LearnMoreWrap,
  LearnMoreText,
  ArrowIcon,
  ArrowButtons,
  CheckBoxGroup,
  RadioButton,
  TextDesc,
  Icon,
  Item,
  LabelContent,
  TwoCardwrap,
  FormationWrap,
  Selecting
} from './styled'

const Complex = ({something}) => {
  return (
    <section>
      <AllWrap>
        <ImgSide> 
          <ImgItself src={imgC9} alt='Complex'/>
        </ImgSide>
       <RightContentWrap>
          <TitleWrap>
            <Benefits>
             {'mejorar significativamente memoria, sistema nervioso, metabolismo '.toUpperCase()}4
            </Benefits>
            <DiscountText>¡Con la ayuda de un complejo de suplementos de hongos con un 20% de descuento!</DiscountText>
          </TitleWrap>
          <TwoCardwrap>
            <ComplexItemsWrap>
              <LeftSide>
                <LeftTitle>El complejo consta de:</LeftTitle>
                {complexData.map(({src, learnmmore, name }) => (
                  <ThreeItemsWrap key={name}>
                    <InsideItemWrap>
                      <Item123>{name}</Item123>
                    </InsideItemWrap>
                    <LearnMoreWrap>
                      <LearnMoreText>{learnmmore}</LearnMoreText>
                      <ArrowButtons><ArrowIcon src={src} alt='arrow' /></ArrowButtons>
                    </LearnMoreWrap>
                  </ThreeItemsWrap>
                ))}
              </LeftSide>
            </ComplexItemsWrap>
            <FormationWrap>
              <CheckBoxGroup>
                <Selecting>Seleccione el formulario de liberación:</Selecting>
                {FormationData.map(({text, icon, id,}) => (
                  <Item key={id}> 
                      <RadioButton 
                        type="radio" 
                        id={id}
                        name="group1"
                        // checked={id === checkedState}
                        // onChange={() => rechecking(id)} 
                      />
                    <LabelContent htmlFor="text">
                      <Icon src={icon} alt={text}/>
                      <TextDesc>{text}</TextDesc>
                    </LabelContent>
                  </Item>
                  ))}
              </CheckBoxGroup>
            </FormationWrap>
          </TwoCardwrap>

          {/* <Counter count={count} setCount={setCount} isModal /> */}

       </RightContentWrap>
      </AllWrap>
    </section>
    
)}


export default Complex

// <InsideItemWrap>
// <Item123>Melena de leon</Item123>
// <Item123>Cola de pavo</Item123>
// <Item123>Reishi</Item123>
// </InsideItemWrap>
// <LearnMoreWrap>
// <LearnMoreText>Leer más</LearnMoreText>
// <LearnMoreText>Leer más</LearnMoreText>
// <LearnMoreText>Leer más</LearnMoreText>
// </LearnMoreWrap>