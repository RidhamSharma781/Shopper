import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const{all_products,cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_products.map((item)=>{
            if(cartItems[item.id]>0){
                return  <div className="cartitems-format cartitems-format-main">
                <img src={item.image} alt="" className='cartitems-product-icon' />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[item.id]}</button>
                <p>${item.new_price*cartItems[item.id]}</p>
                <img src={remove_icon} alt="" className='cartitems-remove' onClick={()=>{removeFromCart(item.id)}} />
            </div>
            }
            return null;
        })}

        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-items">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-items">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-items">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>Proceed to Checkout</button> 
            </div>
            <div className="cartitems-promocode">
                    <p>If you have a promo code , Enter here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promo Code' />
                        <button>Submit</button>
                    </div>
                </div>
        </div>
        
      
    </div>
   
  )
}

export default CartItems
