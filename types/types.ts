import { FormInstance } from 'antd'

export interface ProductG {
  title: string;
  description: string;
  ingredient: string;
  type: string;
  size?: string;
  price: number;
  stock: number;
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
  stock: number;
  size?: string;
  type: string;

  icon: any;
  iconSrc: any;
  src: any;
  id: string;
  _id: string;
  url: string;
  __v: number;
  amount?: number;
  idCart?: string;
}

export interface CartState {
  cartItems: CartItemType[];
  count: number;
  showCart: boolean;
}

export type ExtendedPayload = CartItemType & {
  isModal?: boolean;
  removeAll?: boolean;
};

export interface ModalFormProps {
  form: FormInstance<any>;
  loading: boolean;
  onFinish: (values: any) => Promise<void>;
}

export interface FormationProps {
  isLoading?: Boolean;
  error?: any;
  slogMain?: String[];
  formationData: CartItemType[]; 
  formationDataStatic: any;
  // [propName: string]: any
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

export interface ArrowCounterProps {
  color?: string;
}

export interface NavigationProps {
  isopen?: boolean;
  $isopen?: boolean;
  setShowMenu?: (value: boolean) => void;
}

export interface ModalStyledProps {
  $isEmpty: boolean;
}

export interface AmountItemProps {
  $bgc: boolean;
}

export interface ModalStyledProps2 {
  $isModal: boolean;
}

