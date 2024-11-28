'use server'

import { MercadoPagoConfig, Preference } from 'mercadopago';
import Product from '@/models/Product'

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
  
    console.log('queryArray[0]._id', queryArray[0]._id)

    // const produ = await Product.findById(queryArray[0]._id);
  
    const client = new MercadoPagoConfig({
          accessToken: process.env.ACCESSTOKEN_TEST,
      // accessToken: process.env.ACCESSTOKEN,
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
    console.log('formValues', formValues)
    const now = new Date()
  
    const preferenceBody = {
      items: [{
        id: queryArray[0]._id,
        // title: queryArray?.title,
        title: 'MELENA DE LEON',
        quantity: queryArray?.[0]?.amount, // ??
        // unit_price: queryArray?.price,
        unit_price: 12000,
        currency_id: 'COP'
      }],
      back_urls: {
        // success: "https://cultura-liquida.com/check-out/success",
        success: `${process.env.PATH_TO_API}/check-out/success`,
        failure: `${process.env.PATH_TO_API}/check-out/failure`,
        pending: `${process.env.PATH_TO_API}/check-out/pending`,
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
  

    console.log('preferenceBody', preferenceBody)

    return await preference.create({ body: preferenceBody });
  };

export { createPreference }
