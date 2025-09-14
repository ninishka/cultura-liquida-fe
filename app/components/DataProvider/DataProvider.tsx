'use client';

import React, { useEffect } from 'react';
import { useGetProductQuery } from "@/lib/redux/slices/api";

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Centralized data fetching - this will be shared across all components
  const { data, isLoading, error } = useGetProductQuery('', {
    // Skip refetching if data is already available
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    // Prefetch data for better performance
    if (!data && !isLoading) {
      // Trigger initial fetch
    }
  }, [data, isLoading]);

  // Don't render anything special, just provide data to children
  return <>{children}</>;
};

export default DataProvider; 