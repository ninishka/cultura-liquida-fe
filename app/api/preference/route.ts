import { NextResponse } from 'next/server';
import { createPreference } from '@/app/actions/payment';

export async function POST(request) {
  try {
    const { orderId, shippingCost, cartItems, formValues } = await request.json();
    const preferenceResult = await createPreference(orderId, shippingCost, cartItems, formValues);

    return NextResponse.json({ preferenceId: preferenceResult.id });
  } catch (error) {
    console.error("Error creating preference:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}