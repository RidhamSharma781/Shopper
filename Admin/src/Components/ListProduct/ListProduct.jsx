import React,{useState,useEffect} from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);
  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }
  useEffect(() => {
    fetchInfo();
  }, [])
  
  const removeProduct = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method : 'POST',
      headers : {
        Accept : 'application/json',
        'content-type' : 'application/json'
      },
      body : JSON.stringify({id:id})
    })
    fetchInfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-all-products">
        {allProducts.map((product,index)=>{
          return<><div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} className='listproduct-product-icon' alt="" />
            <p>{product.name}</p>
            <p>{product.old_price}</p>
            <p>{product.new_price}</p>
            <p>{product.category}</p>
            <img src={cross_icon} onClick={()=>{removeProduct(product.id)}} className='listproduct-cross-icon' alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
