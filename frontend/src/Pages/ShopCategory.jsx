import React, { use, useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'

const ShopCategory = (props) => {
  // 15. get the data from the context --start
  const {all_product} = useContext(ShopContext);
  // 15. get the data from the context --end
  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" />
    </div>
  )
}

export default ShopCategory