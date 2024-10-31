import React from 'react';
import localFont from "next/font/local";
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import StyledRegistry from './registry';
import DataFetcher from './DataFetcher';
import { GlobalStyle } from './globalStyles';
import { fetchProducts } from './fetching'
import { getProduct } from '@/app/actions/action';

import { store } from '@/app/store'
import ReduxProvider from "@/app/providers/ReduxProvider";
import { setLayoutData } from '@/app/store/slices/cartSlice'; // Adjust the import path accordingly

const mohave = localFont({
  src: "./fonts/Mohave-VariableFont_wght.ttf",
  variable: "--font-mohave",
  weight: "100 900",
});


export const metadata = {
  title: "Cultura Líquida",
  description: "Potencia tu salud con hongos medicinales",
  author: "Cultura Líquida Team",
  copyright: "© 2024 Cultura Líquida. All rights reserved.",
  robots: {
    index: true,
    follow: true,
    // googleBot: {  do we need it?
    //   index: true,
    //   follow: true,
    // },  
  },
  link:{
    rel:"icon",
    href:"./favicon.ico",
    sizes:"any"
  }

};
  //  robots.txt FILE ???
  //  Author and Copyright ?
  //  sitemap

  
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  //  const layoutData = await fetchProducts()
  let layoutData = [];
  try {
    layoutData = await getProduct(); 
  } catch (error) {
    console.error('Error in RootLayout fetching products:', error);
  }
     console.log('ROOT context', layoutData?.[0]?.stock, layoutData?.[2]?.stock)

  return (
    <html lang="es">
      <body className={`${mohave.variable}`}>
         <StyledRegistry>
           <GlobalStyle />
             <ReduxProvider>
                <DataFetcher />
                <HeaderComponent />
                  {children}
                <FooterComponent />
             </ReduxProvider>
         </StyledRegistry>
      </body>
    </html>
  );
}

//  REV 2
//  export const dynamic = 'force-dynamic';
//  export const revalidate = 5;