import { Resend } from "resend";
import OrderConfirmationEmail from "@/lib/emails/OrderConfirmationEmail";
import OrderConfirmationEmailDetailed from "@/lib/emails/OrderConfirmationEmailDetailed";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (data): Promise<void> => {
    try {
      resend.emails.send({
        from: 'Cultura Liquida <mailer@cultura-liquida.com>',
        to: data?.form_data?.email,
        subject: "Confirmación de pedido",
        react: OrderConfirmationEmail({ order: data }),
      }).catch((err) => console.error('Error sending to client:', err));
  
      // console.log('1st resend.emails')

      resend.emails.send({
        from: 'Cultura Liquida <mailer@cultura-liquida.com>',
        to: 'culturaliquidacol@gmail.com',
        subject: "Nuevo pedido",
        react: OrderConfirmationEmailDetailed({ order: data }),
      }).catch((err) => console.error('Error sending to vendor:', err));

      // console.log('2nd resend.emails')

    } catch (error) {
      console.error('Unexpected error in sendEmails:', error);
    //   throw new Error('Failed to sending email');
    }
  };
  