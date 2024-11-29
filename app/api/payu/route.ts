import { NextResponse } from 'next/server';
import { createPayUPreference } from '@/app/actions/paymentPayU';

export async function POST(request: Request) {
  try {
    const { cartItems, formValues } = await request.json();

    const payUResult = await createPayUPreference(cartItems, formValues);

    if (!payUResult.paymentUrl) {
      throw new Error('Payment URL is missing in PayU response.');
    }

    return NextResponse.json({ paymentUrl: payUResult.paymentUrl });
  } catch (error) {
    console.error('Error creating PayU preference:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
