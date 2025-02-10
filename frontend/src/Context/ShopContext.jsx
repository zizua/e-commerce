import react, { createContext, useState } from 'react';
import all_product from '../Components/Assets/all_product';


{/* 12. setup api context --start */}
export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

{/* 13. setup context provider --start */}
const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    // const contextValue = {all_product, cartItems};

    {/* 22. create logic for the cart button --start */}
    // const getDefaultCart = () => {
    //     let cart = {};
    //     for (let index = 0; index < all_product.length+1; index++) {
    //         cart[index] = 0;
    //     }
    //     return cart;
    // }

    {/* 23. create another useState --start */}
    // const [cartItems, setCartItems] = useState(getDefaultCart());
    {/* 23. create another useState --end */}
    {/* 22. create logic for the cart button --end */}
    
    {/* 24. create add to cart & remove from cart function --start */}
    const addToCart = (itemId) => {
        setCartItems ((prev) => ({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
    }
    const removeFromCart = (itemId) => {
        setCartItems ((prev) => ({...prev,[itemId]:prev[itemId]-1}));
    }
    const contextValue = {all_product, cartItems, addToCart, removeFromCart};
    {/* 24. create add to cart function --end */}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
{/* 13. setup context provider --end */}

export default ShopContextProvider;
{/* 12. setup api context --end */}