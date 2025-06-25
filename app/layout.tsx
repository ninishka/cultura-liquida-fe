import React from 'react';
import localFont from "next/font/local";
import Script from 'next/script';
import { GlobalStyle } from '@/app/globalStyles';
import StyledRegistry from '@/lib/registry';
import { ReduxProvider } from "@/lib/redux/providers/ReduxProvider";
import HeaderComponent from '@/app/components/HeaderComponent/HeaderComponent'
import FooterComponent from '@/app/components/FooterComponent/FooterComponent'

const mohave = localFont({
  src: "./fonts/Mohave-VariableFont_wght.ttf",
  variable: "--font-mohave",
  weight: "100 900",
});


export const metadata = {
  title: "Cultura Líquida",
  description: "Potencia tu salud con hongos medicinales",
  author: "Cultura Líquida Team",
  copyright: "© 2025 Cultura Líquida. All rights reserved.",
  robots: {
    index: true,
    follow: true, 
  },
  link:{
    rel:"icon",
    href:"./favicon.ico",
    sizes:"any"
  },
  alternates: {
    canonical: '/product/melena-de-leon-capsules',
  },
};
  //  robots.txt FILE ???
  //  Author and Copyright ?
  //  sitemap

const isProd = process.env.NODE_ENV === 'production';

  
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('isProd', isProd)
  console.log('env', process.env.NODE_ENV)
  return (
    <html lang="es">
      <>
        {isProd && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=AW-17259177669"
              strategy="afterInteractive"
            />
            <Script id="google-ads" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-17259177669');
              `}
            </Script>
          </>
        )}
      </>
      <body className={`${mohave.variable}`} style={{ margin: 0 }}>
         <StyledRegistry>
           <GlobalStyle />
             <ReduxProvider>
                <HeaderComponent />
                  <main style={{ maxWidth: '1920px', margin: '0 auto', padding: '0 20px' }}>
                    {children}
                  </main>
                <FooterComponent />
             </ReduxProvider>
         </StyledRegistry>
      </body>
    </html>
  );
}
