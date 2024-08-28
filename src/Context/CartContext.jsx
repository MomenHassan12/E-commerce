import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { authContext } from "./AuthContext";
import toast from "react-hot-toast";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {
    const { token } = useContext(authContext)
    const [numOfItems, setNumOfItems] = useState(0)
    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [cartId, setCartId] = useState("")

    async function addProductToCart(productId) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                productId: productId
            },
                {
                    headers: {
                        token: localStorage.getItem('tkn')
                    }
                })
            getUserCart();
            console.log(data.status)
            return data
        } catch (error) {
            console.log(error)

        }
    }
    async function getUserCart() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token: localStorage.getItem('tkn') } })
            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setCartId(data.data._id)
            console.log(data)
            return data

        } catch (error) {
            console.log(error)
        }

    }
    async function updateCart(id, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: count }, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setCartId(data.data._id)

            return data
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteItem(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setCartId(data.data._id)
            toast.success(data.status)

            return data
        } catch (error) {
            console.log(error)
        }
    }

    async function clearCart() {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            setNumOfItems(0)
            setProducts([])
            setTotalPrice(0)
            toast.success(data.status)

            return data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(function () {
        if (token != null) {
            getUserCart();
        }
    }, [token])
    return (
        <cartContext.Provider value={{ addProductToCart, products, totalPrice, numOfItems, updateCart, deleteItem, clearCart, cartId, setNumOfItems, setProducts, setTotalPrice }}>
            {children}
        </cartContext.Provider >
    )
}