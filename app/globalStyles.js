"use client"

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --animation-duration: 0.3s;
    --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
  }

  html {
    .smooth-scroll {
      scroll-behavior: smooth;
    }

    /* Optimize font loading */
    font-display: swap;
    
    /* Reduce layout shifts */
    scroll-behavior: smooth;
    
    /* Optimize rendering */
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-mohave);
    background-color: #333;
    margin-top: 0;
    overflow-x: hidden;
    
    /* Prevent layout shifts */
    contain: layout style;
    
    /* Optimize animations */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    &::-webkit-scrollbar {
      width: 8px !important;
    }

    &::-webkit-scrollbar-thumb {
      background: #F2C94C !important;
      border-radius: 4px !important;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #F2C94C !important;
    }

    &::-webkit-scrollbar-track {
      background: #252525 !important;
      border-radius: 4px;
    }
  }

  main {
    background-color: #333;
    color: #fff;
    
    /* Prevent layout shifts */
    contain: layout style;
    
    /* Optimize rendering */
    will-change: auto;
  }

  /* Optimize images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    
    /* Prevent layout shifts */
    aspect-ratio: attr(width) / attr(height);
    
    /* Optimize loading */
    loading: lazy;
    decoding: async;
  }

  /* Optimize animations */
  * {
    box-sizing: border-box;
  }

  /* Reduce layout shifts for dynamic content */
  [data-lazy] {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity var(--animation-duration) var(--transition-timing),
                transform var(--animation-duration) var(--transition-timing);
  }

  [data-lazy].visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Optimize fonts */
  .fonts-loaded {
    font-display: swap;
  }

  /* Performance optimizations for Ant Design */
  .ant-select-dropdown {
    border-radius: 16px !important;
    contain: layout style;
  }

  /* Optimize SVG animations */
  svg {
    contain: layout style;
  }

  /* Reduce repaints for animated elements */
  .animated {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  /* Optimize text rendering */
  h1, h2, h3, h4, h5, h6, p, span, div {
    text-rendering: optimizeLegibility;
  }
`