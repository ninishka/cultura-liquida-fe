'use server'

import { MercadoPagoConfig, Preference } from 'mercadopago';

// This is where the actual MP query is formed
export const createPreference = async (orderId, shippingCost, cartItems, formValues) => {
  if (!cartItems || !cartItems.length) {
    throw new Error("Verbotten: Cart is empty");
  }

  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESSTOKEN_TEST,
    // accessToken: process.env.ACCESSTOKEN,
    options: { timeout: 5000, idempotencyKey: orderId }
  });
  const preference = new Preference(client);

  // All form fields: name, surname, document_type, id_number, country, address, state, city, phone, email, notes
  const { name, surname, email, phone, id_number, document_type } = formValues
  const now = new Date()

  const items = cartItems.map(i => ({
    id: i.idCart, // Here just product name + type(if extract)
    title: i.title,
    description: i.description,
    quantity: i.quantity,
    unit_price: i.price,
    category_id: i.type, // i do not see that in MP, maybe payer in his acc can
    picture_url: i.icon?.src, // i do not see that in MP, maybe payer in his acc can
    currency_id: "COP", // In the sandbox its always shows $, on production using mb should display it correctly
  }))

  const preferenceBody = {
    items,
    back_urls: {
      success: `${process.env.PATH_TO_API}/checkout?order_id=${orderId}`,
      failure: `${process.env.PATH_TO_API}/checkout?order_id=${orderId}`,
      pending: `${process.env.PATH_TO_API}/checkout?order_id=${orderId}`,
    },
    auto_return: "approved",
    payer: {
      name, surname, email, date_created: now.toISOString(),
      phone: { area_code: '57', number: phone },
      identification: { type: document_type, number: id_number },
      // address: { street_name }
    },
    shipments: {
      // mode: 'custom',
      cost: shippingCost,
    },
    external_reference: `${orderId}`,
    statement_descriptor: 'Cultura Líquida',  // i do not see that in MP, maybe payer in his acc can
    // notification_url: "https://www.your-site.com/ipn",
  };

  console.log('preferenceBody', preferenceBody)

  return await preference.create({ body: preferenceBody });
};
