import { fetcher } from '@/helpers/network'

const getUpdatedProductsData = (cartItems, data) => {
  if (!Array.isArray(cartItems) || !Array.isArray(data)) {
    throw new Error("Both cartItems and data should be arrays.");
  }

  return cartItems.reduce((acc, { size, ingredient, quantity }) => {
    const matchingItem = data.find(dataItem => 
      dataItem?.size === size && 
      dataItem?.ingredient === ingredient
    );

    if (matchingItem) {
      const { _id: id, availableStock, reservedStock, ...restOfValues } = matchingItem;

      acc.push({
        id,
        updatedData: {
          ...restOfValues,
          availableStock: availableStock - quantity,
          reservedStock: reservedStock + quantity,
        }
      });
    }

    return acc;
  }, []);
};

export const updateExistingProduct = async (cartItems, data) => {
  const updatedProductsData = getUpdatedProductsData(cartItems, data)
  const updatedProductsBody = JSON.stringify({ updates: updatedProductsData })
  await fetcher('PUT', '/api/products', updatedProductsBody, 'update products')
}

export const createNewOrder = async (cartItems, form_data) => {
  const filteredArray = cartItems.map(obj => ({
    _id: obj._id,
    title: obj.title,
    ingredient: obj.ingredient,
    type: obj.type,
    displayingType: obj.displayingType,
    quantity: obj.quantity,
    price: obj.price,
    idCart: obj.idCart,
    id: obj.idCart, //mb remove?
    size: obj.size,
    description: obj.description,
    icon: obj.icon
  }));
  const createOrderBody = JSON.stringify({ userId: 'mockedUserId', products: filteredArray, form_data });
  const orderResponse = await fetcher('POST', '/api/orders', createOrderBody, 'create order')
  const orderData = await orderResponse.json();
  return {orderData, filteredArray}
}

export const handlePayment = async (orderData, cartItems, values, paymentOption, router, setPreferenceId)  => {
  const { _id: orderId, shippingCost } = orderData


  if (paymentOption === 'transfer' && orderId) router.push(`/checkout?order_id=${orderData._id}`)

  if (paymentOption === 'mercado') {
    const paymentBody = {
      orderId,
      shippingCost,
      cartItems,
      formValues: {
        // ...mockedFormValues,
        // street_name: `${mockedFormValues.state}, ${mockedFormValues.city}, ${mockedFormValues.mail_address}`,
        ...values,
        street_name: `${values.state}, ${values.city}, ${values.mail_address}`
      },
    }

    console.log('paymentBody', paymentBody)
    const paymentResponse = await fetcher('POST', '/api/preference', JSON.stringify(paymentBody), 'create MercadoPago preference')
    const { preferenceId } = await paymentResponse.json();
    setPreferenceId(preferenceId);
  }
}

// const mockedFormValues = {
//   name: "One",
//   surname: "One",
//   document_type: "CC",
//   id_number: "1234",
//   mail_address: "123",
//   state: "ANT",
//   city: "Abejorral",
//   country: "Colombia",
//   phone_number: "3107883758",
//   email: "first@gmail.com",
//   notes: 'notesnotesnotesnotes'
// }