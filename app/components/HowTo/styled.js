import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

export const HowToSection = styled.section`
  margin: 40vh 0; 

  @media (max-width: 1100px) {
    margin: 30vh 0 20vh ; 
  }
`

export const HowToWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1200px) {
    justify-content: space-around;
    flex-wrap: wrap;
  }

  @media (max-width: 630px) {
    flex-direction: column;
  }
`

export const TextForHeader = styled.h2`
 font-size: 48px;
 font-weight: 600;
 line-height: 57.6px;
 letter-spacing: 2%;
 margin: 70px 2vh 20px;
 text-align: center;
 text-transform: uppercase;

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
  /* width: 285px; */
  width: 22vw;

  border-radius: 16px;
  background-color: #2D2D2D;
  text-align: center;
  position: relative;

  margin: 20px;

  @media (min-width: 1201px) {
    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 1200px) {
    margin: 20px 5vw;
    width: 35vw
  }

  @media (max-width: 630px) {
    width: -webkit-fill-available;
  }
`

export const First = styled.div`
  display: block;
  @media (max-width: 1200px) {
    display: none;
  }

  @media (max-width: 630px) {
    display: block;
    transform: rotate(90deg);
  }
`

export const Second = styled.div`
  display: none;
  @media (max-width: 1200px) {
    display: block;
  }
  @media (max-width: 630px) {
    display: none;
  }
`


export const HowToImage = styled(Image)`
  width: 160px;
  height: 160px;
`

export const DescWrapper = styled.div`
  margin: 0px 20px 20px;
`

export const HowToDesc = styled.p`
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
  height: auto;
  background-color: #2D2D2D;

  @media (max-width: 1200px) {
    margin: 0px 5.4vw;
  }
`

export const ReviewText = styled.p`
 color: #F2C94C;
 text-align: center;
 padding: 20px;

`

export const ReviewLink = styled(Link)`
  color: #F2C94C;
  text-align: center;
  padding: 20px;
  text-decoration: none;
  display: flex;
  justify-content: center;

  @media (max-width: 1200px) {
    margin-bottom: 40px;
  }
`