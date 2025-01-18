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





// PAY U onFinish
// const [payUurl, setPayUurl] = useState('')
// const onFinish = async (values) => {
//   setLoading(true);
//   const mockedFormValues = {
//       name: "One",
//       surname: "One",
//       document_type: "cc",
//       id_number: "123456789",
//       mail_address: "123",
//       state: "ANT",
//       city: "Abejorral",
//       phone_number: "3107883758",
//       email: "first@gmail.com",
//       remember: true,

//       // fields from FORM PAYU example
//       merchantId: process.env.PAYU_API_MERCHANT,
//       accountId: process.env.PAYU_ACCOUNT_ID,
//       referenceCode: 'TestPayU',
//       amount: 1,
//       signature: 'dc950c409aed0cfc440400650bef8ec2360fcc779638ed5a2b400f48a9471eaa',
//       taxReturnBase: 16806,
//       responseUrl: `${process.env.PATH_TO_API}/check-out/success`,
//       confirmationUrl: `${process.env.PATH_TO_API}/check-out/pending`,
//       shippingAddress: 'ANT',
//       shippingCity: 'Abejorral',
//       shippingCountry: 'CO',
//       currency: 'COP',
//       buyerEmail: "first@gmail.com"
//   }
//   try {
//     const response = await fetch('/api/payu', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 
//         // 'Accept': 'application/json', // anyway 
//       },
//       body: JSON.stringify({ cartItems, formValues: mockedFormValues }),
//     });

//     // const data = await response.json();
//     // console.log('data', data)
//     // if (data.paymentUrl) {
//     //   setPayUurl(data.paymentUrl)
//     //   // router.push(data.paymentUrl);
//     // } else {
//     //   console.error('Missing paymentUrl in PayU response');
//     // }

//     // madness below
//     // if (response.headers.get('content-type')?.includes('text/html')) {
//     //   const html = await response.text();
//     //   document.body.innerHTML = html; // Вставить HTML прямо в DOM
//     // }

//     // auto sendind data form
//     if (response.ok) {
//       const { redirectUrl, formData } = await response.json();
    
//       const form = document.createElement('form');
//       form.method = 'POST';
//       form.action = redirectUrl;
    
//       Object.keys(formData).forEach(key => {
//         const input = document.createElement('input');
//         input.type = 'hidden';
//         input.name = key;
//         input.value = formData[key];
//         form.appendChild(input);
//       });
    
//       document.body.appendChild(form);
//       form.submit(); // Отправляем форму
//     } else {
//       console.error('Error processing PayU transaction:', await response.json());
//     }
//   } catch (error) {
//     console.error('Error processing PayU preference:', error);
//   } finally {
//     setLoading(false);
//   }
// };