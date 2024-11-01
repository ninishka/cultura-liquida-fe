"use client"

import React, { useState, useEffect } from 'react'
import CartContext from './cartContext'
// import { fetchProducts } from '@/fetching' '@/lib/db
// import { fetchProducts } from './../../fetching'

const CartProvider = ({ children, layoutData: ld }) => {
  // console.log('layoutData', layoutData)
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [layoutData, setLayoutData] = useState(ld)

  // const [data, setData] = useState([]);
  // const fetchData = async () => {
  //   try {
  //     const response = await fetchProducts();
  //     setData(response);
  //   } catch (error) {
  //     console.error('CartProvider autofetch error:', error);
  //   }
  // }
  // useEffect(() => {
  //   fetchData();

  //   // REV 8
  //   const interval = setInterval(fetchData, 30000);
  //   return () => clearInterval(interval);
  // }, []);


  const addToCart = async (item, amount = 1) => {
    if (!item || !item.id) return false // _id
    const id = item?.idCart // itemId

    setCartItems(value => {
      const v = [...value]
      const index = v.findIndex(i => i.idCart === id)

      if (index >= 0) {
        v[index] = {
          id,
          amount: v[index].amount + amount,
          ...item
        }
      } else {
        v.push({
          id,
          amount,
          ...item
        })
      }

      return v
    })
  }

  const removeFromCart = (item, amount = 1, removeAll = false) => {
    if (!item || !item.id) return false
    const id = item?.id

    setCartItems(value => {
      const v = [...value]
      const index = v.findIndex(i => i.id === id)

      if (index >= 0) {
        if (removeAll || v[index].amount - amount <= 0){
          v.splice(index, 1)
        } else {
          v[index] = {
            id,
            amount: v[index].amount - amount,
            ...item
          }
        }
      }

      return v
    })
  }

  // console.log('layoutData context', layoutData?.[1]?.stock)
  console.log('layoutData context', layoutData?.[0]?.stock, layoutData?.[2]?.stock)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
  
      showCart, setShowCart,
      showMenu, setShowMenu,
      layoutData
    }}>
      {children}
    </CartContext.Provider>
  )
}

// CartProvider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node
//   ]).isRequired
// }

export default CartProvider
