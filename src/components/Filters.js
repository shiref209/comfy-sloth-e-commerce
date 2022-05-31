import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {filters:{
    text,price,category,min_price,max_price,shipping,color,company
  },
  all_products,clearFilter,updateFilter}=useFilterContext();
  const categories=getUniqueValues(all_products,'category');
  const companies=getUniqueValues(all_products,'company');
  const colors=getUniqueValues(all_products,'colors');

  return <Wrapper>
    <div className="content">
      <form onSubmit={(e)=>e.preventDefault()}>
        {/* search input */}
        <input type="text" name="text" placeholder='search' value={text} onChange={updateFilter} className='search-input' />
        {/* end search input */}
        {/* start categories */}
        <div className="form-control">
          <h5>Category</h5>
          <div>
            {categories.map((c,index)=>(
              <button type='button'
              onClick={updateFilter}
              className={category===c.toLowerCase()?'active' : null}
              name='category'
              key={index}
              value={c}>
                {c}
              </button>
            ))}
          </div>
        </div>
        {/* end categories */}
        {/* companies */}
        <div className="form-control">
          <h5>Company</h5>
          <select name='company' value={company} className='company' onChange={updateFilter}>
            {companies.map((c,index)=>(
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {/* end of companies */}
        {/* colors */}
        <div className="form-control">
          <h5>Colors</h5>
          <div className='colors'>
            {colors.map((c,index)=>{
              if(c==='all'){
                return <button
                key={index}
                name='color'
                onClick={updateFilter}
                value='all'
                className={
                  color === 'all' ? 'all-btn active' : 'all-btn'
                }
              >
                all
              </button>
              }
              return (
              <button key={index}
              className={c===color?'color-btn active' : 'color-btn'}
              value={c}
              onClick={updateFilter}
              style={{background:c}}
              name='color'>
                {color===c? <FaCheck/>:null}
              </button>
            )})}
          </div>
        </div>
        {/* end of colors */}
        {/* price */}
        <div className="form-control">
          <h5>Price</h5>
          <div>
              <p className='price'>{formatPrice(price)}</p>
              <input type='range' min={min_price} max={max_price} value={price} name='price' onChange={updateFilter}/>
          </div>
        </div>
        {/* end of price */}
        {/* shipping */}
        <div className='form-control shipping'>
          <label htmlFor="shipping">Free shipping</label>
          <input type="checkbox" name="shipping" id="shipping" onChange={updateFilter} checked={shipping} />
        </div>
        {/* end of shipping */}

        
      </form>
      <button type='button' className='clear-btn' onClick={clearFilter}>Clear Filters</button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
