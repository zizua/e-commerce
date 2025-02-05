import React from 'react'
import './Offers.css'
import exculsive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offes for You</h1>
            <p>ONLY ON BEST SELLER PRODUCT</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exculsive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers