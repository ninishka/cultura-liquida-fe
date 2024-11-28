'use server'

import Product, { IProduct } from '@/models/Product'
import { MercadoPagoConfig, Preference } from 'mercadopago';

type UpdateProductData = Partial<IProduct>;

const getProduct = async (): Promise<IProduct[]>  => {
  console.log('getProduct starts')
  try {
      const products = await Product?.find()?.lean();
      // console.log('products', products)
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
  const size = post.get('size')
  const price = post.get('price')
  const stock = post.get('stock')

  const newProduct = new Product({ title, description, ingredient, type, size, price, stock })
  return newProduct.save()
}

const createPreference = async (cartItems, formValues) => {
  if (!cartItems || !cartItems.length) {
    throw new Error("Verbotten: Cart is empty");
  }
  const queryArray = cartItems.map(({
    idCart,
    id,
    url,
    title,
    type,
    _id,
    description,
    price,
    stock,
    ingredient,
    amount
  }) => ({
    idCart,
    id,
    url,
    title,
    type,
    _id,
    description,
    price,
    stock,
    ingredient,
    amount
  }));

  const produ = await Product.findById(queryArray[0]._id);

  const client = new MercadoPagoConfig({
        accessToken: process.env.ACCESSTOKEN_TEST,
    // accessToken: process.env.ACCESSTOKEN',
    // TODO idempotencyKey
    options: { timeout: 5000, idempotencyKey: 'abc' }
  });
  const preference = new Preference(client);

  // All form fields:
  // name, surname, document_type, id_number
  // country, mail_address, state, city
  // phone_number, email, notes

  const {
    name, surname, email, phone_number, id_number, street_name,
  } = formValues
  const now = new Date()

  const preferenceBody = {
    items: [{
      id: produ?._id,
      title: produ?.title,
      quantity: queryArray?.[0]?.amount, // ??
      unit_price: produ?.price,
      currency_id: 'COP'
    }],
    back_urls: {
      // success: "https://cultura-liquida.com/check-out/success",
      success: `${process.env.PATH_TO_API}/check-out`,
      failure: `${process.env.PATH_TO_API}/check-out`,
      pending: `${process.env.PATH_TO_API}/check-out`,
      // failure: "https://cultura-liquida.com/check-out/failure",
      // pending: "https://cultura-liquida.com/check-out/pending"
    },
    auto_return: "approved",
    payer: {
      name, surname, email, date_created: now.toISOString(),
      phone: { area_code: '57', number: phone_number },
      identification: { type: 'CC', number: id_number },
      address: { street_name }
    },
    shipments: { receiver_address: { street_name } }
  };

  return await preference.create({ body: preferenceBody });
};

export { addProduct, getProduct, editProduct, createPreference }


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



