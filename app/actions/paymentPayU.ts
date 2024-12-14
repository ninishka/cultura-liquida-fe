'use server';

import crypto from 'crypto';

export const generatePayUSignature = (apiKey, merchantId, referenceCode, txValue, currency) => {
  const rawString = `${apiKey}~${merchantId}~${referenceCode}~${txValue}~${currency}`;
  return crypto.createHash('md5').update(rawString).digest('hex'); // или 'sha256'
};

// const PAYU_URL = 'https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi';

// const PAYU_URL = 'https://test.payu.in/merchant/postservice.php?form=2' 


// JAVA

// URL for test: https://sandbox.api.payulatam.com/payments-api/
// PayU.paymentsUrl = “https://api.payulatam.com/payments-api/”;
// URL for test: https://sandbox.api.payulatam.com/reports-api/
// PayU.reportsUrl = “https://api.payulatam.com/reports-api/”;

// PHP


// URL for test: https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi
// Environment::setPaymentsCustomUrl(“https://api.payulatam.com/payments-api/4.0/service.cgi”);
// URL for test: https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi
// Environment::setReportsCustomUrl(“https://api.payulatam.com/reports-api/4.0/service.cgi”);

// const PAYU_URL = 'https://sandbox.api.payulatam.com/payments-api/';




// Test: https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/
// Production: https://checkout.payulatam.com/ppp-web-gateway-payu/

const PAYU_URL = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/';



export const createPayUPreference = async (cartItems, formValues) => {
  if (!cartItems || !cartItems.length) {
    throw new Error('Cart is empty');
  }

  const orderId = `order-${Date.now()}`;
  const txValue = cartItems[0]?.price; // here should be total price
  const currency = 'COP';

  const signature = generatePayUSignature(
    process.env.PAYU_API_KEY,
    process.env.PAYU_MERCHANT_ID,
    orderId,
    txValue,
    currency
  );

  const { name, surname, email, phone_number, street_name, city } = formValues;

  console.log('signature', signature)

  // const paymentRequest = {
  //   language: 'es',
  //   command: 'SUBMIT_TRANSACTION',
  //   merchant: {
  //     apiKey: process.env.PAYU_API_KEY,
  //     apiLogin: process.env.PAYU_API_MERCHANT,
  //   },
  //   transaction: {
  //     order: {
  //       accountId: process.env.PAYU_ACCOUNT_ID,
  //       referenceCode: orderId,
  //       description: 'Purchase at Your Store',
  //       language: 'es',
  //       signature,
  //       buyer: {
  //         merchantBuyerId: '1',
  //         fullName: `${name} ${surname}`,
  //         emailAddress: email,
  //         contactPhone: phone_number,
  //         shippingAddress: {
  //           street1: street_name,
  //           city,
  //           country: 'CO',
  //         },
  //       },
  //       shippingAddress: {
  //         street1: street_name,
  //         city,
  //         country: 'CO',
  //       },
  //       additionalValues: {
  //         TX_VALUE: {
  //           value: txValue,
  //           currency,
  //         },
  //       },
  //     },
  //     payer: {
  //       fullName: `${name} ${surname}`,
  //       emailAddress: email,
  //       contactPhone: phone_number,
  //     },
  //     // creditCard: null, //
  //     type: 'AUTHORIZATION_AND_CAPTURE',
  //     // paymentMethod: 'PSE', //
  //     paymentCountry: 'CO',
  //   },
  //   test: true, // Sandbox mode
  // };

  // Banking?
  // const paymentRequest = {
  //   language: 'es',
  //   command: 'SUBMIT_TRANSACTION',
  //   merchant: {
  //     apiKey: process.env.PAYU_API_KEY,
  //     apiLogin: process.env.PAYU_API_MERCHANT,
  //   },
  //   transactions: [
  //     {
  //       payMethod: {
  //         value: "m"
  //       },
  //       bankAccount: {
  //         number: "80607787095718703296721164",
  //         name: "JAN KOWALSKI",
  //         // depending on the bank, the name and address may be all included in any of below fields
  //         city: "WARSZAWA",
  //         postalCode: "02-638",
  //         street: "UL.NOWOWIEJSKIEGO 8",
  //         address: "Warszawa Nowowiejskiego 8"
  //       }
  //     }
  //   ],
  //   test: true, // Sandbox mode
  // }

  // CH
  const paymentRequest = {
    language: 'es',
    command: 'SUBMIT_TRANSACTION',
    merchant: {
      apiKey: process.env.PAYU_API_KEY,
      apiLogin: process.env.PAYU_API_MERCHANT,
    },
    transaction: {
      order: {
        accountId: process.env.PAYU_ACCOUNT_ID,
        referenceCode: orderId,
        description: 'Purchase at Your Store',
        language: 'es',
        signature: process.env.SIGNATURE_MELENA_CAPSULA_1AMOUNT,
        // signature,
        buyer: {
          merchantBuyerId: '1',
          fullName: `${name} ${surname}`,
          emailAddress: email,
          contactPhone: phone_number,
          shippingAddress: {
            street1: street_name,
            city,
            country: 'CO',
          },
        },
        shippingAddress: {
          street1: street_name,
          city,
          country: 'CO',
        },
        additionalValues: {
          TX_VALUE: {
            value: txValue,
            currency,
          },
        },
      },
      payer: {
        fullName: `${name} ${surname}`,
        emailAddress: email,
        contactPhone: phone_number,
      },
      // creditCard: null, //
      type: 'AUTHORIZATION_AND_CAPTURE',
      // paymentMethod: 'PSE', //
      paymentCountry: 'CO',
    },
    test: 0, // Sandbox mode
  };

  // console.log('paymentRequest:', paymentRequest);

  const response = await fetch(PAYU_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentRequest),
  });

  const result2 = await response.text();
  
  // console.log('result2', result2)
  // const result = await response.json();

  // if (!response.ok || !result.transactionResponse) {
  //   throw new Error(result?.error || 'Failed to create PayU transaction');
  // }

  // return {
  //   paymentUrl: result?.transactionResponse?.extraParameters?.BANK_URL || '',
  // };

  return result2
};
