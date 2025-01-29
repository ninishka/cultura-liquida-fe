'use server'

import Order, { IOrder } from '@/models/Order';
import OrderConfirmationEmail from "@/emails/OrderConfirmationEmail";
import dayjs from 'dayjs';
import { Resend } from "resend";
import { getShippingCost, getProductCost, getTotalCost } from '@/helpers/pricing'

const resend = new Resend(process.env.RESEND_API_KEY);

export const createOrder = async (
  userId: string,
  products: IOrder['products'],
  form_data: Record<string, string>
): Promise<IOrder> => {
  try {
    console.log('products ****************************', products)
    const totalCost = getTotalCost(products)
    const productCost = getProductCost(products)
    const shippingCost = getShippingCost(productCost)

    const newOrder = new Order({
      userId,
      products,
      totalCost,
      shippingCost,
      form_data,
      // mp_data: {}
    });
    await newOrder.save();
    const {
      name = 'Dear',
      surname = 'Customer',
      email,
      document_type,
      id_number,
      mail_address,
      state,
      city,
      phone_number
    } = form_data

    const orderProps = {
      customerName: `${name} ${surname}`,
      orderId: newOrder._id.toString(),
      items: Array.from(products),
      totalCost,
      shippingCost,
      orderDate: dayjs(newOrder.createdAt).format('YYYY-MM-DD HH:mm')
    }

    console.log('email', email)

    console.log("Created Order:", newOrder);
    console.log("orderProps", orderProps);

    const { data: clientData, error: clientError } = await resend.emails.send({
      from: 'Cultura Liquida <mailer@cultura-liquida.com>',
      to: email, // 'culturaliquidacol@gmail.com',
      subject: "Confirmación de pedido",
      react: OrderConfirmationEmail(orderProps),
    });

    // if (error) {
    //   throw new Error('Failed to send email');
    // }

    console.log('CLIENT =====================')
    console.log('data, error', clientData, clientError)


    const { data: vendorData, error: vendorError } = await resend.emails.send({
      from: 'Cultura Liquida <mailer@cultura-liquida.com>',
      to: 'culturaliquidacol@gmail.com',
      subject: "Nuevo pedido",
      react: OrderConfirmationEmail(orderProps),
    });

    console.log('Vendor =====================')
    console.log('data, error', vendorData, vendorError)


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