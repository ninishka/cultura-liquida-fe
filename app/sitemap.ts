import type { MetadataRoute } from 'next';
// import Product, { IProduct } from '@/models/Product'

const urlList = [
  'melena-de-leon-capsules', 'melena-de-leon-extracts-100ml', 'melena-de-leon-extracts-30ml',
  'reishi-extracts-100ml', 'reishi-extracts-30ml', 'cola-de-pavo-extracts-100ml', 'cola-de-pavo-extracts-30ml'
]

// So here I was about to create dynamic sitemap depends on actual products
// BUT on the deploy step we have a problem - to connect MongoDB
// ALL commented code is for that purpose

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const products = await fetchProducts();
  // const productUrls = products.map((product) => ({
  //   url: `https://www.cultura-liquida.com/product/${product.slug}`,
  //   lastModified: new Date(Date.now()),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }));

  const handleUrls = urlList.map(url => ({
    url: `https://www.cultura-liquida.com/product/${url}`,
    lastModified: new Date(Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    // ...productUrls,
    {
      url: 'https://www.cultura-liquida.com/',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...handleUrls
  ];
}

// async function fetchProducts() {
//   try {
//     const products = await Product.find<IProduct>();
//     console.log('Fetched products from database for sitemap: ', products);
//     return products;
//   } catch (error) {
//     console.error('Error fetching products for sitemap: ', error);
//     throw new Error('Failed to fetch products for sitemap');
//   }
// }
