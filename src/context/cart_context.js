import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocaleStorage=()=>{
  let cart=localStorage.getItem('cart');
  if (cart){
    return JSON.parse(localStorage.getItem('cart'))
  }
  else{
    return []
  }
}
const initialState = {
  cart:getLocaleStorage(),
  total_items:0,
  total_price:0,
  shipping_fees:534,
}

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {

  const [state,dispatch]=useReducer(reducer,initialState);

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(state.cart));
    dispatch({type:COUNT_CART_TOTALS})
  },[state.cart]);
  
  const addToCart=(id,color,amount,product,price)=>{
    dispatch({type:ADD_TO_CART,payload:{id,color,amount,product,price}})
  }

  const removeItem=(id)=>{
    dispatch({type:REMOVE_CART_ITEM,payload:id})
  }

  const clearCart=()=>{
    dispatch({type:CLEAR_CART})
  }

  const toggleAmount=(id,value)=>{
    dispatch({type:TOGGLE_CART_ITEM_AMOUNT,payload:{id,value}})
  }
  return (
    <CartContext.Provider value={{...state,addToCart,removeItem,clearCart,toggleAmount}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
