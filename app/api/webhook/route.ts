import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmails } from '@/helpers/data';

import crypto from 'crypto';

export async function POST(request) {
  try {
    console.log('request', request)
    ///////////////
    const result = await request.json();
    console.log('result', result)

    const { action, data, type, live_mode, date_created } = result;

    console.log('@@@@@@@@@@ Event received')
    console.log('action', action)
    console.log('data', data)
    console.log('type', type)
    console.log('live_mode', live_mode)
    console.log('date_created', date_created)
    /////////////////

    const headers = request.headers;
    // console.log('headers', headers)

    // Obtain the x-signature value from the header
    const xSignature = request.headers.get('x-signature');
    const xRequestId = request.headers.get('x-request-id');

    // const urlParams = useParams();
    const dataID = data.id;

    // Separating the x-signature into parts
    const parts = xSignature.split(',');

    // Initializing variables to store ts and hash
    let ts;
    let hash;

    // Iterate over the values to obtain ts and v1
    parts.forEach(part => {
        // Split each part into key and value
        const [key, value] = part.split('=');
        if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            if (trimmedKey === 'ts') {
                ts = trimmedValue;
            } else if (trimmedKey === 'v1') {
                hash = trimmedValue;
            }
        }
    });

    // Obtain the secret key for the user/application from Mercadopago developers site
    const secret = process.env.WEBHOOK_KEY;

    // Generate the manifest string
    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    // Create an HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);

    // Obtain the hash result as a hexadecimal string
    const sha = hmac.digest('hex');

    if (sha === hash) {
      // processPaymentInfoAsync(result.resource).catch(error => {
      //   console.error('Background payment info processing error:', error);
      // });

      return NextResponse.json({}, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 200 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 200 });
  }
}

// async function processPaymentInfoAsync(resourceId: string) {
//   try {
//     const infoResponse = await fetch(`/api/info?id=${resourceId}`);
//     if (!infoResponse.ok) {
//       throw new Error(`Failed to fetch payment info: ${infoResponse.status}`);
//     }
//     const info = await infoResponse.json();
//     console.log('WEBHOOK INFO DATA', info)
    
//     const orderResponse = await fetch(`/api/orders?orderId=${info.external_reference}`);
//     if (!orderResponse.ok) {
//       throw new Error(`Failed to fetch order: ${orderResponse.status}`);
//     }
//     const order = await orderResponse.json();
//     console.log('WEBHOOK ORDER DATA', order)
    
//     const updateResponse = await fetch(`/api/orders?orderId=${info.external_reference}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         orderId: info.external_reference,
//         updatedData: {
//           mp_data: {
//             amount: info.net_amount,
//             payment_ids: order?.mp_data?.payment_ids ? [...order?.mp_data?.payment_ids, info.id] : [info.id], 
//             status: info.status,
//             payment_type: info.payment_type_id,
//             collector_id: info.collector_id,
//             date_created: info.date_created,
//             merchant_account_id: info.merchant_account_id,
//             processing_mode: info.processing_mode,
//             merchant_order_id: info.order.id
//           },
//           status: info.status
//         },
//       }),
//     });

//     if (!updateResponse.ok) {
//       throw new Error(`Failed to update order: ${updateResponse.status}`);
//     }
    
//     console.log(`Successfully processed payment ${info.id} for order ${info.external_reference}`);
    
//     try {
//       const fullOrderResponse = await fetch(`/api/orders?orderId=${info.external_reference}`);
//       const data = await fullOrderResponse.json();
//       console.log('WEBHOOK UPDATED ORDER DATA FOR EMAIL', data)
//       sendOrderEmails(data)
//     } catch (err) {
//       console.error('Error sending email from webhook:', err);
//     }
//   } catch (error) {
//     console.error('Error in processPaymentInfoAsync:', error);
//   }
// }
