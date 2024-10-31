'use server'

import Post from '@/models/Post'
import { revalidateTag } from 'next/cache'

interface Product extends Document {
  title: string;
  description: string;
  ingredient: string;
  type: string;
  size?: string;
  price: number;
  stock: number;
}

// type PlainProduct = Omit<Product, '_id'> & { _id?: string };

const getProduct = async (): Promise<Product[]> => {
  try {
      const products = await Post.find().lean();
      // console.log('Fetched products:', products);
      console.log('getProduct')
      console.log('getProduct', products?.[0]?.stock, products?.[2]?.stock )

      // return products;

      const plainProducts: Product[] = products.map(product => ({
        ...product,
        _id: product._id.toString(),
      }));
  
    return plainProducts;
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    throw new Error('Failed to fetch products from MongoDB');
  }
};


type UpdateProductData = Partial<Product>;

const editProduct = async (id: string, updatedData: UpdateProductData): Promise<Product | null> => {
    try {
    const updatedProduct = await Post.findByIdAndUpdate(id, updatedData, {
      new: true, // Возвращает обновленный документ
      runValidators: true // Проверяет данные по схеме
    });
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

// const editProduct = async (id, updatedData) => {
//   // REV 3  
//   // revalidateTag('products')
//     // revalidateTag('product')
//     return Post.findByIdAndUpdate(id, updatedData
//       // , { new: true }
//     )
// }


const addProduct = async post => {
  const title = post.get('title')
  const description = post.get('description')
  const ingredient = post.get('ingredient')
  const type = post.get('type')
  const size = post.get('size')
  const price = post.get('price')
  const stock = post.get('stock')

  const newProduct = new Post({ title, description, ingredient, type, size, price, stock })
  return newProduct.save()
}

// const deletePost = async id => {
//     return Post.findByIdAndDelete(id)
// }

export { addProduct, getProduct, editProduct }