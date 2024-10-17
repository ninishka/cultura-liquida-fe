import localFont from "next/font/local";
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import CartProvider from './contexts/cartContext/cartProvider'
import StyledRegistry from './registry';
import { GlobalStyle } from './globalStyles';
// import { fetchProducts } from './fetching'

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

  let url
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3000';
} else {
  url = process.env.VERCEL_URL
}

console.log('url', url)
console.log('process.env.VERCEL_URL', process.env.VERCEL_URL)

const fetchProducts = async () => {
  try {
    const response = await fetch(`${url}/api/products`
      // , { next: { revalidate: 30 } }
    );
    if (!response.ok) {
      console.log('!response.ok', !response.ok)
      throw new Error('Failed to fetch products');
    }
    const data = await response.json()
    // .then(r => {
    //     const g = groupObjectsByTitle(r);
    //     return g
    // })
    console.log('data RootLayout', data?.length)
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
  }
};
  
export default async function RootLayout({ children }) {
  const layoutData = await fetchProducts()

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
