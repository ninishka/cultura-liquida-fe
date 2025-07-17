import React, { Fragment } from 'react'
import { Tooltip } from 'antd'
import Counter from '@/app/components/Counter/Counter'
import {
  CheckBoxGroup,
  StyledItem,
  Icon,
  TextDesc,
  RadioButton,
  LabelContent,
  StyledLink
} from './styled'

const soldoutText = 'Este producto no está disponible de inmediato, pero aún puedes comprarlo y lo enviaremos tan pronto como podamos.'

const Checkboxes = ({ rInit, formationData, filterdContent, preObj }) => (
  <>
    <CheckBoxGroup>
      {formationData.map(({type, displayingType, icon, id, slug, size, availableStock}) => (
          <Fragment key={slug}>
            <StyledLink key={id} href={slug}>
              <Tooltip title={availableStock <= 0 && soldoutText}>
                <StyledItem {...(availableStock <= 0 && { $soldout: true })} checked={id === rInit} aria-label='Elección de la presentación del producto'> 
                    <RadioButton
                      id={id}
                      type="radio"
                      name="group1"
                      checked={id === rInit}
                    >
                      <LabelContent >
                        <Icon src={icon} alt={type}/>
                        <TextDesc>{displayingType}{size ? ` ${size}` : ''}</TextDesc>
                      </LabelContent>
                    </RadioButton>
                </StyledItem>
              </Tooltip>
            </StyledLink>
          </Fragment>
        ))
      }
    </CheckBoxGroup>
    <Counter filterdContent={filterdContent} preObj={preObj} />
  </>
)

export default Checkboxes
