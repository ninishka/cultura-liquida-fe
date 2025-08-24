import React from 'react';
import localFont from "next/font/local";
import Script from 'next/script';
import { GlobalStyle } from '@/app/globalStyles';
import StyledRegistry from '@/lib/registry';
import { ReduxProvider } from "@/lib/redux/providers/ReduxProvider";
import HeaderComponent from '@/app/components/HeaderComponent/HeaderComponent'
import FooterComponent from '@/app/components/FooterComponent/FooterComponent'
import ComponentPreloader from '@/app/components/ComponentPreloader/ComponentPreloader'
import PerformanceMonitor from '@/app/components/PerformanceMonitor/PerformanceMonitor'
import DataProvider from '@/app/components/DataProvider/DataProvider'
import ErrorBoundary from '@/app/components/ErrorBoundary/ErrorBoundary'
import ConsoleErrorHandler from '@/app/components/ConsoleErrorHandler/ConsoleErrorHandler'
import { isProd } from '@/helpers/constants'

const mohave = localFont({
  src: "./fonts/Mohave-VariableFont_wght.ttf",
  variable: "--font-mohave",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

const criticalCSS = `
  body {
    font-family: var(--font-mohave);
    background-color: #333;
    margin-top: 0;
    overflow-x: hidden;
    contain: layout style;
  }
  main {
    background-color: #333;
    color: #fff;
    contain: layout style;
  }
  * {
    box-sizing: border-box;
  }
`;

export const metadata = {
  title: "Cultura Líquida",
  description: "Potencia tu salud con hongos medicinales de la más alta calidad. Descubre los beneficios de los hongos medicinales para tu bienestar físico y mental.",
  keywords: "hongos medicinales, reishi, melena de león, chaga, cordyceps, salud natural, suplementos",
  author: "Cultura Líquida Team",
  copyright: "© 2025 Cultura Líquida. All rights reserved.",
  robots: {
    index: true,
    follow: true, 
  },
  metadataBase: new URL('https://www.cultura-liquida.com'),
  alternates: {
    canonical: 'https://www.cultura-liquida.com',
  },
  openGraph: {
    title: "Cultura Líquida",
    description: "Potencia tu salud con hongos medicinales de la más alta calidad. Descubre los beneficios de los hongos medicinales para tu bienestar físico y mental.",
    url: 'https://www.cultura-liquida.com',
    siteName: 'Cultura Líquida',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/icons/CL-703.png',
        width: 1200,
        height: 630,
        alt: 'Cultura Líquida - Hongos Medicinales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cultura Líquida",
    description: "Potencia tu salud con hongos medicinales de la más alta calidad.",
    images: ['/icons/CL-703.png'],
  },
  other: {
    'theme-color': '#333333',
    'color-scheme': 'dark',
  },
};
  
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/CL-703.png" />
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/icons/main-me.webp" />
        <link rel="preload" as="image" href="/icons/main-mc.webp" />
        <link rel="preload" as="image" href="/icons/main-c.webp" />
        <link rel="preload" as="image" href="/icons/main-r.webp" />
        <link rel="preload" as="image" href="/icons/CL-703.png" />
        <link rel="preload" as="image" href="/icons/CL-71M.png" />
        
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Defer non-critical scripts */}
        {isProd && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=AW-17259177669"
              strategy="lazyOnload"
            />
            <Script id="google-ads" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-17259177669', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${mohave.variable}`} style={{ margin: 0 }}>
         <StyledRegistry>
           <GlobalStyle />
             <ReduxProvider>
                <DataProvider>
                  <ErrorBoundary>
                    <ConsoleErrorHandler />
                    <ComponentPreloader>
                      <HeaderComponent />
                        <main style={{ maxWidth: '1920px', margin: '0 auto', padding: '0 20px' }}>
                          {children}
                        </main>
                      <FooterComponent />
                    </ComponentPreloader>
                    <PerformanceMonitor enabled={!isProd} />
                  </ErrorBoundary>
                </DataProvider>
             </ReduxProvider>
         </StyledRegistry>
      </body>
    </html>
  );
}
