import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name : "",
    category : "women",
    old_price : "",
    new_price : "",
    image : ""
  })
  const changeHandler = (e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value});

  }
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }
  const addProduct = async ()=>{
      let responseData;
      let product = productDetails;

      let formData = new FormData();
      formData.append('product',image);

      await fetch('http://localhost:4000/upload',{
        method : 'POST',
        headers : {
          Accept : 'application/json'
        },
        body : formData
      }).then((resp) => resp.json()).then((data)=>{responseData=data})

      if(responseData.success){
        product.image = responseData.image_url;
        console.log(product);

        await fetch('http://localhost:4000/addproduct',{
          method : 'POST',
          headers : {
            Accept : 'application/json',
            'content-type' : 'application/json'
          },
          body : JSON.stringify(product)
        }).then((resp)=>resp.json()).then((data)=>{
          data.success?alert("Product Added"):alert("Failed")
        })
      }
  }
  return (
    <div className='add-product'>
      <div className="add-product-itemfield">
        <p>Product Title</p>
        <input type="text" value={productDetails.name} onChange={changeHandler} name="name" placeholder='Type here' id="" />
      </div>
      <div className="add-product-price">
        <div className="add-product-itemfield">
          <p>Price</p>
          <input type="text" value={productDetails.old_price} onChange={changeHandler} name="old_price" placeholder='Type here' />
        </div>
        <div className="add-product-itemfield">
          <p>Offer Price</p>
          <input type="text" value={productDetails.new_price} onChange={changeHandler} name="new_price" placeholder='Type here'/>
        </div>
      </div>
      <div className="add-product-itemfield">
        <p>Product Category</p>
        <select name="category" value={productDetails.category} onChange={changeHandler} className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className="add-product-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='add-product-thumbnail' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={()=>{addProduct()}} className='add-product-btn'>Add</button>

    </div>
  )
}

export default AddProduct
