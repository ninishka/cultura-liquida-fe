// app/api/preference/route.js
import { NextResponse } from 'next/server';
import { createPreference } from '@/app/actions/action';

export async function POST(request) {
  try {
    const { cartItems, formValues } = await request.json();
    const preferenceResult = await createPreference(cartItems, formValues);
    console.log('preferenceResult', preferenceResult)

    return NextResponse.json({ preference: preferenceResult });
  } catch (error) {
    console.error("Error creating preference:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// export async function POST(request) {
//     const product = await request.json();
//     const newProduct = await addProduct(product);
//     return NextResponse.json(newProduct);
// }

// export async function POST(request) {
//     try {
//         const product = await request.json()
//         const newProduct = await addPost(product)
//         return NextResponse.json(newProduct, { status: 201 })
//     } catch (error) {
//         console.error('Error creating product:', error);
//         return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
//     }
// }