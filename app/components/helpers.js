import { productContentComponents } from '@/app/data'

export const getActiveComponent = (layoutData, slug) => {
    const staticData = productContentComponents?.find(({ itemUrl }) => slug[0]?.includes(itemUrl))
  
    const newFormationData = staticData?.formationData?.map(fItem => {
      let matchingBdItem;
    
      if (fItem?.type.includes('extracts')) {
        matchingBdItem = layoutData?.find(({title, type, size}) => 
          title === fItem?.title && type === fItem.type && size === fItem.size
        );
      } 
      else if (fItem?.type.includes('capsules')) {
        matchingBdItem = layoutData?.find(bItem => bItem?.type === fItem.type);
      }  
      if (matchingBdItem) {
        return { ...fItem, ...matchingBdItem };
      }
    
      return fItem;
    });
    
    const combinedData2 = { ...staticData, formationData: newFormationData }
    return combinedData2
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



  // TODO: temp desigion to make funcion from them for checkout page test
  const productsToUpdate = (cartItems, layoutData) => cartItems.map(({ size, ingredient, amount }) => {
    const matchingItem = layoutData?.length && layoutData.find(dataItem => 
      dataItem?.size === size && 
      dataItem?.ingredient === ingredient
    );

    if (matchingItem) {
      const { _id, ...restOfValues } = matchingItem; 
      return {
          id: _id,          // id from data
          amount,  // amount from cartItems
          ...restOfValues,
      };
    }

    return null
  });

// Удаляем элементы с null
  const validPostsToUpdate = (cartItems, layoutData) => productsToUpdate(cartItems, layoutData).filter(item => item !== null);

  export const updatedProductsData = (cartItems, layoutData) => validPostsToUpdate(cartItems, layoutData).map(({ id, stock, amount, ...restOfItem }) => {
    const updatedData = {
      stock: stock - amount,
      // stockSoftHold: stock - amount, // <- prepayment holding
      // stockHardHold: stock - amount, // <- postpayment holding
      ...restOfItem,
    };

    return { id, updatedData };
  });