'use client'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLayoutData } from '@/app/store/slices/cartSlice';
import { getProduct } from '@/app/actions/action';

const LayoutDataFetcher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let layoutData = [];
      try {
        layoutData = await getProduct(); 
        dispatch(setLayoutData(layoutData));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return null;
};

export default LayoutDataFetcher;
