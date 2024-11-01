let url
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3000';
} else {
  url = 'https://www.cultura-liquida.com'
}

export const fetchProducts = async () => {
  console.log('fetchProducts')
  const apiUrl = `${url}/api/products`;

  try {
    const response = await fetch(apiUrl
      // TODO REV 1
      , { next: { revalidate: 1 } }
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
