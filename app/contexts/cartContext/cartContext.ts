"use client"

import { createContext } from 'react'

interface CartItem {
  description: string;
  icon: object;
  iconSrc: object;
  src: object;
  id: string;
  _id: string;
  idCart: string;
  ingredient: string;
  price: number;
  stock: number;
  title: string;
  type: string;
  url: string;
  __v: number;
}

interface LayoutData {
  description: string;
  ingredient: string;
  price: number;
  stock: number;
  title: string;
  type: string;
  url: string;
  __v: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: object, amount?: number) => Promise<boolean>;
    removeFromCart: (item: object, amount?: number, removeAll?: boolean) => boolean;
    showCart: boolean;
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    layoutData: LayoutData[];
  }

export const CartContext = createContext<CartContextType | undefined>(undefined)

export default CartContext