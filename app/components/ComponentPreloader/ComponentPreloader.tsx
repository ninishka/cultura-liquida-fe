'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ComponentPreloaderProps {
  children: React.ReactNode;
}

const PreloaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #333;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  contain: layout style;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

const LoadingText = styled.div`
  color: #F2C94C;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  contain: layout style;
`;

const ComponentPreloader: React.FC<ComponentPreloaderProps> = ({ children }) => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    const preloadComponents = async () => {
      try {
        // Reduced delay for better performance - only wait for critical resources
        await new Promise(resolve => setTimeout(resolve, 50));
        setIsPreloaded(true);
      } catch (error) {
        console.warn('Preloading failed:', error);
        // Still show content even if preloading fails
        setIsPreloaded(true);
      }
    };

    preloadComponents();
  }, []);

  if (!isPreloaded) {
    return (
      <PreloaderContainer>
        <LoadingText>
          Preparando experiencia...
        </LoadingText>
      </PreloaderContainer>
    );
  }

  return <>{children}</>;
};

export default ComponentPreloader; 