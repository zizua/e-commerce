import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item'>
        {/* 16. give link for all product to product page --start */}
        {/* <Link to={`/product/${props.id}`}><img src={props.image} alt={props.name} /></Link> */}
        {/* 16. give link for all product to product page --end */}
        {/* 21. give scroll for product related selected --start */}
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt={props.name} /></Link>
        {/* 21. give scroll for product related selected --end */}
        {/* <img src={props.image} alt={props.name} /> */}
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item