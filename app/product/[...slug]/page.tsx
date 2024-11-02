'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { productContentComponents } from '@/app/data'
import { getActiveComponent } from '@/app/components/helpers'

import Formation from '@/app/components/Formation/Formation'
import Benefits from '@/app/components/Benefits/Benefits'
import Indications from '@/app/components/Indications/Indications'
import ModalComponent from '@/app/components/ModalComponent/ModalComponent'

const ProductSections = () => {
  const { slug } = useParams();
  const { showCart } = useSelector((state: RootState) => state.toggling);
  const { layoutData } = useSelector((state: RootState) => state.product);
 
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
