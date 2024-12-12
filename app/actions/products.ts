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
  } finally {
    // console.log('finally')
    // revalidatePath('/product/[slug]', 'page')
    // revalidateTag('/product/[slug]')
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

  const newProduct = new Product({ title, description, ingredient, type, displayingType, size, price, totalStock, reservedStock, availableStock })
  return newProduct.save()
}

export { addProduct, getProduct, editProduct }


// const deletePost = async id => {
//     return Post.findByIdAndDelete(id)
// }

// const editProduct = async (id, updatedData) => {
//   // REV 3  
//   // revalidateTag('products')
//     // revalidateTag('product')
//     return Post.findByIdAndUpdate(id, updatedData
//       // , { new: true }
//     )
// }



// ==========

// const editProductWithPayment = async (id: string, data: any): Promise<Product | null> => {
//   try {
//     // data should me cartItems
//     const queryArray = req.body.map(({ id }) => id)
//   const findedPost = await Post.find({itemId: { $in: data}});

  
//   return findedPost;
// } catch (error) {
//   console.error('Error updating product:', error);
//   throw new Error('Failed to update product');
// } finally {
//   // console.log('finally')
//   // revalidatePath('/product/[slug]', 'page')
//   // revalidateTag('/product/[slug]')
// }
// }



