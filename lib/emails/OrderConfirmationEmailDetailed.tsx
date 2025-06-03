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
      payment_method,
      document_type,
      id_number,
      email
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
      <Preview>Detalles del pedido</Preview>
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
          <Heading style={styles.headingStyle}>Detalles del pedido</Heading>
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
                <strong>Status:</strong> {localStatus}
              </Text>
            )} 

            <Text style={styles.textStyle}>
              <strong>Fecha:</strong> {orderDate}
            </Text>

            <Text style={styles.textStyle}>
              <strong>Nombre del cliente:</strong> {customerName}
            </Text>

            <Text style={{...styles.textStyle, textTransform: 'capitalize' }}>
              <strong>Método de pago:</strong> {payment_method}
            </Text>

            <Text style={styles.textStyle}>
              <strong>Tipo de documento:</strong> {document_type}
            </Text>

            <Text style={styles.textStyle}>
              <strong>Número de id:</strong> {id_number}
            </Text>
            
            <Text style={styles.textStyle}>
              <strong>Correo electrónico:</strong> {email}
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
        </Container>
      </Body>
    </Html>
  )
};

export default OrderConfirmationEmail;
