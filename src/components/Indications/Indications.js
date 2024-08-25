import { Fragment } from 'react';

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

const Indications = ({ indicationsData, indicationsImg }) => (
  <IndicationsSection>
    <ContentWrapper>
      <Title>INDICACIONES DE USO:</Title>
      {indicationsData.map(({indication1, indication2, caution}) => (
        <>
          <IndicationsWrapper>
            <IndicationsDescription>{indication1}</IndicationsDescription>
            <IndicationsDescription>{indication2}</IndicationsDescription>
          </IndicationsWrapper>
          <CautionWrapper>
            <p><Caution>Precaución:</Caution> {caution}</p>
          </CautionWrapper>
        </>
      ))}
    </ContentWrapper>
    <IconWrapper>
      <IconIndications src={indicationsImg} alt='Indicaciones de uso' />
    </IconWrapper>
  </IndicationsSection>
);


export default Indications
