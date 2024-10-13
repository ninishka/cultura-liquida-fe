'use client';

import { useParams } from 'next/navigation';
import { useContext } from 'react';
import CartContext from '@/app/contexts/cartContext/cartContext'
import Formation from '@/app/components/Formation/Formation'
import Benefits from '@/app/components/Benefits/Benefits'
import Indications from '@/app/components/Indications/Indications'
import ModalComponent from '@/app/components/ModalComponent/ModalComponent'
import { productContentComponents } from '@/app/data'

const groupObjectsByTitle = arr => {
  const grouped = arr.reduce((acc, obj) => {
    if (!acc[obj.title]) {
      acc[obj.title] = [];
    }
    acc[obj.title].push(obj);
    return acc;
  }, {});

  return Object.keys(grouped).map(title => ({
    // title,
    bdData: grouped[title]
  }));
}

const getActiveComponent = (selectedItem, grouping) => {
  const staticData = productContentComponents?.find(({ itemNumber }) => itemNumber === selectedItem)
  const dynamicData = grouping?.find((item, index) => `${index + 1}` === selectedItem)

  const newFormationData = staticData?.formationData?.map(fItem => {
    let matchingBdItem;
  
    if (fItem?.type.includes('extracts')) {
      matchingBdItem = dynamicData?.bdData?.find(bItem => 
        bItem?.type === fItem.type && bItem.size === fItem.size
      );
    } 
    else if (fItem?.type.includes('capsules')) {
      matchingBdItem = dynamicData?.bdData?.find(bItem => bItem?.type === fItem.type);
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
  const { layoutData, showCart } = useContext(CartContext)

  const productProtoLogic = (slug[0].includes('melena') && "1") || (slug[0].includes('reishi') && '2') || (slug[0].includes('cola') && '3')
  const grouping = groupObjectsByTitle(layoutData);
  const f = {...getActiveComponent(productProtoLogic, grouping)}

  return (
    <div style={{ color: '#fff'}}>
      {showCart && <ModalComponent />}
      <Formation formationData={f?.formationData} />
      <Benefits 
        benefitsHeaderData={f?.benefitsHeaderData} 
        benefitsCardsData={f?.benefitsCardsData} 
      />
      <Indications indicationsImg={f?.indicationsImg}  />
    </div>
  );
};

export default ProductSections;
