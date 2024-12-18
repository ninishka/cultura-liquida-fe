import styled from 'styled-components'
import { useParams } from 'next/navigation';

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


const SkeletonBox3 = styled.div`
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

export default function Loading() {
  const { slug } = useParams();

  return (
    <CC>
      <div style={{ display: 'flex', gap: '20px', marginBottom: 40 }}>
        <SkeletonBox3 
          style={{ 
            // width: '22.7vw', 
            width: '216px', 
            height: '62px', 
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        />
        <SkeletonBox3 
          style={{ 
            width: '216px', 
            height: '62px', 
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        />
        {slug?.[0]?.includes('melena') && <SkeletonBox3 
          style={{ 
            width: '216px', 
            height: '62px', 
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        />}
      </div>
      <HH>
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
        <SkeletonBox3 
          style={{ 
            width: '200px', 
            height: '55px', 
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        />
      </HH>
    </CC>
  )
}


const HH = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 1200px) {
    justify-content: center
  }
`

const CC = styled.div`

  
  @media (max-width: 1200px) {
    margin-bottom: 40px;
  }
`