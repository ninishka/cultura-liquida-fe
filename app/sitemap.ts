import type { MetadataRoute } from 'next';
import Product, { IProduct } from '@/models/Product'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProducts();
  const productUrls = products.map((product) => ({
    url: `https://www.cultura-liquida.com/product/${product.slug}`,
    lastModified: new Date(Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...productUrls,
    {
      url: 'https://www.cultura-liquida.com/',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ];
}

async function fetchProducts() {
  try {
    const products = await Product.find<IProduct>();
    console.log('Fetched products from database for sitemap: ', products);
    return products;
  } catch (error) {
    console.error('Error fetching products for sitemap: ', error);
    throw new Error('Failed to fetch products for sitemap');
  }
}
