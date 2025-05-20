import { sendOrderEmails } from '@/helpers/data';

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

const checkPaymentStatus = async (orderData) => {
    try {
      if (orderData?.mp_data?.payment_id) {
        const paymentId = orderData.mp_data.payment_id;
        console.log(`Checking payment status for payment ID: ${paymentId}`);
        
        const infoResponse = await fetch(`/api/info?id=${paymentId}`);
        
        if (!infoResponse.ok) {
          console.error(`Error fetching payment info: ${infoResponse.status}`);
          return;
        }
        
        const info = await infoResponse.json();
        console.log(`Payment info received:`, info);
        
        if (info?.status === 'approved') {
          console.log('Payment approved, sending order email');
          sendOrderEmails(orderData);
          console.log('Order email sent successfully');
        } else {
          console.log(`Payment status is not approved: ${info?.status}`);
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
};

export const updateOrderCheckout = async (orderIdParam, mp_data, setRespStatus) => {
  try {
    console.log('Updating order with MP data');
    
    const response = await fetch(`/api/orders?orderId=${orderIdParam}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderIdParam,
        updatedData: {
          mp_data,
          status: mp_data?.status
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update order: ${response.status}`);
    }

    const updatedOrder = await response.json();
    setRespStatus(updatedOrder?.status);
    
    console.log('Order updated, now checking payment status');
    
    await checkPaymentStatus(updatedOrder);
  } catch (error) {
    console.error('Error in fetchData:', error);
  }
};