'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const OptimizedContainer = styled.div`
  /* Prevent layout shifts */
  contain: layout style paint;
  
  /* Optimize rendering */
  will-change: auto;
  
  /* Reduce repaints */
  transform: translateZ(0);
  backface-visibility: hidden;
  
  /* Smooth animations */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optimize fonts loading
    const optimizeFonts = () => {
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded');
        });
      }
    };

    // Reduce layout shifts with intersection observer
    const preventLayoutShifts = () => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          },
          { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('[data-lazy]');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
      }
    };

    // Optimize animations for users who prefer reduced motion
    const optimizeAnimations = () => {
      if (window.matchMedia) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
          document.documentElement.style.setProperty('--animation-duration', '0.1s');
        }
      }
    };

    optimizeFonts();
    preventLayoutShifts();
    optimizeAnimations();
  }, []);

  return (
    <OptimizedContainer ref={containerRef}>
      {children}
    </OptimizedContainer>
  );
};

export default PerformanceOptimizer; 