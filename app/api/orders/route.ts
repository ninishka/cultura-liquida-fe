import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrdersByUser, getOrderById, updateOrder, deleteOrder } from '@/app/actions/orders';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId, products, form_data } = await request.json();
    const newOrder = await createOrder(userId, products, form_data);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const userId = request.nextUrl.searchParams.get('userId');
  const page = parseInt(request.nextUrl.searchParams.get('page'));
  const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize'));
  const orderId = request.nextUrl.searchParams.get('orderId');

  if (!userId && !orderId) {
    return NextResponse.json({ error: 'Missing userId or orderId' }, { status: 400 });
  }

  try {
    if (orderId) {
      const order = await getOrderById({orderId});
      if (!order) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });
      }


      return NextResponse.json(order, { status: 200 });
    } 

    if (userId) {
      const orders = await getOrdersByUser(userId, page, pageSize);
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


export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const orderId = request.nextUrl.searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
  }

  try {
    const deletedOrder = await deleteOrder(orderId);
    if (!deletedOrder) {
      return NextResponse.json({ message: 'Order not found or could not be deleted' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Order successfully deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Failed to delete order', details: error.message }, { status: 500 });
  }
}