import React from 'react';

export const LOGO_URL = 'https://www.cultura-liquida.com/logo_full.svg';

const BACKGROUND_URL = 'https://www.cultura-liquida.com/modalbackgroung.png';

export const mainStyle = {
  backgroundImage: `url(${BACKGROUND_URL})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  fontFamily: "Arial, sans-serif",
  margin: 0,
  padding: "20px",
};

export const containerStyle = {
  backgroundColor: "rgba(45, 45, 45, 0.95)",
  borderRadius: "16px",
  padding: "30px",
  margin: "0 auto",
  maxWidth: "600px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
  border: "1px solid rgba(79, 219, 64, 0.2)",
};

export const headerStyle = {
  textAlign: "center" as "center",
  marginBottom: "30px",
};

export const logoStyle = {
  margin: "0 auto",
};

export const headingStyle = {
  fontSize: "28px",
  color: "#F2C94C",
  marginBottom: "20px",
  textAlign: "center" as "center",
  fontWeight: "700",
};

export const textStyle = {
  fontSize: "16px",
  color: "#FFFFFF",
  lineHeight: "1.6",
  marginBottom: "15px",
};

export const sectionStyle = {
  marginBottom: "25px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  padding: "15px",
  borderRadius: "8px",
};

export const itemStyle = {
  fontSize: "15px",
  color: "#FFFFFF",
  marginBottom: "10px",
  paddingLeft: "10px",
  borderLeft: "3px solid #4FDB40",
};

export const linkStyle = {
  color: "#4FDB40",
  textDecoration: "none",
  fontWeight: "600",
};

export const contactLinkStyle = {
  color: "#4FDB40",
  textDecoration: "none",
  fontWeight: "600",
  display: "block",
  padding: "8px 15px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
  margin: "5px 0",
  transition: "all 0.3s",
};

export const buttonStyle = {
  display: "inline-block",
  backgroundColor: "#4FDB40",
  color: "#2D2D2D",
  textDecoration: "none",
  padding: "12px 25px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center" as "center",
  margin: "20px auto",
  width: "100%",
  maxWidth: "300px",
};

export const hrStyle = {
  border: "none",
  borderTop: "1px solid rgba(79, 219, 64, 0.3)",
  margin: "20px 0",
};

export const priceStyle = {
  color: "#F2C94C",
  fontWeight: "600",
};

export const totalStyle = {
  fontSize: "18px",
  color: "#FFFFFF",
  fontWeight: "700",
};

export const rejectedStyle = {
  fontSize: "16px",
  color: "#F2654C",
  backgroundColor: "rgba(242, 101, 76, 0.2)",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
  fontWeight: "600",
};

export const contactSectionStyle = {
  marginTop: "30px",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  padding: "20px",
  borderRadius: "8px",
};

export const contactHeaderStyle = {
  fontSize: "16px",
  color: "#FFFFFF",
  marginBottom: "15px",
};

export const columnStyle = {
  margin: "5px 0",
};

export const footerStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#F2C94C",
  textAlign: "center" as "center",
  marginTop: "30px",
  fontWeight: "600",
};

// Функция для создания стиля статуса в зависимости от его значения
export const getStatusStyle = (status: string) => {
  const colors: {[key: string]: string} = {
    approved: "#4FDB40",
    pending: "#F2C94C",
    rejected: "#F2654C",
    default: "#FFFFFF"
  };
  
  return {
    color: colors[status] || colors.default,
    fontWeight: "600"
  };
}; 