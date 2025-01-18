'use server'

import { MercadoPagoConfig, Preference } from 'mercadopago';

const createPreference = async (orderId, cartItems, formValues) => {
    if (!cartItems || !cartItems.length) {
      throw new Error("Verbotten: Cart is empty");
    }
    const queryArray = cartItems.map(({
      idCart,
      id,
      title,
      type,
      icon,
      price,
      amount,
      ingredient,
      description,
    }) => ({
      idCart,
      id,
      title,
      type,
      icon,
      price,
      amount,
      ingredient,
      description,
    }));
    console.log('queryArray: ', queryArray);
  
    const client = new MercadoPagoConfig({
      accessToken: process.env.ACCESSTOKEN_TEST,
      // accessToken: process.env.ACCESSTOKEN,
      options: { timeout: 5000, idempotencyKey: 'abc' } // TODO idempotencyKey
    });
    const preference = new Preference(client);
  
    // All form fields: name, surname, document_type, id_number, country, mail_address, state, city, phone_number, email, notes
    const { name, surname, email, phone_number, id_number, street_name } = formValues
    const now = new Date()
  
    const preferenceBody = {
      items: [{
        // id: queryArray[0]._id,
        id: queryArray[0].idCart, // Here just product name + type(if extract)
        title: queryArray?.[0]?.title,
        description: queryArray?.[0]?.description,
        quantity: queryArray?.[0]?.amount,
        unit_price: queryArray?.[0]?.price,
        category_id: queryArray?.[0]?.type, // i do not see that in MP, maybe payer in his acc can
        picture_url: queryArray?.[0]?.icon?.src, // i do not see that in MP, maybe payer in his acc can
        currency_id: "COP", // In the sandbox its always shows $, on production using mb should display it correctly
      }],
      back_urls: {
        success: `${process.env.PATH_TO_API}/checkout?order_id=${orderId}`,
        failure: `${process.env.PATH_TO_API}/checkout?order_id=${orderId}`,
        pending: `${process.env.PATH_TO_API}/checkout?order_id=${orderId}`,
      },
      auto_return: "approved",
      payer: {
        name, surname, email, date_created: now.toISOString(),
        phone: { area_code: '57', number: phone_number },
        identification: { type: 'CC', number: id_number },
        address: { street_name }
      },
      shipments: { receiver_address: { street_name } },
      external_reference: `${orderId}`,
      statement_descriptor: 'Cultura Líquida',  // i do not see that in MP, maybe payer in his acc can
      // notification_url: "https://www.your-site.com/ipn",
    };
  
    return await preference.create({ body: preferenceBody });
  };

export { createPreference }
