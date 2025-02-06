import react, { createContext } from 'react';
import all_product from '../Components/Assets/all_product';

{/* 12. setup api context --start */}
export const ShopContext = createContext(null);

{/* 13. setup context provider --start */}
const ShopContextProvider = (props) => {
    const contextValue = {all_product}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
{/* 13. setup context provider --end */}

export default ShopContextProvider;
{/* 12. setup api context --end */}