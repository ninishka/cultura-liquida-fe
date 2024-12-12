'use server'

import Order, { IOrder } from '@/models/Order';

export const createOrder = async (userId: string, products: IOrder['products'], totalPrice: number): Promise<IOrder> => {
  try {
    const newOrder = new Order({
      userId,
      products,
      totalPrice,
    });
    return await newOrder.save();
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

export const getOrdersByUser = async (userId: string): Promise<IOrder[]> => {
  try {
    return await Order.find({ userId }).lean();
  } catch (error) {
    console.error('Error fetching orders for user:', error);
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
