import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const wishContext = createContext();

export default function WishContextProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from the API on component mount
    useEffect(() => {
        getUserWishList();
    }, []);

    async function getUserWishList() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            });
            console.log(data.data.map((product) => product._id))
            // Assuming `data` contains the list of wishlist product IDs or objects
            setWishlist(data.data.map((product) => product._id));  // Adjust according to the actual structure of the API response
        } catch (error) {
            console.log(error);
            toast.error("Error loading wishlist");
        }
    }

    async function addProductWishlist(id) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
                { productId: id },
                {
                    headers: {
                        token: localStorage.getItem('tkn')
                    }
                });

            toast.success("Product added to wishlist");
            // Refresh the wishlist after adding a product
            getUserWishList();
        } catch (error) {
            console.log(error);
            toast.error("Error adding product to wishlist");
        }
    }

    async function deleteProductWishlist(id) {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            });

            toast.success("Product removed from wishlist");
            // Refresh the wishlist after deleting a product
            getUserWishList();
        } catch (error) {
            console.log(error);
            toast.error("Error removing product from wishlist");
        }
    }

    return (
        <wishContext.Provider value={{ wishlist, addProductWishlist, deleteProductWishlist }}>
            {children}
        </wishContext.Provider>
    );
}
