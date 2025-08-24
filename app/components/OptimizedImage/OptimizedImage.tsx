'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const ImageContainer = styled.div<{ aspectRatio: number }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => (1 / props.aspectRatio) * 100}%;
  overflow: hidden;
  background-color: #f0f0f0;
  contain: layout style;
`;

const StyledImage = styled(Image)<{ loaded: boolean }>`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  opacity: ${props => props.loaded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  contain: layout style;
`;

const Skeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  contain: layout style;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const aspectRatio = width / height;

  useEffect(() => {
    // Preload image for better performance
    if (priority) {
      const img = document.createElement('img');
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
      img.src = src;
    }
  }, [src, priority]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <ImageContainer aspectRatio={aspectRatio} className={className}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          color: '#666',
          fontSize: '14px'
        }}>
          Error loading image
        </div>
      </ImageContainer>
    );
  }

  return (
    <ImageContainer aspectRatio={aspectRatio} className={className}>
      {!loaded && <Skeleton />}
      <StyledImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loaded={loaded}
        onLoad={handleLoad}
        onError={handleError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ width: 'auto', height: 'auto' }}
      />
    </ImageContainer>
  );
};

export default OptimizedImage; 