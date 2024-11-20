'use client';

import React, { FC } from 'react'
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/store/hooks'
import { productContentComponents } from '@/app/data'
import { getActiveComponent } from '@/app/components/helpers'
import { useGetProductQuery } from "@/lib/redux/slices/api";

import Formation from '@/app/components/Formation/Formation'
import Benefits from '@/app/components/Benefits/Benefits'
import Indications from '@/app/components/Indications/Indications'
import ModalComponent from '@/app/components/ModalComponent/ModalComponent'

const ProductSections: FC = () => {
  const { slug } = useParams();
  const { showCart } = useAppSelector(state => state.cart);
  const { data, isLoading, error } = useGetProductQuery('');
 
  const staticData = productContentComponents.filter(({itemUrl}) => slug?.[0]?.includes(itemUrl))
  const f = {...getActiveComponent(data, slug)}

  return (
    <div style={{ color: '#fff'}}>
      {showCart && <ModalComponent data={data} />}
      <Formation formationData={f?.formationData} isLoading={isLoading} error={error} formationDataStatic={staticData?.[0]} />
      <Benefits 
        benefitsHeaderData={staticData?.[0]?.benefitsHeaderData} 
        benefitsCardsData={staticData?.[0]?.benefitsCardsData} 
      />
      <Indications indicationsImg={staticData?.[0]?.indicationsImg}  />
    </div>
  );
};

export default ProductSections;
// export const dynamic = 'force-dynamic'