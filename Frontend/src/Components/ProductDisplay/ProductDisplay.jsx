import React, { useContext } from 'react'
import './ProductDisplay.css'
import start_icon from '../Assets/star_icon.png'
import start_icon_dull from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const{addToCart} = useContext(ShopContext)
  return (
    <div className='productDisplay'>
      
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="productDisplay-img">
            <img className='productDisplay-img-main' src={product.image} alt="" />
        </div>
      </div>
      <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className="productDisplay-right-stars">
            <img src={start_icon} alt="" />
            <img src={start_icon} alt="" />
            <img src={start_icon} alt="" />
            <img src={start_icon} alt="" />
            <img src={start_icon_dull} alt="" />
            <p>122</p>
        </div>
        <div className="productDisplay-right-prices">
            <div className="productDisplay-right-price-old">${product.old_price}</div>
            <div className="productDisplay-right-price-new">${product.new_price}</div>
        </div>
        <p className='productDisplay-right-desc'>
          A lightweight,usually knitted pullover shirt ,close fitting and with a round neckline and shirt  sleeves , worn as a undershirt or an outer garment
        </p>
        <div className="productDisplay-right-size">
            <h1>Select Size</h1>
            <div className="productDisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>Add to cart</button>
        <p className="productDisplay-right-category"><span>Category : </span>Women , T-shirt , Crop top</p>
        <p className="productDisplay-right-category"><span>Tags : </span>Modern , Latest</p>

      </div>
    </div>
  )
}

export default ProductDisplay
