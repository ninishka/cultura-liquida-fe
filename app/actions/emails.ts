import { Resend } from "resend";
import Order, { IOrder } from '@/models/Order';
import OrderConfirmationEmail from "@/lib/emails/OrderConfirmationEmail";
import { getShippingCost, getProductCost, getTotalCost } from '@/helpers/pricing'

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (
    userId: string,
    products: IOrder['products'],
    form_data: { [key: string]: string }
  ): Promise<void> => {
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
 
      const { email } = form_data
  
      console.log('email', email)
  
      // const { data: clientData, error: clientError } = 
      resend.emails.send({
        from: 'Cultura Liquida <mailer@cultura-liquida.com>',
        to: email, // 'culturaliquidacol@gmail.com',
        subject: "Confirmación de pedido",
        react: OrderConfirmationEmail({ order }),
      }).catch((err) => console.error('Error sending to client:', err));
  
      console.log('1st resend.emails')

      resend.emails.send({
        from: 'Cultura Liquida <mailer@cultura-liquida.com>',
        to: 'culturaliquidacol@gmail.com',
        subject: "Nuevo pedido",
        react: OrderConfirmationEmail({ order }),
      }).catch((err) => console.error('Error sending to vendor:', err));

      console.log('2nd resend.emails')

    } catch (error) {
      console.error('Unexpected error in sendEmails:', error);
    //   throw new Error('Failed to sending email');
    }
  };
  