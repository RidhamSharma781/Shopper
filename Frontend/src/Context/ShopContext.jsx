import React, { createContext,useState,useEffect } from "react";


export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
    const cart = {};
    for (let index = 0; index < 300+1; index++) {
      cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{

    const [all_products,set_All_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
     fetch('http://localhost:4000/allproducts')
     .then((res)=>res.json())
     .then((data)=>set_All_Product(data));
    }, [])
    
    const addToCart = (itemId)=>{
          setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
          if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept : 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-type':'application/json'
                },
                body:JSON.stringify({"item":itemId})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));
          }
    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }
  const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            let itemInfo = all_products.find((product)=>product.id===Number(item));
            totalAmount += itemInfo.new_price * cartItems[item];
        }

    }
    return totalAmount
  }
  const getTotalCartItems = ()=>{
    let totalItems = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            totalItems += cartItems[item];
        }
    }
    return totalItems;
  }


  const contextValue = {all_products,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};
    
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;