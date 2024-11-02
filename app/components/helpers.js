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