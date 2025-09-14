'use client';

import React, { FC, useEffect, useState, useMemo, Suspense } from 'react'
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/redux/store/hooks'
import { productContentComponents } from '@/app/data'
import { getActiveComponent } from '@/app/components/helpers'
import { useGetProductQuery } from "@/lib/redux/slices/api";
import { toggleShowMenu } from '@/lib/redux/slices/cartSlice'
import LoadingComponent from '@/app/components/LoadingComponent/LoadingComponent';
import PerformanceOptimizer from '@/app/components/PerformanceOptimizer/PerformanceOptimizer';
import AnimatedMushroom from '@/app/components/AnimatedMushroom/AnimatedMushroom';

// Pre-allocated space containers to prevent layout shifts
const FormationPlaceholder = styled.div`
  min-height: 600px;
  width: 100%;
  background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  contain: layout style;
  margin: 0;
  padding: 0;

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const BenefitsPlaceholder = styled.div`
  min-height: 800px;
  width: 100%;
  background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  contain: layout style;
  margin: 0;
  padding: 0;
`;

const IndicationsPlaceholder = styled.div`
  min-height: 400px;
  width: 100%;
  background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  contain: layout style;
  margin: 0;
  padding: 0;
`;

// Optimized dynamic imports with proper loading states
const Formation = dynamic(() => import('@/app/components/Formation/Formation'), {
  loading: () => <FormationPlaceholder />,
  ssr: true
});

const Benefits = dynamic(() => import('@/app/components/Benefits/Benefits'), {
  loading: () => <BenefitsPlaceholder />,
  ssr: true
});

const Indications = dynamic(() => import('@/app/components/Indications/Indications'), {
  loading: () => <IndicationsPlaceholder />,
  ssr: true
});

const ModalComponent = dynamic(() => import('@/app/components/ModalComponent/ModalComponent'), {
  loading: () => null,
  ssr: false
});

const ProductContainer = styled.div`
  color: #fff;
  contain: layout style;
  min-height: 100vh;
`;

const ProductSections: FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch()
  const { showCart, showMenu } = useAppSelector(state => state.cart);
  const { data, isLoading, error } = useGetProductQuery('');
  const [componentsLoaded, setComponentsLoaded] = useState(false);
 
  useEffect(() => {
    return () => {
      if (showMenu) dispatch(toggleShowMenu(false));
    };
  }, [dispatch, showMenu]) 

  // Optimized component loading with minimal delay
  useEffect(() => {
    if (data && !isLoading) {
      // Minimal delay for better performance
      const timer = setTimeout(() => setComponentsLoaded(true), 25);
      return () => clearTimeout(timer);
    }
  }, [data, isLoading]);

  const staticData = useMemo(() => 
    productContentComponents.filter(({itemUrl}) => slug?.[0]?.includes(itemUrl)),
    [slug]
  );


  if (!data || !componentsLoaded) {
    return (
      <PerformanceOptimizer>
        <AnimatedMushroom />
      </PerformanceOptimizer>
    );
  }

  const f = {...getActiveComponent(data, slug)}

  return (
    <PerformanceOptimizer>
      <ProductContainer>
        {showCart && <ModalComponent data={data} />}
        <Suspense fallback={<FormationPlaceholder />}>
          <Formation formationData={f?.formationData} isLoading={isLoading} error={error} />
        </Suspense>
        <Suspense fallback={<BenefitsPlaceholder />}>
          <Benefits 
            benefitsHeaderData={staticData?.[0]?.benefitsHeaderData} 
            benefitsCardsData={staticData?.[0]?.benefitsCardsData} 
          />
        </Suspense>
        <Suspense fallback={<IndicationsPlaceholder />}>
          <Indications indicationsImg={staticData?.[0]?.indicationsImg}  />
        </Suspense>
      </ProductContainer>
    </PerformanceOptimizer>
  );
};

export default ProductSections;