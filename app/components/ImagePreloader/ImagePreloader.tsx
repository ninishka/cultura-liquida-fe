'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ images }) => {
  useEffect(() => {
    // Предзагрузка изображений для улучшения производительности
    images.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Очистка при размонтировании
    return () => {
      const links = document.querySelectorAll('link[rel="preload"][as="image"]');
      links.forEach(link => {
        if (images.includes(link.getAttribute('href') || '')) {
          document.head.removeChild(link);
        }
      });
    };
  }, [images]);

  return null; // Этот компонент не рендерит ничего видимого
};

export default ImagePreloader;
