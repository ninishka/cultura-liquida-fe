import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrdersByUser, getOrderById, updateOrder } from '@/app/actions/orders';
import Order from '@/models/Order';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId, products, totalPrice, form_data } = await request.json();
    const newOrder = await createOrder(userId, products, totalPrice, form_data);
    console.log('Order newOrder', newOrder);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const userId = request.nextUrl.searchParams.get('userId');
  const orderId = request.nextUrl.searchParams.get('orderId');

  if (!userId && !orderId) {
    return NextResponse.json({ error: 'Missing userId or orderId' }, { status: 400 });
  }

  try {
    if (orderId) {
      const order = await getOrderById(orderId);
      if (!order) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });
      }


      return NextResponse.json(order, { status: 200 });
    } 

    if (userId) {
      const orders = await getOrdersByUser(userId);
      if (orders.length === 0) {
        return NextResponse.json({ message: 'No orders found for user' }, { status: 404 });
      }
      return NextResponse.json(orders, { status: 200 });
    }
  } catch (error) {
    console.error('Error in GET /api/orders:', error);
    return NextResponse.json({ error: 'Error fetching orders', details: error.message }, { status: 500 });
  }
}


export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { orderId, updatedData } = await request.json();
    console.log('updatedData', updatedData)

    if (!orderId || !updatedData) {
      return NextResponse.json({ error: 'Missing orderId or updatedData' }, { status: 400 });
    }

    const order = await updateOrder(orderId, updatedData);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error updating api order:', error);
    return NextResponse.json({ error: 'Failed to update api order' }, { status: 500 });
  }
}