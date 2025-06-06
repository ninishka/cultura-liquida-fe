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
  Img,
  Row,
  Column,
} from "@react-email/components";
import * as styles from './styles';

type OrderProps = {
  order: IOrder;
};

const OrderConfirmationEmail: React.FC<OrderProps> = ({ order }) => {
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
      <Body style={styles.mainStyle}>
        <Container style={styles.containerStyle}>
          <Section style={styles.headerStyle}>
            <Img 
              src={styles.LOGO_URL} 
              alt="Cultura Líquida" 
              width="180" 
              height="auto" 
              style={styles.logoStyle}
            />
          </Section>
          <Heading style={styles.headingStyle}>Confirmación de pedido</Heading>
          <Text style={styles.textStyle}>Hola {customerName},</Text>
          <Text style={styles.textStyle}>
            ¡Gracias por tu pedido! Nos complace informarte que hemos recibido tu pedido y que ya lo estamos procesando.
          </Text>
          <Section style={styles.sectionStyle}>
            <Text style={styles.textStyle}>
              <strong>Pedido:</strong>{' '}
              <Link
                href={`https://www.cultura-liquida.com/checkout?order_id=${orderId}`}
                style={styles.linkStyle}
              >
                {orderId}
              </Link>
            </Text>

            {localStatus && (
              <Text style={{...styles.textStyle, textTransform: 'capitalize' }}>
                <strong>Status:</strong> <span style={styles.getStatusStyle(localStatus)}>{localStatus}</span>
              </Text>
            )} 

            {localStatus === 'rejected' && (
              <Text style={styles.rejectedStyle}>
                <strong>Su pago ha sido rechazado. Inténtelo de nuevo. Para ello, vaya a la página de pedidos.</strong>
              </Text>
            )}

            <Text style={styles.textStyle}>
              <strong>Fecha:</strong> {orderDate}
            </Text>
            <Text style={styles.textStyle}>
              <strong>Direccion:</strong> {address}, {city}, {state}
            </Text>
            <Text style={styles.textStyle}>
              <strong>Telefono:</strong> {phone}
            </Text>
          </Section>
          <Hr style={styles.hrStyle} />
          <Section style={styles.sectionStyle}>
            <Text style={styles.textStyle}>
              <strong>Articulos:</strong>
            </Text>
            {products.map((item, index) => (
              <Text key={index} style={styles.itemStyle}>
                {item.title} - {item.quantity} x <span style={styles.priceStyle}>${item.price}</span>
              </Text>
            ))}
          </Section>
          <Hr style={styles.hrStyle} />
          <Section style={styles.sectionStyle}>
            <Text style={styles.textStyle}>
              <strong>Envío:</strong> <span style={styles.priceStyle}>${shippingCost}</span>
            </Text>
          </Section>
          <Section style={styles.sectionStyle}>
            <Text style={styles.totalStyle}>
              <strong>Total:</strong> <span style={styles.priceStyle}>${totalCost}</span>
            </Text>
          </Section>
          <Button
            href={`https://www.cultura-liquida.com/checkout?order_id=${orderId}`}
            style={styles.buttonStyle}
          >
            Ver detalles del pedido
          </Button>
          <Section style={styles.contactSectionStyle}>
            <Text style={styles.contactHeaderStyle}>
              Si tiene alguna pregunta, no dude en responder a este correo electrónico o ponerse en contacto con nosotros:
            </Text>
            <Row>
              <Column style={styles.columnStyle}>
                <Link href="mailto:culturaliquidacol@gmail.com" style={styles.contactLinkStyle}>
                  culturaliquidacol@gmail.com
                </Link>
              </Column>
            </Row>
            <Row>
              <Column style={styles.columnStyle}>
                <Link href="https://wa.me/573117662419" style={styles.contactLinkStyle}>
                  Whatsapp
                </Link>
              </Column>
            </Row>
            <Row>
              <Column style={styles.columnStyle}>
                <Link href="https://t.me/cultura_liquida" style={styles.contactLinkStyle}>
                  Telegram
                </Link>
              </Column>
            </Row>
          </Section>
          <Text style={styles.footerStyle}>
            ¡Gracias por tu compra!
            <br />
            Cultura Líquida
          </Text>
        </Container>
      </Body>
    </Html>
  )
};

export default OrderConfirmationEmail;
