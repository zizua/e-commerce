import React, {useContext, useState} from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  
  {/* 2. create another use state variable --start */}
  const [menu, setMenu] = useState("shop");
  {/* 27. import getTotalCartItems  --start  */}
    const {getTotalCartItems} = useContext(ShopContext);
  {/* 27. import getTotalCartItems  --end  */}
  {/* 2. create another use state variable --end */}
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOP!</p>
      </div>
      <ul className="nav-menu">
        {/* 
        <li onClick={()=>{setMenu("shop")}}>Shop{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}>Men{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}>Women{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}>Kids{menu==="kids"?<hr/>:<></>}</li> 
        */}
        
        {/* 4. setup navigation menu with route (link route from app.js) --start  */}
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li> 
        <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>'Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        {/* 4. setup navigation menu with route (link route from app.js) --end  */}
      </ul>
      <div className="nav-login-cart">
        {/* 
        <button>Login</button>
        <img src={cart_icon} alt="" /> 
        */}
        
        {/* 5. setup navigation menu with route 2 (link route from app.js) --start  */}
        <Link to='/login'><button>Login</button></Link> 
        <Link to='/cart'><img src={cart_icon} alt="" /></Link> 
        {/* 5. setup navigation menu with route 2 (link route from app.js) --end  */}
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar