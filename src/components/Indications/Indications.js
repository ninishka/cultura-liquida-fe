
import indicationsMelena from '../icons/icon_indications_for_the_use.png'

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

const indicationsMelenaData = [
  {
    indication1: '20 ml dos veces al día 30 minutos antes de las comidas.',
    indication2: 'Este polvo biodisponible tiene un perfil de sabor suave y se puede mezclar con su bebida o receta de comida favorita.',
    caution: ' si tiene una condición médica, está tomando medicamentos o está embarazada o amamantando, consulte a un profesional de la salud antes de usar este producto. Mantener fuera del alcance de los niños.'
  }
]

const Indications = () => (
  <IndicationsSection>
    <ContentWrapper>
      <Title>INDICACIONES DE USO:</Title>
      {indicationsMelenaData.map(({indication1, indication2, caution}) => (
        <>
          <IndicationsWrapper style={{display: 'flex'}}>
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
      <IconIndications src={indicationsMelena} alt='Indicaciones de uso' />
    </IconWrapper>
  </IndicationsSection>
);


export default Indications
