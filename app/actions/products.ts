'use server'

import Product, { IProduct } from '@/models/Product'

type UpdateProductData = Partial<IProduct>;

const getProduct = async (): Promise<IProduct[]>  => {
  console.log('getProduct starts')
  try {
      const products = await Product?.find<IProduct>()?.lean();
      const plainProducts = products.map(product => ({
        _id: product._id.toString(),
        title: product.title,
        description: product.description,
        ingredient: product.ingredient,
        type: product.type,
        displayingType: product.displayingType,
        size: product.size,
        price: product.price,
        totalStock: product.totalStock,
        reservedStock: product.reservedStock,
        availableStock: product.availableStock,
        slug: product.slug
      }));
  
    return plainProducts;
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    throw new Error('Failed to fetch products from MongoDB');
  }
};

const editProduct = async (id: string, updatedData: UpdateProductData): Promise<IProduct | null> => {
    try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true, // return updated record
      // new: false,
      runValidators: true // validate data by the schema
    });
  
    
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

const addProduct = async post => {
  const title = post.get('title')
  const description = post.get('description')
  const ingredient = post.get('ingredient')
  const type = post.get('type')
  const displayingType = post.get('displayingType')
  const size = post.get('size')
  const price = post.get('price')
  const totalStock = post.get('totalStock')
  const reservedStock = post.get('reservedStock')
  const availableStock = post.get('availableStock')
  const slug = post.get('slug')

  const newProduct = new Product({ title, description, ingredient, type, displayingType, size, price, totalStock, reservedStock, availableStock, slug })
  return newProduct.save()
}

export { addProduct, getProduct, editProduct }



