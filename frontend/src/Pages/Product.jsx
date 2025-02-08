import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      {/* 15. setup & design the product page --start */}
      <Breadcrum product={product}/>
      {/* 15. setup & design the product page --end */}
    </div>
   )
};

export default Product;
