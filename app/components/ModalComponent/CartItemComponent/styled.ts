import styled, { css } from 'styled-components'
import Image from 'next/image'
import type { OrderStyledProps } from '@/types/types'


export const CartItemWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* justify-content: flex-end; */
`
export const CartItem = styled.div<OrderStyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-around; */
  background-color: white;
  border-radius: 16px 16px;
  margin: 10px 0;
  width: inherit;
  gap: 9px;
  font-family: var(--font-mohave);
  min-width: 280px;

  @media (max-width: 850px) {
    gap: 0;
  }

  ${({$isOrder}) => $isOrder ? css`
    @media (max-width: 522px) {
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  ` : css`
    @media (max-width: 522px) {
      margin: 10px;
      flex-wrap: wrap;
      /* flex-direction: column; */
      justify-content: flex-start;
    }
  `}
`

export const CountAndAmountWrap = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
`



export const CartImg = styled(Image)`
  width: revert-layer;
  height: auto;
  margin: 20px;
  @media (max-width: 850px) {
    margin: 10px;
  }
`

export const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 764px) {
    flex-direction: column;
    align-items: baseline;
  }  

  @media (max-width: 522px) {
    flex-direction: column;
    margin: 0 auto;
  }
`

export const InfoContainer = styled.div<OrderStyledProps>`
  display: flex;
  align-items: center;
  
  @media (max-width: 600px) {
    flex-direction: column ;
  }

  @media (max-width: 522px) {
    flex-direction: row;
    margin: 10px;
    ${({$isOrder}) => $isOrder ? css`
      padding: 0 17% 0 40px;
      justify-content: space-between;
      width: inherit;
    ` : ''};
  }
` 

export const InfoContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 13vw;

  /* @media (max-width: 2200px) {
    min-width: 15vw;
  }

  @media (max-width: 1880px) {
    min-width: 17vw;
  }

  @media (max-width: 1520px) {
    min-width: 23vw;
  }

  @media (max-width: 1060px) {
    min-width: 22vw;
    flex-direction: column;
    margin: auto 20px;
  } */

  @media (max-width: 500px) {
    margin: 0;
  }
` 

export const Title = styled.h3`
  font-size: 36px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  white-space: nowrap;
  width: 220px;

  @media (max-width: 1060px) {
    width: auto;
    font-size: 20px;
  }
`

export const Description = styled.p`
  color: #333333;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  max-width: 300px;
  margin: 0;
`

export const DeleteButtonWrap = styled.div`
`
export const DeleteButtonItself = styled.button`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  margin: 5px -12px;

  @media (max-width: 522px) {
    margin: 5px -20px;
  }
`
export const DeleteButtonIcon = styled(Image)`
  width: auto;
  height: auto;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;


export const Price = styled.p<OrderStyledProps>`
  font-size: 36px;
  font-weight: 500;
  margin: 0;
  color: black;
  white-space: nowrap;
  margin: 0 3% 0 0;
  
  @media (max-width: 1600px) {
    margin: 0px 1%;
  }

  @media (max-width: 850px) {
    /* margin: 0px 20px; */

    text-align: left;
    font-size: 24px;
    /* margin-top: 20px; */
  }

  @media (max-width: 600px) {
    margin-top: 3px !important;
  }
  
  /* @media (max-width: 522px) {
    ${({$isOrder}) => $isOrder ? 'padding-left: 40%' : ''}    
  } */

  ${({$isOrder}) => $isOrder ? css`
    @media (max-width: 522px) {
      padding-left: 40%
    }
    @media (max-width: 470px) {
      padding-left: 38%
    }
    @media (max-width: 400px) {
      padding-left: 32%
    }
  ` : css`
    @media (max-width: 522px) {
      padding-left: 25%
    }
    @media (max-width: 470px) {
      padding-left: 15%
    }
    @media (max-width: 400px) {
      padding-left: 5%
    }
  `}    

`


export const ItemProductTypeText = styled.p`
  color: red;
  text-align: center;
  width: 90px;
  font-size: 16px;
  margin-left: 3vw;

  @media (min-width: 1700px) {
    margin-left: auto
  } 

  @media (max-width: 764px) {
    margin: 0 8vw 0 0;
    width: auto;
  }
`

const orderedStyle = css`
  color: black;
  white-space: nowrap;

  @media (max-width: 522px) {
    margin: 0;
  }
`

export const OrderedAmount = styled.b`
  ${orderedStyle}
`

export const OrderedX = styled.p`
  margin: 20px 2vw;
  ${orderedStyle}

  @media (max-width: 1060px) {
    margin: 20px 6vw;
  }
  @media (max-width: 600px) {
    margin: 20px 2vw;
  }
`
