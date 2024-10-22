import localFont from "next/font/local";
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import CartProvider from './contexts/cartContext/cartProvider'
import StyledRegistry from './registry';
import { GlobalStyle } from './globalStyles';
import { fetchProducts } from './fetching'
import { getProduct } from '@/app/actions/action';

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
    googleBot: { // do we need it?
      index: true,
      follow: true,
    },  
  },
  link:{
    rel:"icon",
    href:"./favicon.ico",
    sizes:"any"
  }

};
  // robots.txt FILE ???
  // Author and Copyright ?
  // sitemap
  
export default async function RootLayout({ children }) {
  // const layoutData = await fetchProducts()
  let layoutData = [];
  try {
    layoutData = await getProduct(); 
    console.log('Fetched products in RootLayout:', layoutData);
  } catch (error) {
    console.error('Error in RootLayout fetching products:', error);
  }

  return (
    <html lang="es">
      <body className={`${mohave.variable}`}>
        <StyledRegistry>
          <GlobalStyle />
            <CartProvider layoutData={layoutData}>
              <HeaderComponent />
                {children}
              <FooterComponent />
            </CartProvider>
        </StyledRegistry>
      </body>
    </html>
  );
}
