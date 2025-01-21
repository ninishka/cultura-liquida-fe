import { productContentComponents } from '@/app/data'
import { removeFromCart } from '@/lib/redux/slices/cartSlice'

export const getActiveComponent = (layoutData, slug) => {
  const staticData = productContentComponents?.find(({ itemUrl }) => slug[0]?.includes(itemUrl))
  const filtredServerData = layoutData?.filter(i => i?.title === staticData?.formationData?.[0]?.title)

  const newFormationData = staticData?.formationData?.map((fItem, index) => {
    return { ...fItem, ...filtredServerData?.[index] };
  });

  return { ...staticData, formationData: newFormationData }
}

export const getUpdatedProductsData = (cartItems, data) => {
  if (!Array.isArray(cartItems) || !Array.isArray(data)) {
    throw new Error("Both cartItems and data should be arrays.");
  }

  return cartItems.reduce((acc, { size, ingredient, amount }) => {
    const matchingItem = data.find(dataItem => 
      dataItem?.size === size && 
      dataItem?.ingredient === ingredient
    );

    if (matchingItem) {
      const { _id: id, availableStock, reservedStock, ...restOfValues } = matchingItem;

      acc.push({
        id,
        updatedData: {
          ...restOfValues,
          availableStock: availableStock - amount,
          reservedStock: reservedStock + amount,
        }
      });
    }

    return acc;
  }, []);
};

export const init = (slug) => slug[0].includes("melena") 
  ? ((slug[0].includes('capsules') && "1") || (slug[0].includes('100ml') && "2") || (slug[0].includes('30ml') && "3")) 
  : (((slug[0].includes('100ml') && "1") || (slug[0].includes('30ml') && "2")))
 
export const calculateSum = (cards, enivo = 0) => {
  const num = cards.reduce((total, card) => total + card.price * card.amount, 0);
  if (enivo) return num + enivo
  return num
}; 

export const totalSumStyledByDot = (sum, spec = '.') => {
  // TODO false payment case
  let parts = sum?.toString().split(spec);
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

// so here reseived all products and returns only uniques 3 of them
// this how I created Nav logic for Header, Footer and Complex
// if Ull change products order in db something can change be carefull 
export const uniqueTitles = x => x?.filter((product, index, self) => 
  index === self.findIndex(p => p.title === product.title)
);

export const formatDate = (dateString: string, lang: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(lang, options);
};

export const enivoPrice = 15000
