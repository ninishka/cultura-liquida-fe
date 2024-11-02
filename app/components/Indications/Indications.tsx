import React, { Fragment, FC } from 'react';
import { indicationsData } from '@/app/data'

import {
  IndicationsSection,
  IconWrapper,
  IconIndications,
  ContentWrapper,
  Title,
  IndicationsWrapper,
  IndicationsDescription,
  CautionWrapper,
  Caution
} from './styled'


interface IndicationsProps { 
  indicationsImg: any;
}

const Indications: FC<IndicationsProps> = ({ indicationsImg }) => (
  <IndicationsSection>
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
      <IconIndications src={indicationsImg} alt='Indicaciones de uso' />
    </IconWrapper>
  </IndicationsSection>
);


export default Indications
