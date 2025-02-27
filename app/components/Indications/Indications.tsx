import React, { Fragment, FC } from 'react';
import { indicationsData } from '@/app/data'
import type { IndicationsProps } from '@/types/types'

import {
  IndicationsContent,
  IconWrapper,
  IconIndications,
  ContentWrapper,
  Title,
  IndicationsWrapper,
  IndicationsDescription,
  CautionWrapper,
  Caution
} from './styled'

const Indications: FC<IndicationsProps> = ({ indicationsImg }) => (
  <section style={{ minHeight: '80vh'}}>
    <IndicationsContent>
      <ContentWrapper>
        <Title>INDICACIONES DE USO:</Title>
        {indicationsData.map(({indication1, indication2, caution}) => (
          <Fragment key={indication1}>
            <IndicationsWrapper>
              <IndicationsDescription>{indication1}</IndicationsDescription>
              <IndicationsDescription>{indication2}</IndicationsDescription>
            </IndicationsWrapper>
            <CautionWrapper>
              <p><Caution>Precaución:</Caution> {caution}</p>
            </CautionWrapper>
          </Fragment>
        ))}
      </ContentWrapper>
      <IconWrapper>
        <IconIndications src={indicationsImg} alt='La imagen de Indicaciones' />
      </IconWrapper>
    </IndicationsContent>
  </section>
);


export default Indications
