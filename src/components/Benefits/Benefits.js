import {
  HeaderBenefitsWrapper,
  TextForBenefits,
  DescrWrapper,
  Description,
  BenefitsCards,
  Card
} from './styled'

// const melenaBenefitsHeaderData = [
//   {
//     title: 'DE LA MELENA DE LEÓN',
//     description1: `Conocida como "La seta inteligente", Lion's Mane es una opción ideal para cualquiera que busque apoyo cognitivo, memoria y estado de ánimo.`,
//     description2: `Reconocida desde hace mucho tiempo por apoyar el sistema nervioso, los estudios han demostrado que la melena de león puede aumentar el factor de crecimiento nervioso.`,
//   }
// ]

// const melenaBenefitsCardsData = [
//   {
//     src: img1,
//     description: 'Elimina la ansiedad y la irritabilidad'
//   },
//   {
//     src: img2,
//     description: 'Mejora de la inmunidad'
//   },
//   {
//     src: img3,
//     description: 'Induce sueños vívidos e intensos'
//   },
//   {
//     src: img4,
//     description: 'Mejora la memoria y la concentración'
//   },
//   {
//     src: img5,
//     description: 'Prevención de enfermedades del tracto gastrointestinal'
//   },
//   {
//     src: img6,
//     description: 'Aumenta la creatividad'
//   },
// ]

const Benefits = ({melenaBenefitsHeaderData, melenaBenefitsCardsData}) => (
  <section>
    <HeaderBenefitsWrapper>
      {melenaBenefitsHeaderData.map(({ title, description1 ,description2 }) => (
        <>
          <TextForBenefits>
            BENEFICIOSAS <br /> {title}
          </TextForBenefits>
          <DescrWrapper>
            <Description>{description1}</Description>
            <Description>{description2}</Description>
          </DescrWrapper>
        </>
      ))}
    </HeaderBenefitsWrapper>
    <BenefitsCards>
      {melenaBenefitsCardsData.map(({src, description}) => (
        <Card>
          <img src={src} alt={description} />
          <p>{description}</p>
        </Card>
      ))}
    </BenefitsCards>
  </section>
);


export default Benefits
