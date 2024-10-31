'use server'

import Post from '@/models/Post'
import { revalidateTag } from 'next/cache'

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

const getProduct = async () => {
    try {
      const products = await Post.find().lean();
      // console.log('Fetched products:', products);
      console.log('getProduct')
      console.log('getProduct', products?.[0]?.stock, products?.[2]?.stock )

      // return products;

      const plainProducts = products.map(product => ({
        ...product,
        _id: product._id.toString(),
    }));
    return plainProducts;
    } catch (error) {
      console.error('Error fetching products from MongoDB:', error);
      throw new Error('Failed to fetch products from MongoDB');
    }
  };

// const deletePost = async id => {
//     return Post.findByIdAndDelete(id)
// }

const editProduct = async (id, updatedData) => {
  // REV 3  
  // revalidateTag('products')
    // revalidateTag('product')
    return Post.findByIdAndUpdate(id, updatedData
      // , { new: true }
    )
}

export { addProduct, getProduct, editProduct }