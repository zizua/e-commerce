import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/Upload_area.svg';

const AddProduct = () => {
//Add Logic & State for Displaying Uploaded Image before Add to List Product 
// 1a --start
    const [image, setImage] = useState(false);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    // 1a --end

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" name="name" placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Category</p>
        <select name="category" className="add-product-selector">
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          {/* <img src={upload_area} className="addproduct-thumnail-img" alt="" /> */}
          {/* 1b */}
          {/* jika gambar yang dipilih bernilai true, maka akan menampilkan gambar yg diupload. jika bernilai false akan menampilkan icon awal upload_area */}
          <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumnail-img" alt="" />
        </label>
        {/* <input type="file" name="image" id="file-input" hidden /> */}
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button className="addproduct-btn">ADD</button>
    </div>
  );
};

export default AddProduct;
