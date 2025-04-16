'use client';

import React, { FC, useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/redux/store/hooks'
import { productContentComponents } from '@/app/data'
import { getActiveComponent } from '@/app/components/helpers'
import { useGetProductQuery } from "@/lib/redux/slices/api";
import { toggleShowMenu } from '@/lib/redux/slices/cartSlice'

import Formation from '@/app/components/Formation/Formation'
import Benefits from '@/app/components/Benefits/Benefits'
import Indications from '@/app/components/Indications/Indications'
import ModalComponent from '@/app/components/ModalComponent/ModalComponent'

const ProductSections: FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch()
  const { showCart, showMenu } = useAppSelector(state => state.cart);
  const { data, isLoading, error } = useGetProductQuery('');
 
  useEffect(() => {
    // return () => void (showMenu && dispatch(toggleShowMenu(false))) // <-- TODO - need to fix - работает через раз ТОЛЬКО НА ПРОДЕ ОШИБКА
    return () => {
      if (showMenu) dispatch(toggleShowMenu(false));
    };
  }, [])

  const staticData = productContentComponents.filter(({itemUrl}) => slug?.[0]?.includes(itemUrl))

  if (!data) return 'Loading...'

  const f = {...getActiveComponent(data, slug)}

  return (
    <div style={{ color: '#fff'}}>
      {showCart && <ModalComponent data={data} />}
      <Formation formationData={f?.formationData} isLoading={isLoading} error={error} />
      <Benefits 
        benefitsHeaderData={staticData?.[0]?.benefitsHeaderData} 
        benefitsCardsData={staticData?.[0]?.benefitsCardsData} 
      />
      <Indications indicationsImg={staticData?.[0]?.indicationsImg}  />
    </div>
  );
};

export default ProductSections;