'use client';

import { useParams } from 'next/navigation';
import { RootState } from '@/app/store'
import Formation from '@/app/components/Formation/Formation'
import Benefits from '@/app/components/Benefits/Benefits'
import Indications from '@/app/components/Indications/Indications'
import ModalComponent from '@/app/components/ModalComponent/ModalComponent'
import { productContentComponents } from '@/app/data'
import { useSelector } from 'react-redux'

const getActiveComponent = (dynamicData, slug) => {
  const staticData = productContentComponents?.find(({ itemUrl }) => slug[0]?.includes(itemUrl))

  const newFormationData = staticData?.formationData?.map(fItem => {
    let matchingBdItem;
  
    if (fItem?.type.includes('extracts')) {
      matchingBdItem = dynamicData?.find(({title, type, size}) => 
        title === fItem?.title && type === fItem.type && size === fItem.size
      );
    } 
    else if (fItem?.type.includes('capsules')) {
      matchingBdItem = dynamicData?.find(bItem => bItem?.type === fItem.type);
    }  
    if (matchingBdItem) {
      return { ...fItem, ...matchingBdItem };
    }
  
    return fItem;
  });
  
  const combinedData2 = { ...staticData, formationData: newFormationData }
  return combinedData2
}

const ProductSections = () => {
  const { slug } = useParams();
  const { showCart, layoutData } = useSelector((state: RootState) => state.cart);
 
  const staticData = productContentComponents.filter(({itemUrl}) => slug?.[0]?.includes(itemUrl))
  const f = {...getActiveComponent(layoutData, slug)}

  return (
    <div style={{ color: '#fff'}}>
      {showCart && <ModalComponent />}
      <Formation formationData={f?.formationData} formationDataStatic={staticData?.[0]} />
      <Benefits 
        benefitsHeaderData={staticData?.[0]?.benefitsHeaderData} 
        benefitsCardsData={staticData?.[0]?.benefitsCardsData} 
      />
      <Indications indicationsImg={staticData?.[0]?.indicationsImg}  />
    </div>
  );
};

export default ProductSections;
