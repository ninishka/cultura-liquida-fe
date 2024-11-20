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

export const init = (slug) => slug[0].includes("melena") 
? ((slug[0].includes('capsules') && "1") || (slug[0].includes('100ml') && "2") || (slug[0].includes('30ml') && "3")) 
: (((slug[0].includes('100ml') && "1") || (slug[0].includes('30ml') && "2")))
