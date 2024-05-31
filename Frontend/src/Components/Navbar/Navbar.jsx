import React,{useContext, useRef, useState} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import drop_down from '../Assets/down.png'


const Navbar = () => {

    const [menu, setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');

    }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={drop_down} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}> <Link  to='/'>Shop</Link> {menu==="shop"&&<hr/>}</li>
                <li onClick={()=>{setMenu("men")}}><Link  to='/men'>Men</Link>  {menu==="men"&& <hr/>}</li>
                <li onClick={()=>{setMenu("women")}}><Link  to='/women'>Women</Link>  {menu==="women"&& <hr/>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link  to='/kids'>Kids</Link>  {menu==="kids"&& <hr/>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to='/login'><button>login</button></Link>}
               <Link to='/cart'><img src={cart_icon} alt="" /></Link> 
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>


        </div>
    )
}

export default Navbar
