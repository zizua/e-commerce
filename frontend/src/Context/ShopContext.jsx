import react, { createContext, useEffect, useState } from 'react';
// import all_product from '../Components/Assets/all_product';


{/* 12. setup api context --start */}
export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    // for (let index = 0; index < all_product.length+1; index++) {
    for (let index = 0; index < 300+1; index++) { // change all product to 300
        cart[index] = 0;
    }
    return cart;
}

{/* 13. setup context provider --start */}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]); // 36. add all product data using all product API

    const [cartItems, setCartItems] = useState(getDefaultCart());
    // const contextValue = {all_product, cartItems};

    useEffect(() => { // 37. fetch all product data using all product API
        fetch("http://localhost:4000/allproducts")
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

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
    // 24a
    const addToCart = (itemId) => {
        setCartItems ((prev) => ({...prev,[itemId]:prev[itemId]+1}));
        // console.log(cartItems);
        // 24b
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-tokrn": localStorage.getItem('auth-token'),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({itemId:itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
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