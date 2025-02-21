import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/Upload_area.svg';

const AddProduct = () => {
  //Add Logic & State for Displaying Uploaded Image before Add to List Product & Add Product to Database --1start
  // 1a State for Displaying Uploaded Image before Add to List Product --start
  const [image, setImage] = useState(false);
  // 1c State for Adding Product to Database --start
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    old_price: '',
    new_price: '',
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  // 1a State for Displaying Uploaded Image before Add to List Product --end
  const changeHandler = (e) => {
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  // 1c State for Adding Product to Database --end
  // 1d Function for Add Product Button --start
  const Add_Product = async () => {
    console.log(productDetails);
    // 1e Add Product to Database --start
    // create new variable for response data & copy productDetails to product
    let responseData;
    let product = productDetails;
    
    // create form data
    let formData = new FormData();
    formData.append('product',image);

    // create API to fetch data to server
    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData
    }).then((resp) => resp.json().then((data) => responseData = data)); // get response data from server
    
    // check if response data success
    if(responseData.success)
    {
      product.image = responseData.image_url; // set image url to product.image
      console.log(product); // show product data on console
      await fetch('http://localhost:4000/addproduct', { // fetch data to server
        method: 'POST', 
        headers:  
        {
          Accept: 'application/json', 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(product), // send product data to server
      }).then((resp) => resp.json()).then((data) => { // get response data from server
        data.success?alert("Product Added"):alert("Failed"); // check if response data success or failed
      })
    }
    // 1e Add Product to Database --end
  }

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        {/* <input type="text" name="name" placeholder="Type here" /> */}
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          {/* <input type="text" name="old_price" placeholder="Type here" /> */}
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          {/* <input type="text" name="new_price" placeholder="Type here" /> */}
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Category</p>
        {/* <select name="category" className="add-product-selector"> */}
        <select value={productDetails} onChange={changeHandler} name="category" className="add-product-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          {/* <img src={upload_area} className="addproduct-thumnail-img" alt="" /> */}
          {/* 1b */}
          {/* jika gambar yang dipilih bernilai true, maka akan menampilkan gambar yg diupload. jika bernilai false akan menampilkan icon awal upload_area */}
          <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumnail-img" alt="" />
        </label>
        {/* <input type="file" name="image" id="file-input" hidden /> */}
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={() => {Add_Product()}} className="addproduct-btn">ADD</button>
    </div>
  );
};

export default AddProduct;
