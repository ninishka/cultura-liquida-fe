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

export async function processPaymentInfoAsync(resourceId: string, setRespStatus) {
  try {
    const infoResponse = await fetch(`/api/info?id=${resourceId}`);
    if (!infoResponse.ok) {
      throw new Error(`Failed to fetch payment info: ${infoResponse.status}`);
    }
    const info = await infoResponse.json();

    const updateResponse = await fetch(`/api/orders?orderId=${info.external_reference}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: info.external_reference,
        updatedData: {
          mp_data: {
            amount: info.net_amount,
            payment_id: info.id, 
            status: info.status,
            payment_type: info.payment_type_id,
            collector_id: info.collector_id,
            date_created: info.date_created,
            merchant_account_id: info.merchant_account_id,
            processing_mode: info.processing_mode,
            merchant_order_id: info.order.id
          },
          status: info.status
        },
      }),
    });

    if (!updateResponse.ok) {
      throw new Error(`Failed to update order: ${updateResponse.status}`);
    }
    const updatedOrder = await updateResponse.json();
    setRespStatus(updatedOrder?.status);
    
    // console.log(`Successfully processed payment ${info.id} for order ${info.external_reference}`);
    
    try {
      const fullOrderResponse = await fetch(`/api/orders?orderId=${info.external_reference}`);
      const data = await fullOrderResponse.json();
      sendOrderEmails(data)
    } catch (err) {
      console.error('Error sending email from webhook:', err);
    }
  } catch (error) {
    console.error('Error in processPaymentInfoAsync:', error);
  }
}