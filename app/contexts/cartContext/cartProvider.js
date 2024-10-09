"use client"

import React, { useMemo, useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import CartContext from './cartContext'


const CartProvider = ({ children, fetchData }) => {
  const [data, setData] = useState(fetchData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   if (!fetchData) {
  //     setIsLoading(true);
  //     getFn({ url: 'getAllItems' })
  //       .then(response => {
  //         setData(response);
  //         setIsLoading(false);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         setIsError(true);
  //         setIsLoading(false);
  //       });
  //   }
  // }, [fetchData]);
  
  
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

  // const setToCart = (item, amount = 1) => {
  //   if (!item || !item._id) return false
  //   const id = item?.itemId

  //   setCartItems(value => {
  //     const v = [...value]
  //     const index = v.findIndex(i => i.id === id)

  //     if (index >= 0) {
  //       v[index] = {
  //         id,
  //         amount
  //       }
  //     } else {
  //       v.push({
  //         id,
  //         amount
  //       })
  //     }

  //     return v
  //   })
  // }

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
  console.log('cartItems', cartItems)

  const adaptedDataForBe = cartItems.map(product => {
    return {
      id: product.id,
      title: product.title,
      image: product.iconSrc,
      description: product.description,
      categoryId: product.type === 'Extractos' ? 'extracts' : 'capsules',
      // stock: 0,
      price: product.price,
      size: '',
      // itemId: product.ingredient.toLowerCase().split(' ').join('-'),
      // itemId: 'hericium-erinaceus',
      
      amount: product.amount
    };
  })

  console.log('data', data)

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
      data, adaptedDataForBe
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
