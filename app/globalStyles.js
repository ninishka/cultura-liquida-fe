"use client"

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    .smooth-scroll {
      scroll-behavior: smooth;
    }

    /* @media (prefers-color-scheme: dark) {
      color-scheme: dark;
    } */
  }

  body {
    font-family: var(--font-mohave);
    background-color: #333;
    margin-top: 0;
    overflow-x: hidden;
    /* overflow-x: hidden;
    .using-mouse:focus {
      outline: none !important;
    } */

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
  }

  .ant-select-dropdown {
    border-radius: 16px !important;
  }
`