import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type===LOAD_PRODUCTS){
    let maxPrice=action.payload.reduce((a,b)=>a.price>b.price?a:b,0).price;
    return {...state,all_products:[...action.payload],filtered_products:[...action.payload],filters:{...state.filters,max_price:maxPrice,price:maxPrice}}
  }

  if (action.type===SET_GRIDVIEW){
    return {...state,grid_view:true}
  }

  if (action.type===SET_LISTVIEW){
    return {...state,grid_view:false}
  }

  if (action.type===UPDATE_SORT){
    return {...state,sort:action.payload}
  }

  if (action.type===SORT_PRODUCTS){
    const {filtered_products,sort}=state;
    let tempProducts=[...filtered_products];
    if (sort==='price-lowest'){
      tempProducts=tempProducts.sort((a,b)=>a.price-b.price);
      return {...state,filtered_products:tempProducts}
    }
    else if(sort==='price-highest'){
      tempProducts=tempProducts.sort((a,b)=>b.price-a.price);
      return {...state,filtered_products:tempProducts};
    }
    else if(sort==='name-a'){
      tempProducts=tempProducts.sort((a,b)=>a.name.localeCompare(b.name));
      return {...state,filtered_products:tempProducts};
    }
    else if(sort==='name-z'){
      tempProducts=tempProducts.sort((a,b)=>b.name.localeCompare(a.name));
      return {...state,filtered_products:tempProducts};

    }
    return {...state,filtered_products:tempProducts}
  }

  if (action.type===UPDATE_FILTERS){
    const {name,value}=action.payload;
    return {...state,filters:{...state.filters,[name]:value}}
  }
  
  if (action.type===FILTER_PRODUCTS){
    const {all_products,filters:
    {
      text,company,category,price,shipping,color
    }}=state;
    let tempProducts=[...all_products];
    // filtering
    // text
    if (text){
      tempProducts=tempProducts.filter((item)=>item.name.toLowerCase().includes(text))
    }
    // Category
    if (category!=='all'){
      tempProducts=tempProducts.filter((item)=>item.category.toLowerCase()===category)
    }
    // company
    if (company!=='all'){
      tempProducts=tempProducts.filter((item)=>item.company.toLowerCase()===company)
    }
    // color
    if(color!=='all'){
      tempProducts=tempProducts.filter((item)=>item.colors.indexOf(color)>=0)
    }
    // price
    if (price){
      tempProducts=tempProducts.filter((item)=>item.price<=price)
    }
    // shipping
    if (shipping){
      tempProducts=tempProducts.filter((item)=>item.shipping===true)
    }
    return {...state,filtered_products:tempProducts}
  }
  if (action.type===CLEAR_FILTERS){
    return {...state,filters:{
      ...state.filters,
      text:"",
      company:'all',
      category:'all',
      price:state.filters.max_price,
      color:'all',
      shipping:false
    }}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
