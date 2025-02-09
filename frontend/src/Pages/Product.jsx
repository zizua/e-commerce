import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      {/* 15. setup & design the product page (product navigation) --start */}
      <Breadcrum product={product}/>
      {/* 15. setup & design the product page (product navigation) --end */}
      {/* 16. setup & design the product page 2 (product image, title & prices) --start */}
      <ProductDisplay product={product}/>
      {/* 16. setup & design the product page 2 ( product image, title & prices) --end */}
      {/* 17. setup & design the product page 3 ( product description) --start */}
      <DescriptionBox />
      {/* 17. setup & design the product page 3 ( product description) --end */}
      {/* 18. setup & design the product page 4 ( product related) --start */}
      <RelatedProducts />
      {/* 18. setup & design the product page 4 ( product related) --end */}


    </div>
   )
};

export default Product;
