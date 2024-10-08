"use client"

import React, { useMemo, useState, useEffect } from 'react'
import CartContext from './cartContext'


const CartProvider = ({ children, fetchData }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProducts = async () => {
      setIsLoading(true);
      try {
          const response = await fetch('/api/products');
          if (!response.ok) {
              throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setData(data);
      } catch (error) {
          console.error('Error fetching products:', error);
      } finally {
        console.log('data', data)

        setIsLoading(false);
      }
  };

  useEffect(() => {
      fetchProducts();
  }, []);
  
  const [cartItems, setCartItems] = useState([])
  const [displayingItem, setDisplayingItem] = useState('1')
  const [showCart, setShowCart] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

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

  // const getItemsCount = () => {
  //   let count = 0
  //   for (let i = 0; i < cartItems.length; i++) {
  //     count += cartItems[i].amount
  //   }
  //   return count
  // }

  // const getTotalPrice = cart => cart.reduce((acc, obj) => acc + (obj.amount * obj.price), 0)

  // const value = useMemo(() => ({
  //   cartItems,
  //   // itemsCount: getItemsCount(),
  //   // getTotalPrice,
  //   addToCart,
  //   // setToCart,
  //   // removeFromCart,

  //   // temporal moved here them for testing
  //   // displayingItem, setDisplayingItem,
  //   showCart, setShowCart
  // }), [JSON.stringify(cartItems)])



  return (
    <CartContext.Provider value={{
      cartItems,
      // itemsCount: getItemsCount(),
      // getTotalPrice,
      addToCart,
      // setToCart,
      removeFromCart,
  
      // temporal moved here them for testing
      displayingItem, setDisplayingItem,
      showCart, setShowCart,
      showMenu, setShowMenu,
      data, isLoading,
      fetchProducts
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
