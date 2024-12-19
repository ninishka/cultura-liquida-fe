import { productContentComponents } from '@/app/data'

export const getActiveComponent = (layoutData, slug) => {
    const staticData = productContentComponents?.find(({ itemUrl }) => slug[0]?.includes(itemUrl))
    const filtredServerData = layoutData?.filter(i => i?.title === staticData?.formationData?.[0]?.title)
  
    const newFormationData = staticData?.formationData?.map((fItem, index) => {
      return { ...fItem, ...filtredServerData?.[index] };
    });
  
  return { ...staticData, formationData: newFormationData }
}

export const nameSurnameValidator = [
  {
    required: true,
    message: 'Este campo es obligatorio',
  },
  {
    // allows only letters and spaces
    validator: (rule, value) => { 
      const letterAndSpaceRegex = /^[a-zA-Z\s]+$/;
      
      if (!letterAndSpaceRegex.test(value)) {
        return Promise.reject(
          new Error('Solo se permiten letras y espacios.')
        );
      }
      
      return Promise.resolve();
    },
  },
]

export const init = (slug) => slug[0].includes("melena") 
  ? ((slug[0].includes('capsules') && "1") || (slug[0].includes('100ml') && "2") || (slug[0].includes('30ml') && "3")) 
  : (((slug[0].includes('100ml') && "1") || (slug[0].includes('30ml') && "2")))

export const calculateTotalSum = cards => {
  const num = cards.reduce((total, card) => total + card.price * card.amount, 0);
  const deliveryIncluded = num + 15000
  return deliveryIncluded
};

export const totalSumStyledByDot = (sum, spec = '.') => {
  let parts = sum.toString().split(spec);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, spec);
  return parts.join(spec);
}


export const decrease = (count, setCount, isModal, dispatch, addToCart, item) => {
  if (count > 1) setCount(count - 1)
  if (isModal) dispatch(addToCart({...item, amount: count - 1, isModal: true}))
}

export const increase = (count, setCount, isModal, dispatch, addToCart, item) => {
  setCount(count + 1)
  if (isModal) dispatch(addToCart({...item, amount: count + 1, isModal: true}))
}

export const handleDelete = (itemId, cartItems, dispatch) => {
  const item = cartItems.filter(item => item?.id === itemId)
  dispatch(removeFromCart(...item, 0, true))
}