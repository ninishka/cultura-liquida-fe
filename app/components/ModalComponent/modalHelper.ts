import { getUpdatedProductsData } from '@/app/components/helpers'
import { calculateSum } from '@/app/components/helpers'

export const fetcher = async (method, path, body, action) => {
    try {
      const response = await fetch(path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
  
      if (!response.ok) {
        console.error(`Error to ${action}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log(`Success to ${action}`/*, response*/);
      return response;
    } catch (err) {
      console.error(`Error during fetch ( ${action} ): ${err.message}`);
      throw err;
    }
  };

export const updateExistingProduct = async (cartItems, data) => {
  const updatedProductsData = getUpdatedProductsData(cartItems, data)
  const updatedProductsBody = JSON.stringify({ updates: updatedProductsData })
  await fetcher('PUT', '/api/products', updatedProductsBody, 'update products')
}

export const createNewOrder = async (cartItems, enivoPrice, values) => {
  const totalPrice = calculateSum(cartItems, enivoPrice);
  const filteredArray = cartItems.map(obj => ({
    _id: obj._id,
    title: obj.title,
    ingredient: obj.ingredient,
    type: obj.type,
    displayingType: obj.displayingType,
    amount: obj.amount,
    price: obj.price,
    idCart: obj.idCart,
    id: obj.idCart, //mb remove?
    size: obj.size,
    description: obj.description,
    icon: obj.icon
  }));
  const createOrderBody = JSON.stringify({ userId: 'mockedUserId', totalPrice, products: filteredArray, form_data: values });
  const orderResponse = await fetcher('POST', '/api/orders', createOrderBody, 'create order')
  const orderData = await orderResponse.json();
  return {orderData, filteredArray}
}

export const payment = async (orderData, filteredArray, values, paymentOption, router, setPreferenceId)  => {
  if (paymentOption === 'transfer' && orderData._id) router.push(`/checkout?order_id=${orderData._id}`)

  if (paymentOption === 'mercado') {
    const paymentBody = JSON.stringify({
      orderId: orderData._id,
      cartItems: filteredArray,
      formValues: {
        // ...mockedFormValues,
        // street_name: `${mockedFormValues.state}, ${mockedFormValues.city}, ${mockedFormValues.mail_address}`,
        ...values,
        street_name: `${values.state}, ${values.city}, ${values.mail_address}`
      },
    })
    const paymentResponse = await fetcher('POST', '/api/preference', paymentBody, 'create MercadoPago preference')
    const { preferenceId } = await paymentResponse.json();
    setPreferenceId(preferenceId);
  }
}

const mockedFormValues = {
  name: "One",
  surname: "One",
  document_type: "CC",
  id_number: "1234",
  mail_address: "123",
  state: "ANT",
  city: "Abejorral",
  country: "Colombia",
  phone_number: "3107883758",
  email: "first@gmail.com",
  notes: 'notesnotesnotesnotes'
}