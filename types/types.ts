import React from 'react';

export interface ProductG {
  title: string;
  description: string;
  ingredient: string;
  type: string;
  size?: string;
  price: number;
  totalStock: number;
  availableStock: number;
  slug: string;
  [key: string]: any; // TODO
}

export interface UpdateProductRequest {
  id: string;
  updatedData: Partial<ProductG>;
}


export interface CartItemType {
  title: string;
  description: string;
  ingredient: string;
  price: number;
  totalStock: number;
  availableStock: number;
  size?: string;
  slug: string;
  type: string;
  displayingType: string;

  icon: any;
  src: any;
  id: string;
  _id: string;
  url: string;
  __v: number;
  quantity: number;
  idCart?: string;

  isOrder?: boolean
}

export interface CartState {
  cartItems: CartItemType[];
  count: number;
  showCart: boolean;
  showMenu: boolean;
  isMercadoInit: boolean;
}

export type ExtendedPayload = CartItemType & {
  isModal?: boolean;
  removeAll?: boolean;
};

export interface ModalFormProps {
  loading: boolean;
  isOrder?: boolean;
  onFinish?: (values: any) => Promise<void>;
  initialValues?: any
  [key: string]: any; // TODO
}

export interface FormationProps {
  isLoading?: Boolean;
  error?: any;
  slogMain?: String[];
  formationData: CartItemType[]; 
}
 
export interface BenefitsProps {
  benefitsHeaderData?: { title: string; description1: string; description2: string; }[];
  benefitsCardsData?: { src: any; description: string; }[];
  benefitsData?: [];
}

export interface IndicationsProps { 
  indicationsImg: any;
}

export  interface ErrorProps {
  error: Error;
  reset: () => void;
}

export interface IconProps {
  color?: string;
  isDark?: boolean;
  width?: number;
  height?: number;
}

export interface NavigationProps {
  showMenu?: boolean;
  isfooter?: boolean;
  isselected?: boolean | string;
  isSticky?: boolean;
  style?: Record<string, string>;
}

export interface ModalStyledProps {
  $isEmpty: boolean;
}

export interface TotalBoxStyledProps {
  $isMercado?: boolean;
}

export interface AmountItemProps {
  $bgc: boolean;
}

export interface ModalStyledProps2 {
  $isModal: boolean;
}

export interface IconStyledProps {
  $isDark: boolean;
}

export interface StatusStyledProps {
  $status: string;
}

export interface OrderStyledProps {
  isOrder?: boolean;
  $isOrder?: boolean;
}

export interface OrderLoadingStyledProps {
  loading?: boolean;
}

export interface ProductItemProps {
  $soldout?: boolean;
  checked?: boolean;
}

export interface ContactsProps {
  paymentOption?: string;
  isColumn?: boolean;
}

export interface ContactsStyledProps {
  isColumn?: boolean;
}

