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

const mockOrder = {
  _id: '679cde1fb3f0a5d1bda5eb2f',
  userId: 'mockedUserId',
  products: [
    {
      _id: '675ae82d9dc9fd8505068859',
      title: 'Cola de Pavo',
      ingredient: 'Trametes Versicolor',
      type: 'extracts',
      displayingType: 'Extracto',
      quantity: 1,
      price: 35888,
      idCart: 'Cola de Pavoextracts30ml',
      id: 'Cola de Pavoextracts30ml',
      size: '30ml',
      description: 'Cuerpo fructífero de hongos y micelio de Trametes Versicolor.',
    },
    {
      _id: '675ae78c9dc9fd8505068857',
      title: 'Reishi',
      ingredient: 'Ganoderma lucidum',
      type: 'extracts',
      displayingType: 'Extracto',
      quantity: 1,
      price: 35555,
      idCart: 'Reishiextracts30ml',
      id: 'Reishiextracts30ml',
      size: '30ml',
      description: 'Cuerpo fructífero de hongos y micelio de Ganoderma lucidum.',
    }
  ],
  shippingCost: 15000,
  totalCost: 86443,
  status: 'pending',
  form_data: {
    name: 'John',
    surname: 'Smith',
    document_type: 'CE',
    id_number: '123456',
    address: 'CRA 25',
    state: 'CAL',
    city: 'Manizales',
    country: 'Colombia',
    phone: '3107883758',
    email: 'first@gmail.com',
    notes: 'notesnotesnotesnotes'
  },
  createdAt: '2025-01-31T14:28:47.630Z',
}

const OrderConfirmationEmail: React.FC<OrderProps> = ({ order = mockOrder }) => {
  // console.log('order', order)
  const {
    _id,
    createdAt,
    products,
    shippingCost,
    totalCost,
    form_data: {
      name,
      surname,
      address,
      city,
      state,
      phone
    }
  } = order

  const orderId = _id.toString()
  const customerName = `${name} ${surname}`
  const orderDate = dayjs(createdAt).format('YYYY-MM-DD HH:mm')

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
