'use server'

import Order, { IOrder } from '@/models/Order';
import OrderConfirmationEmail from "@/emails/OrderConfirmationEmail";
import { Resend } from "resend";
import { getShippingCost, getProductCost, getTotalCost } from '@/helpers/pricing'

const resend = new Resend(process.env.RESEND_API_KEY);

export const createOrder = async (
  userId: string,
  products: IOrder['products'],
  form_data: { [key: string]: string }
): Promise<IOrder> => {
  try {
    const totalCost = getTotalCost(products)
    const productCost = getProductCost(products)
    const shippingCost = getShippingCost(productCost)

    const order = new Order({
      userId,
      products,
      totalCost,
      shippingCost,
      form_data,
    });
    await order.save();

    const { email } = form_data

    console.log('email', email)

    console.log("Created Order:", order);

    // const { data: clientData, error: clientError } = 
    resend.emails.send({
      from: 'Cultura Liquida <mailer@cultura-liquida.com>',
      to: email, // 'culturaliquidacol@gmail.com',
      subject: "Confirmación de pedido",
      react: OrderConfirmationEmail({ order }),
    });


    console.log('1st resend.emails')
    // console.log('data, error', clientData, clientError)


    // const { data: vendorData, error: vendorError } = 
    resend.emails.send({
      from: 'Cultura Liquida <mailer@cultura-liquida.com>',
      to: 'culturaliquidacol@gmail.com',
      subject: "Nuevo pedido",
      react: OrderConfirmationEmail({ order }),
    });

    console.log('2nd resend.emails')

    // console.log('data, error', vendorData, vendorError)


    return order
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

export const getOrdersByUser = async (userId: string, page: number, pageSize: number): Promise<IOrder[]> => {
  try {
    const skip = (page - 1) * pageSize;
    
    const orders = await Order
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    console.log('Fetched orders:', orders?.length);
    return orders;
  } catch (error) {
    console.error('Error fetching orders for user:', userId, error);
    throw new Error('Failed to fetch orders');
  }
};


export const getOrderById = async ({ orderId }: { orderId: string }): Promise<IOrder | null> => {
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

export const deleteOrder = async (orderId: string): Promise<IOrder | null> => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId).lean();

    if (!deletedOrder) {
      console.error('Order not found:', orderId);
      return null;
    }

    console.log('Deleted order:', deletedOrder);
    return deletedOrder;
  } catch (error) {
    console.error('Failed to delete order:', orderId, error);
    throw new Error('Failed to delete order');
  }
};
