import React, { useEffect, useState } from 'react';
import './Popular.css';
// import data_product from '../Assets/data'
import Item from '../Item/Item';

// create a functional component --1a
const Popular = () => {
  // create state for popular in women --2
  const [popularProducts, setPopularProducts] = useState([]);

  // create endpoint for popular in women --3
  useEffect(() => {
    fetch('http://localhost:4000/popularinwomen')
    .then((response)=>response.json()) // Mengubah response dari URL API menjadi JSON
    .then((data)=>setPopularProducts(data)); // Mengubah data JSON menjadi array dan menyimpannya di state
  }, [])

  // 1b
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {/* {data_product.map((item,i)=>{ */}
        {popularProducts.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
        })}
      </div>
    </div>
  );
};

export default Popular;
