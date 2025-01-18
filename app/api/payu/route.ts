import { NextResponse } from 'next/server';
import { createPayUPreference } from '@/app/actions/paymentPayU';

export async function POST(request: Request) {
  try {
    const { cartItems, formValues } = await request.json();

    // const payUResult = await createPayUPreference(cartItems, formValues);

    // if (!payUResult.paymentUrl) {
    //   throw new Error('Payment URL is missing in PayU response.');
    // }

    // return NextResponse.json({ paymentUrl: payUResult.paymentUrl });

    // ======
    // const payUResultHtml = await createPayUPreference(cartItems, formValues);

    // return new Response(payUResultHtml, {
    //   headers: { 'Content-Type': 'text/html' },
    // });


    // ======
    const payUResultHtml = await createPayUPreference(cartItems, formValues);

    // Вытаскиваем URL из HTML вручную
    // not working anyway
    // const redirectUrl = extractUrlFromHtml(payUResultHtml); // STATUS 200
    const redirectUrl = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/'; // STATUS 307

    if (redirectUrl) {
      console.log('redirectUrl', redirectUrl)
      // return NextResponse.redirect(redirectUrl); // should be 302 Redirect
      // return NextResponse.redirect(redirectUrl, 303); // return payu 303 AND /ppp-web-gateway-payu/ - CORS error
      return NextResponse.json({ redirectUrl, formData: formValues }); // redirect tu PAYU but Error interno del servidor
    }

    // return new Response(payUResultHtml, {
    //   headers: { 'Content-Type': 'text/html' },
    // });
  } catch (error) {
    console.error('Error creating PayU preference:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

function extractUrlFromHtml(html: string): string | null {
  const match = html.match(/<form[^>]*action="([^"]*)"/); // Ищем `action` в теге `form`
  return match ? match[1] : null;
}