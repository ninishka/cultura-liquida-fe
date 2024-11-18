import React from 'react';
import localFont from "next/font/local";
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import StyledRegistry from './registry';
import { GlobalStyle } from './globalStyles';
import {ReduxProvider} from "@/lib/redux/providers/ReduxProvider";

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
  return (
    <html lang="es">
      <body className={`${mohave.variable}`}>
         <StyledRegistry>
           <GlobalStyle />
             <ReduxProvider>
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
//  export const revalidate = 5;

//  export const dynamic = 'force-dynamic';
// this param removing ○  (Static) from /
// with this param fetching.js recieve new data in reloading time
// without this param fetching.js file do not revalidate EVEN after reload - has same data