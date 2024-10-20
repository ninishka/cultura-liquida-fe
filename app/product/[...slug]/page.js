'use client';

import { useParams } from 'next/navigation';
import { useContext } from 'react';
import CartContext from '@/app/contexts/cartContext/cartContext'
import Formation from '@/app/components/Formation/Formation'
import Benefits from '@/app/components/Benefits/Benefits'
import Indications from '@/app/components/Indications/Indications'
import ModalComponent from '@/app/components/ModalComponent/ModalComponent'
import { productContentComponents } from '@/app/data'

const getActiveComponent = (dynamicData, slug) => {
  console.log('dynamicData s', dynamicData)
  const staticData = productContentComponents?.find(({ itemUrl }) => slug[0]?.includes(itemUrl))

  const newFormationData = staticData?.formationData?.map(fItem => {
    console.log('fItem', fItem)
    let matchingBdItem;
  
    if (fItem?.type.includes('extracts')) {
      console.log('inc extracts')
      matchingBdItem = dynamicData?.find(bItem => 
        bItem?.type === fItem.type && bItem.size === fItem.size
      );
    } 
    else if (fItem?.type.includes('capsules')) {
      console.log('inc capsules')
      matchingBdItem = dynamicData?.find(bItem => bItem?.type === fItem.type);
    }  
    if (matchingBdItem) {
      console.log('matchingBdItem', matchingBdItem)
      return { ...fItem, ...matchingBdItem };
    }

    console.log('dynamicData e', dynamicData)

  
    return fItem;
  });
  
  const combinedData2 = { ...staticData, formationData: newFormationData }
  return combinedData2
}

const ProductSections = () => {
  const { slug } = useParams();
  const { layoutData, showCart } = useContext(CartContext)
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
