'use server'

import Order, { IOrder } from '@/models/Order';
import OrderConfirmationEmail from "@/emails/OrderConfirmationEmail";
import dayjs from 'dayjs';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    await newOrder.save();
    const {
      name = 'Dear',
      surname = 'Customer',
      email,

    } = form_data

    const orderProps = {
      customerName: `${name} ${surname}`,
      orderId: newOrder._id.toString(),
      items: Array.from(products),
      total: totalPrice,
      orderDate: dayjs(newOrder.createdAt).format('YYYY-MM-DD HH:mm')
    }

    console.log('email', email)

    console.log("Created Order:", newOrder);
    console.log("orderProps", orderProps);

    const { data, error } = await resend.emails.send({
      from: 'Cultura Liquida <mailer@cultura-liquida.com>',
      to: email, // 'culturaliquidacol@gmail.com',
      subject: "Confirmación de pedido",
      react: OrderConfirmationEmail(orderProps),
    });

    // if (error) {
    //   throw new Error('Failed to send email');
    // }

    console.log('=====================')
    console.log('data, error', data, error)


    return newOrder
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

export const getOrdersByUser = async (userId: string): Promise<IOrder[]> => {
  try {
    const orders = await Order.find({ userId }).lean();
    console.log('Fetched orders:', orders?.length);
    return orders;
  } catch (error) {
    console.error('Error fetching orders for user:', userId, error);
    throw new Error('Failed to fetch orders');
  }
};


export const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  try {
    const order = await Order.findById(orderId).lean();
    console.log('Fetched order:', order);
    return order;
  } catch (error) {
    console.error('Failed to fetch order by ID:', orderId, error);
    throw new Error('Failed to fetch order by ID');
  }
};

// export const updateOrderStatus = async (orderId: string, status: string): Promise<IOrder | null> => {
//   try {
//     return await Order.findByIdAndUpdate(orderId, { status, updatedAt: new Date() }, { new: true });
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     throw new Error('Failed to update order status');
//   }
// };


interface UpdatedData {
  [key: string]: any;
}

export const updateOrder = async (orderId: string, updatedData: UpdatedData) => {
  try {
    if (!orderId || !updatedData) {
      throw new Error('Missing orderId or updatedData');
    }

    const order = await Order.findByIdAndUpdate(
      orderId, 
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