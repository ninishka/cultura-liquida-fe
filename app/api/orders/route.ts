import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrdersByUser, updateOrder } from '@/app/actions/orders';
import Order from '@/models/Order';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId, products, totalPrice, form_data } = await request.json();
    const newOrder = await createOrder(userId, products, totalPrice, form_data);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const userId = request.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  console.log('Received userId:', userId);

  try {
    const orders = await getOrdersByUser(userId);
    console.log('Fetched orders:', orders);

    if (orders.length === 0) {
      return NextResponse.json({ message: 'No orders found for user' }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/orders:', error);
    return NextResponse.json({ error: 'Error fetching orders', details: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId, updatedData } = await request.json();
    console.log('updatedData', updatedData)

    if (!userId || !updatedData) {
      return NextResponse.json({ error: 'Missing userId or updatedData' }, { status: 400 });
    }

    const order = await updateOrder(userId, updatedData);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error updating api order:', error);
    return NextResponse.json({ error: 'Failed to update api order' }, { status: 500 });
  }
}