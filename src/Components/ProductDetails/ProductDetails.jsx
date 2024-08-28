import { useParams } from "react-router-dom"
import img1 from "../../assets/images/error.svg"
import { useQuery } from "react-query"
import axios from "axios"
import { Circles } from "react-loader-spinner"
import { useContext, useState } from "react"
import { cartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"
export default function ProductDetails() {
    const { addProductToCart } = useContext(cartContext)
    const [loader, setLoader] = useState(false);
    const { id } = useParams()
    console.log(id)
    async function getProduct() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { data, isLoading } = useQuery(`product${id}`, getProduct)
    console.log(data?.data.data)
    async function addProduct() {
        setLoader(true)
        const data = await addProductToCart(id)
        console.log(data)
        if (data) {
            setLoader(false)
            toast.success(data.message)
        } else {
            setLoader(false)
            toast.error("error")
        }
    }
    if (isLoading) {
        return (<div className="h-screen flex flex-wrap justify-center items-center bg-green-500  ">
            <Circles
                height="80"
                width="80"
                color="#fff"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div >)
    }
    return (
        <section className="mt-20">
            <div className="w-full md:w-[80%] mx-auto">
                <div className=" m-10 flex flex-wrap justify-center items-center gap-3 ">
                    <div className="md:w-[30%] w-full p-5">
                        <img src={data?.data.data.imageCover} className=" w-full" alt="" />
                    </div>
                    <div className="md:w-[63%] w-full p-5">
                        <h2 className="text-2xl font-semibold mb-3">{data?.data.data.title.split(" ").slice(0, 2).join(" ")}</h2>
                        <h2 className="text-xl  mb-3">{data?.data.data.description}</h2>
                        <h2 className="text-xl mb-3 text-green-600">{data?.data.data.category.name}</h2>
                        <div className="flex flex-wrap justify-between items-center mt-3">
                            <div>
                                <h4>{data?.data.data.price} EGP</h4>
                            </div>
                            <div className="flex items-center">
                                <i className="fa-solid fa-star text-yellow-300"></i>
                                <h4>{data?.data.data.ratingsAverage}</h4>
                            </div>
                        </div>
                        <button onClick={addProduct} type="button" class="focus:outline-none text-white w-full mt-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loader ? <i className=" text-white fa-solid fa-spinner fa-spin" ></i> : 'Add to Cart'}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}