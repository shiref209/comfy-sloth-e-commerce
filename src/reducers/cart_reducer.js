import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import { formatPrice } from '../utils/helpers';

const cart_reducer = (state, action) => {
  if (action.type===ADD_TO_CART){
    const {id,color,amount,product,price}=action.payload;
    let tempItem=state.cart.find((i)=>i.id===id+color);
    if (tempItem){
      let tempCart=state.cart.map((item)=>{
        if (item.id===id+color){
          let newAmount=item.amount+amount;
          if (item.max<newAmount){
            newAmount=item.max;
          }
          return {...item,amount:newAmount}
        }
      })
      return {...state,cart:tempCart}
    }
    else{
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return {...state,cart:[
        ...state.cart,newItem
      ]}
    }
  }
  if (action.type===REMOVE_CART_ITEM){
    let tempCart=state.cart.filter((item)=>item.id !==action.payload);
    return {...state,cart:tempCart}
  }
  if (action.type===CLEAR_CART){
    return {...state,cart:[]}
  }
  if (action.type===TOGGLE_CART_ITEM_AMOUNT){
    const {id,value}=action.payload;
    const tempCart=state.cart.map((item)=>{
      if (item.id===id){
        if (value==='increase'){
          let newAmount=item.amount +1
          if (newAmount>item.max){
            newAmount=item.max
          }
          return {...item,amount:newAmount}
        }
        if (value ==='decrease'){
          let newAmount=item.amount-1;
          if (newAmount<1){
            newAmount=1
          }
          return {...item,amount:newAmount}
        }
      }
      return item
    })
    return {...state,cart:tempCart}
  }
  // if (action.type===COUNT_CART_TOTALS){
    
  //   const totalItemsPrice=state.cart.map((item)=>{
  //     return item.amount * item.price
  //   })
  //   const totalPrice=totalItemsPrice.reduce((a,b)=>a+b,0)
  //   return {...state,total_price:totalPrice}
  // }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_price } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_price += price * amount;
        return total
      },
      { total_items: 0, total_price: 0 }
    )
    return { ...state, total_items, total_price }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
