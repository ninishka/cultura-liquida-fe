// const groupObjectsByTitle = arr => {
//     const grouped = arr?.reduce((acc, obj) => {
//       if (!acc[obj.title]) {
//         acc[obj.title] = [];
//       }
//       acc[obj.title].push(obj);
//       return acc;
//     }, {});
  
//     return Object.keys(grouped).map(title => ({
//       // title,
//       bdData: grouped[title]
//     }));
//   }
  

let url
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3000';
} else {
  url = `https://${process.env.VERCEL_URL}`
}

console.log('url', url)
console.log('process.env.VERCEL_URL', process.env.VERCEL_URL)

export const fetchProducts = async () => {
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
