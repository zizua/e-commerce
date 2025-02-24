import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  {/* Navigate between List Product's Component to Add Product's Component */}
  const [allProducts, setAllProducts] = useState([]); // 1a State for All Products --start
  
  // 1b Fetch All Products from Database --start
  const fetchInfo = async () => { 
    await fetch('http://localhost:4000/allproducts')
    .then((res) => res.json()) 
    .then((data) => {setAllProducts(data)}); // set response data to allProducts
  }

  // create useEffect for fetch data
  useEffect(() => { 
    fetchInfo(); 
  },[]) // fetch data when component mounted
  // 1b Fetch All Products from Database --end

  // 2 Delete Product from Database --start
  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product,index) => {
          return <> 
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => {remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct