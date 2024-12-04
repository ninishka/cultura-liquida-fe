import styled, { css } from 'styled-components'
import { useParams } from 'next/navigation';

import {
  CheckBoxGroup,
  Item,
} from './styled'

// const SkeletonBox = styled.div`
//   background-color: #FFD700;
//   border-radius: 8px;
//   animation: skeleton-loading 2s linear infinite alternate;

//   @keyframes skeleton-loading {
//     0% {
//       opacity: 1;
//     }
//     50% {
//       opacity: 0.5;
//     }
//     100% {
//       opacity: 1;
//     }
//   }
// `;


// const SkeletonBox2 = styled.div`
//   display: inline-block;
//   height: 1em;
//   position: relative;
//   overflow: hidden;
//   background-color: #DDDBDD;

//   &::after {
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     transform: translateX(-100%);
//     background-image: linear-gradient(
//       90deg,
//       rgba(red, 0) 0,
//       rgba(#FFD700, 0.2) 20%,
//       rgba(#FFD700, 0.5) 60%,
//       rgba(red, 0)
//     );
//     animation: shimmer 0.5ms infinite;
//     content: '';
//   }

//   @keyframes shimmer {
//     100% {
//       transform: translateX(100%);
//     }
//   }
// `

const animationSettings = css`
  background: linear-gradient(90deg, #4FDB40, #FFD700, #4FDB40);
  animation: leftToRight 1.5s infinite reverse;
  background-size: 200%; 

  @keyframes leftToRight {
    0% {
      background-position: -100% 0;
    }

    100% {
      background-position: 100% 0;
    }
  }
`
const SkeletonBox3 = styled.div`
  ${animationSettings}

  @media (max-width: 1200px) {
    margin-top: 20px;
  }
`

const SkeletonBuyButton = styled(SkeletonBox3)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px; 
  height: 55px; 
  border-radius: 16px;

  @media (max-width: 1200px) {
    width: 217px;
  }
`

// const SkeletonCounter = styled(SkeletonBox3)`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   width: 102px; 
//   height: 55px; 
//   border-radius: 16px;

//   @media (max-width: 1200px) {
//     width: 217px;
//   }
// `

const SkeletonItem = styled(Item)`
  ${animationSettings}
`

const CounterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 1200px) {
    justify-content: left;
    margin: ${({$isMelena}) => $isMelena ? '0 16%' : '0 40px'};
  }

  @media (max-width: 850px) {
    justify-content: center
  }
`

const LoadingContainer = styled.div`
  @media (max-width: 1200px) {
    margin-bottom: 20px;
  }
  
  @media (max-width: 850px) {
    margin-bottom: 60px;
  }
`

export default function Loading() {
  const { slug } = useParams();
  const isMelena = slug?.[0]?.includes('melena')
  console.log('isMelena', isMelena)

  return (
    <LoadingContainer>
      <CheckBoxGroup>
        <SkeletonItem />
        <SkeletonItem />
        {isMelena && <SkeletonItem />}
      </CheckBoxGroup>
      <CounterContainer $isMelena={isMelena}>
        <SkeletonBox3 
          style={{ 
            width: '102px', 
            height: '55px', 
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        />
        <SkeletonBuyButton />
      </CounterContainer>
    </LoadingContainer>
  )
}
