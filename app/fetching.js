let url
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3000';
} else {
  url = `https://${process.env.VERCEL_URL}`
}

export const fetchProducts = async () => {
  // console.log('`{url}/api/products`', `${url}/api/products`)

  const apiUrl = `${url}/api/products`;
  console.log('API URL:', apiUrl);

  try {
    const response = await fetch(apiUrl
      // , { next: { revalidate: 30 } }
    );
    if (!response.ok) {
      console.log('Response not OK, status:', response.status)
      throw new Error(`Failed to fetch products, status: ${response.status}`);
    }
    const data = await response.json()
    console.log('data RootLayout', data?.length)
    return data;
  } catch (error) {
    console.error('Fetch Error fetching products:', error); 
  } finally {
  }
};
