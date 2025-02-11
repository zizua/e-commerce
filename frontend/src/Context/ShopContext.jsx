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
        // console.log(cartItems);
    }
    
    const removeFromCart = (itemId) => {
        setCartItems ((prev) => ({...prev,[itemId]:prev[itemId]-1}));
    }

    {/* 25. create logic of total amount in cart --start */}
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                let itemInfo = all_product.find(product => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }
    {/* 25. create logic of total amount in cart --end */}

    {/* 26. create logic of total amount in cart navbar --start */}
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
    {/* 26. create logic of total amount in cart navbar --end */}

    const contextValue = {getTotalCartItems, getTotalCartAmount , all_product, cartItems, addToCart, removeFromCart};
    // const contextValue = {getTotalCartAmount , all_product, cartItems, addToCart, removeFromCart};
    // const contextValue = {all_product, cartItems, addToCart, removeFromCart};

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