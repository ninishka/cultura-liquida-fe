import React, { useState, Fragment, useContext } from 'react'
import { DataContext } from '../../App.js'
import melenaCapsulsSrc from '../../assets/icons/icon_caps_melena_cart.png'
import melenaExtractSrc from'../../assets/icons/icon_melena_cart.png'
import colaSrc from '../../assets/icons/icon_cola_cart.png'
import reishiSrc from '../../assets/icons/icon_reishi_cart.png'



import Counter from '../Counter/Counter'
import {
  MelenaMain,
  ContentWrapper,
  ImageWrapperDesktop,
  ImageWrapperMobile,
  MelenaImage,
  TitleFrame,
  TitleH1,
  Description,
  FrameForTwo,
  Release,
  CheckBoxGroup,
  Item,
  Icon,
  TextDesc,
  RadioButton,
  LabelContent
} from './styled'

const Formation = ({ formationDataTitle, formationData }) => {
  const { count, setCount } = useContext(DataContext)
  const [ checkedState, setCheckedState ] = useState('1')

  const defaultChoise = [{
    description: "Cuerpo fructífero de hongos y micelio de Hericium erinaceus.",
    icon: "/cultura-liquida-fe/static/media/icon_caps.73274297e64c0cb4e0cc92cbe8e40966.svg",
    id: "1",
    src: "/cultura-liquida-fe/static/media/Frame_878.54c18a7c984b0f021ffa.png",
    text: "Cápsulas",
    title: "MELENA DE LEON"
  }]
  const [ temporalChoise, setTemporalChoise ] = useState(defaultChoise)
  const filterdContent = formationData.filter(({ id }) => id === checkedState)

  const rechecking = id => {
    if(checkedState !== id) setCheckedState(id)
      
      const { text } = formationData.find(item => item.id === id)
      if (text) {
        // const isMelena = text === 'Cápsulas' ? melenaCapsulsSrc : melenaExtractSrc
        // const colaOrReishi = title === 'REISHI, EXTRACTO' ? reishiSrc : colaSrc

        // const temporalImageChoosing = formationDataTitle[0].title === 'MELENA DE LEON' ? isMelena : colaOrReishi

        const isReishi =  formationDataTitle[0].title === 'REISHI, EXTRACTO' && reishiSrc
        const isCola =  formationDataTitle[0].title === 'COLA DE PAVO, EXTRACTO' && colaSrc

        const condMelena = text === 'Cápsulas' ?  melenaCapsulsSrc : melenaExtractSrc
        const isMelena =  formationDataTitle[0].title === 'MELENA DE LEON' && condMelena

        const condition = isReishi || isCola || isMelena 

        setTemporalChoise(() => ([
          {...formationDataTitle[0], ...filterdContent[0], text, 
            iconSrc: condition
          }
        ]))
      }
  }

// sometimes when i put func (for example: console.log() ) u need to know the sintaxis differents
// onClick={console.log('prev')} <-- this gonna be called automaticly on render time
// onClick={() => console.log('prev')} <-- this how it will be called ONLY FATER CLICK on it

  return (
  <MelenaMain>
    <ContentWrapper>
      <TitleFrame>
        {formationDataTitle.map(({ title, description}) => (
          <Fragment key={title}>
            <TitleH1>{title}</TitleH1>
            <Description>{description}</Description>  
          </Fragment>
        ))}
      </TitleFrame>
      {filterdContent.map(({ src }) => (
        <ImageWrapperMobile>
          <MelenaImage src={src}/>
        </ImageWrapperMobile>
      ))}
      <FrameForTwo>
        <Release>Seleccione el formulario de liberación:</Release>
        <CheckBoxGroup>
        {formationData.map(({text, icon, id}) => (
          <Item key={id} onClick={() => rechecking(id)}> 
              <RadioButton 
                type="radio" 
                id={id}
                name="group1" 
                checked={id === checkedState}
                onChange={() => rechecking(id)}
              />
            <LabelContent for="text">
              <Icon src={icon} alt={text}/>
              <TextDesc>{text}</TextDesc>
            </LabelContent>
          </Item>
          ))}
        </CheckBoxGroup>
      </FrameForTwo>
      <Counter count={count} setCount={setCount} temporalChoise={temporalChoise} />
    </ContentWrapper>
      {filterdContent.map(({ src }) => (
        <ImageWrapperDesktop>
          <MelenaImage src={src}/>
        </ImageWrapperDesktop>
      ))}
  </MelenaMain>
  )
}

export default Formation