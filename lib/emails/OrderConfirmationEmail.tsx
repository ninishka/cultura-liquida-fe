import React from "react";
import dayjs from 'dayjs';
import { IOrder } from '@/models/Order';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Link,
} from "@react-email/components";

type OrderProps = {
  order: IOrder;
};

const OrderConfirmationEmail: React.FC<OrderProps> = ({ order }) => {
  // console.log('order', order)
  const {
    _id,
    createdAt,
    products,
    shippingCost,
    totalCost,
    status,
    form_data: {
      name,
      surname,
      address,
      city,
      state,
      phone,
      payment_method
    },
    mp_data
  } = order

  const orderId = _id.toString()
  const customerName = `${name} ${surname}`
  const orderDate = dayjs(createdAt).format('YYYY-MM-DD HH:mm')

  let localStatus
  if (payment_method === 'mercado' &&  mp_data?.status) localStatus = mp_data?.status
  if (payment_method === 'transfer') localStatus = status

  return (
    <Html>
      <Head />
      <Preview>Confirmación de pedido - ¡Gracias por su compra!</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Confirmación de pedido</Heading>
          <Text style={textStyle}>Hola {customerName},</Text>
          <Text style={textStyle}>
            ¡Gracias por tu pedido! Nos complace informarte que hemos recibido tu pedido y que ya lo estamos procesando.
          </Text>
          <Section style={sectionStyle}>
            <Text style={textStyle}>
              <strong>Pedido:</strong>{' '}
              <Link
                href={`https://www.cultura-liquida.com/checkout?order_id=${orderId}`}
                style={linkStyle}
              >
                {orderId}
              </Link>
            </Text>

            {localStatus && (
              <Text style={{...textStyle, textTransform: 'capitalize' }}>
                <strong>Status:</strong> {localStatus}
              </Text>
            )} 

            {localStatus === 'rejected' && (
              <Text style={textStyle}>
                <strong>Su pago ha sido rechazado. Inténtelo de nuevo. Para ello, vaya a la página de pedidos.</strong>
              </Text>
            )}

            <Text style={textStyle}>
              <strong>Fecha:</strong> {orderDate}
            </Text>
            <Text style={textStyle}>
              <strong>Direccion:</strong> {address}, {city}, {state}
            </Text>
            <Text style={textStyle}>
              <strong>Telefono:</strong> {phone}
            </Text>
          </Section>
          <Hr style={hrStyle} />
          <Section style={sectionStyle}>
            <Text style={textStyle}>
              <strong>Articulos:</strong>
            </Text>
            {products.map((item, index) => (
              <Text key={index} style={itemStyle}>
                {item.title} - {item.quantity} x ${item.price}
              </Text>
            ))}
          </Section>
          <Hr style={hrStyle} />
          <Section style={sectionStyle}>
            <Text style={textStyle}>
              <strong>Envío:</strong> ${shippingCost}
            </Text>
          </Section>
          <Section style={sectionStyle}>
            <Text style={textStyle}>
              <strong>Total:</strong> ${totalCost}
            </Text>
          </Section>
          <Button
            href={`https://www.cultura-liquida.com/checkout?order_id=${orderId}`}
            style={buttonStyle}
          >
            Ver detalles del pedido
          </Button>
          <Text style={textStyle}>
            Si tiene alguna pregunta, no dude en responder a este correo electrónico o ponerse en contacto con nosotros:
            <br />
            <Link href="mailto:culturaliquidacol@gmail.com" style={linkStyle}>
              culturaliquidacol@gmail.com
            </Link>
            <br />
            <Link href="https://wa.me/573117662419" style={linkStyle}>
              Whatsapp
            </Link>
            <br />
            <Link href="https://t.me/cultura_liquida" style={linkStyle}>
              Telegram
            </Link>
          </Text>
          <Text style={footerStyle}>
            ¡Gracias por tu compra!
            <br />
            Cultura Líquida
          </Text>
        </Container>
      </Body>
    </Html>
  )
};

const mainStyle = {
  backgroundColor: "#f9f9f9",
  fontFamily: "Arial, sans-serif",
  margin: 0,
  padding: "20px",
};

const containerStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "20px",
  margin: "0 auto",
  maxWidth: "600px",
};

const headingStyle = {
  fontSize: "24px",
  color: "#333333",
  marginBottom: "20px",
};

const textStyle = {
  fontSize: "16px",
  color: "#555555",
  lineHeight: "1.5",
  marginBottom: "10px",
};

const sectionStyle = {
  marginBottom: "20px",
};

const itemStyle = {
  fontSize: "14px",
  color: "#333333",
  marginBottom: "5px",
};

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
};

const buttonStyle = {
  display: "inline-block",
  backgroundColor: "#007bff",
  color: "#ffffff",
  textDecoration: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  fontSize: "16px",
};

const hrStyle = {
  border: "none",
  borderTop: "1px solid #eaeaea",
  margin: "20px 0",
};

const footerStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#888888",
  textAlign: "center" as "center", // Ensure type compatibility
  marginTop: "20px",
};

export default OrderConfirmationEmail;
