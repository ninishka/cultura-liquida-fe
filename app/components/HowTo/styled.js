import styled from 'styled-components'
import Image from 'next/image'

export const HowToWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 109px;
  align-items: center;
`



export const TextForHeader = styled.h2`
 font-size: 48px;
 font-weight: 600;
 line-height: 57.6px;
 letter-spacing: 2%;
 /* margin: 35px 2vh; */


 @media (max-width: 850px) {
    font-size: 40px;
    line-height: 45px;   
  }
`

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 326px;
  width: 285px;
  border-radius: 16px;
  background-color: #2D2D2D;
  text-align: center;
  position: relative;

  @media (max-width: 850px) {

  }
`

export const HowToImage = styled(Image)`
  width: 160px;
  height: 160px;

`
export const DescWrapper = styled.div`
  margin: 0px 15px;
`

export const HowToDesc = styled.p`
  /* margin: 10px 5px; */
  font-size: 16px;
  font-weight: 400;
  text-align: left;

`
export const SecondDesc = styled.p`
  color: #F2C94C;
  text-align: left;
`
 export const ArrowIcon = styled(Image)`
 width: auto;
 height: auto;
 `
export const LeaveReview = styled.div`
  border-radius: 16px;
  max-width: 100%;
  margin: 0px 19px;
  height: auto;
  background-color: #2D2D2D;
`
export const ReviewText = styled.p`
 color: #F2C94C;
 text-align: center;
 padding: 20px;
`