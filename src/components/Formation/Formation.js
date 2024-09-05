import React, { useState, Fragment, useContext } from 'react'
import { DataContext } from '../../App.js'

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
  Checkbox,
} from './styled'

const Formation = ({ formationDataTitle, formationData }) => {
  const { count, setCount } = useContext(DataContext)
  const [ checkedState, setCheckedState ] = useState('1')
  const [ temporalChoise, setTemporalChoise ] = useState([])
  const filterdContent = formationData.filter(({ id }) => id === checkedState)

  const rechecking = id => {
    if(checkedState !== id) setCheckedState(id)
      const { text } = formationData.find(item => item.id === id)
      if (text) {
        setTemporalChoise(() => ([
          {...formationDataTitle[0], ...filterdContent[0], text}
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
          {/* remake it to radio button later */}
              <Checkbox 
                type="checkbox" 
                id={id}
                name="group1" 
                checked={id === checkedState}
                onChange={() => rechecking(id)}
              />
            <Icon src={icon} alt={text}/>
            <TextDesc>{text}</TextDesc>
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