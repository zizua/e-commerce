import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (123)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce is an online platform that facilitate buying and selling product as a virtual marketplace where business and individual showcase their products, interact with costumers, and conduct transactions without the need for
          a physical presence. E-commerce website have gained immense popularity due their convenience accessibility, and the global reach their offer
        </p>
        <p>
          E-commerce website typically display products or services along with detailed descriptions, image, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant
          information.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
