import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrdersByUser, updateOrderStatus } from '@/app/actions/orders';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId, products, totalPrice } = await request.json();
    const newOrder = await createOrder(userId, products, totalPrice);
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

  try {
    const orders = await getOrdersByUser(userId);
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}
