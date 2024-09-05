import {
  BuyWrap,
  AmountWrapper,
  AmountItem,
  Prev,
  Next,
  Number,
  ArrowButtons,
  BuyButton,
  Price,
} from'./styled'


import arrownext from '../../assets/icons/arrow_next.svg'
import arrowprev from '../../assets/icons/arrow_prev.svg'


const Counter = ({ count, setCount, noBtn }) => (                             
  <BuyWrap>
    <AmountWrapper>
      <AmountItem>
        <ArrowButtons onClick={() => {
          if(count > 1)  setCount(count - 1)
        }}>
          <Prev src={arrowprev}/>
        </ArrowButtons>
        {/* invisible button is still working around img, need  fix later */}
        <Number>{count}</Number>
        <ArrowButtons  onClick={() => setCount(count + 1)}>
          <Next src={arrownext}/>
        </ArrowButtons>
      </AmountItem>  
      {!noBtn && <BuyButton>Comprar</BuyButton>}
    </AmountWrapper>
    <Price>90 000 COP</Price>
  </BuyWrap>
)
export default Counter