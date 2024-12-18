'use server'

import Order, { IOrder } from '@/models/Order';

export const createOrder = async (
  userId: string,
  products: IOrder['products'],
  totalPrice: number,
  form_data: Record<string, string>
): Promise<IOrder> => {
  try {
    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      form_data,
      // mp_data: {}
    });
    return await newOrder.save();
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

export const getOrdersByUser = async (userId: string): Promise<IOrder[]> => {
  try {
    const orders = await Order.find({ userId }).lean();
    console.log('Fetched orders:', orders);
    return orders;
  } catch (error) {
    console.error('Error fetching orders for user:', userId, error);
    throw new Error('Failed to fetch orders');
  }
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<IOrder | null> => {
  try {
    return await Order.findByIdAndUpdate(orderId, { status, updatedAt: new Date() }, { new: true });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
};


interface UpdatedData {
  [key: string]: any;
}

export const updateOrder = async (userId: string, updatedData: UpdatedData) => {
  try {
    if (!userId || !updatedData) {
      throw new Error('Missing userId or updatedData');
    }

    const order = await Order.findOneAndUpdate(
      { userId },
      { ...updatedData, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    console.error('Error updating method order:', error);
    throw new Error('Failed to update method order');
  }
};