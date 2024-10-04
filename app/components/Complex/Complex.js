import { complexData, complexData2 } from '@/app/data'
import { useState, useContext } from 'react';
import CartContext from '@/app/contexts/cartContext/cartContext'
import Counter from '../Counter/Counter'
import data from '../data'


import imgC9 from '@/app/icons/CL-703.png'
import imgC from '@/app/icons/arrow_next.svg'
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
  Selecting,
  PriceCounterWrap
} from './styled'

const Complex = ({something, formationData, tAmount}) => {
  const [ checkedState, setCheckedState ] = useState('1')
  const { setDisplayingItem } = useContext(CartContext)

  const rechecking = id => {
    if(checkedState !== id) setCheckedState(id)
  }

  const isBrowser = () => typeof window !== 'undefined';

  const scrollToTop = () => {
      if (!isBrowser()) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleClick = id => {
    setDisplayingItem (id.toString())
    scrollToTop()
  }


  const filterdContent = complexData2.filter(({ id }) => id === checkedState)
  const idCart = filterdContent?.[0]?.title + filterdContent?.[0]?.id
  const preObj = {idCart , ...filterdContent?.[0]}
  console.log('preObj COMP', preObj)

  return (
    <section>
      <AllWrap>
        <ImgSide> 
          <ImgItself sizes='100vw' src={imgC9} alt='Complex'/>
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
                {data.map(({ title }, index) => {
                  const id = index + 1
                  return (
                    <ThreeItemsWrap key={title}>
                    <InsideItemWrap>
                      <Item123>{title}</Item123>
                    </InsideItemWrap>
                    <ArrowButtons aria-label={`Obtenga más información sobre ${title}`} onClick={() => handleClick(id)}>
                      <LearnMoreWrap key={title + id}>
                        <LearnMoreText>Leer más</LearnMoreText>
                        <ArrowIcon src={imgC} alt='arrow' />
                      </LearnMoreWrap>
                    </ArrowButtons>
                    </ThreeItemsWrap>
                  )
                })} 
              </LeftSide>
            </ComplexItemsWrap>
            <FormationWrap>
              <CheckBoxGroup>
                <Selecting>Seleccione el formulario de liberación:</Selecting>
                {complexData2.map(({type, iconSrc, id,}) => (
                  <Item key={id} onClick={() => rechecking(id)} aria-label={`Elección del tamaño del producto`}> 
                    <label htmlFor={id} aria-label={`Elección del tamaño del producto`}>
                      <RadioButton 
                        type="radio" 
                        id={id}
                        name="group1" 
                        checked={id === checkedState}
                        onChange={() => rechecking(id)}
                      />
                    </label>
                    <LabelContent htmlFor="text">
                      <Icon src={iconSrc} alt={type}/>
                      <TextDesc>{type}</TextDesc>
                    </LabelContent>
                  </Item>
                  ))}
              </CheckBoxGroup>
            </FormationWrap>
          </TwoCardwrap>
          <PriceCounterWrap>
            <Counter filterdContent={filterdContent} preObj={preObj}/>
            {checkedState === '1' && '230000 COP'}
            {checkedState === '2' && '150000 COP'}  
          </PriceCounterWrap>
       </RightContentWrap>
      </AllWrap>
    </section>
    
)}


export default Complex


