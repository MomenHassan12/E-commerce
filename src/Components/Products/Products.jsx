import axios from "axios";
import { useContext, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishContext } from "../../Context/WishContext";

export default function Products() {
    const { addProductToCart, numOfItems } = useContext(cartContext);
    const [searchProduct, setSearchProduct] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { addProductWishlist, wishlist, deleteProductWishlist } = useContext(wishContext)
    async function addProduct(id) {
        const data = await addProductToCart(id);
        if (data) {
            toast.success(data.message);
        } else {
            toast.error("Error adding product to cart");
        }
    }

    async function getAllProducts() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
    function search(query) {
        setSearchQuery(query);
        const filteredProducts = data?.data.data.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchProduct(filteredProducts);
    }

    const { data, isLoading } = useQuery("products", getAllProducts);

    if (isLoading) {
        return (
            <div className="h-screen flex flex-wrap justify-center items-center bg-green-500">
                <Circles
                    height="80"
                    width="80"
                    color="#fff"
                    ariaLabel="circles-loading"
                    visible={true}
                />
            </div>
        );
    }

    const productsToDisplay = searchQuery ? searchProduct : data?.data.data;
    return (
        <section className="py-16">
            <div className="w-full md:w-[85%] m-auto">
                <div className="z-0 my-3 w-[70%] mx-auto mb-5 group">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent rounded-md border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder="Search..."
                        onInput={(e) => search(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap justify-center items-center">
                    {productsToDisplay?.map((product, idx) => (
                        <div key={idx} className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 overflow-hidden hover:border-2 hover:shadow-2xl hover:ring-1 hover:ring-green-300">
                            <div className="p-3">
                                <Link to={`ProductDetails/${product.id}`} className="">
                                    <img src={product.imageCover} className="w-full h-[400px]" alt={product.title} />
                                    <h2 className="text-green-600 mt-3">{product.category.name}</h2>
                                    <h2 className="mt-3">{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                    <div className="flex flex-wrap justify-between items-center mt-3">
                                        <div>
                                            <h4>{product.price} EGP</h4>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fa-solid fa-star text-yellow-300"></i>
                                            <h4>{product.ratingsAverage}</h4>
                                        </div>
                                    </div>
                                </Link>
                                <button onClick={() => wishlist.includes(product.id) ? deleteProductWishlist(product.id) : addProductWishlist(product.id)}
                                    type="button"
                                    className="float-end z-10 my-8">
                                    <i className={`text-2xl fa-solid fa-heart ${wishlist.includes(product.id) ? 'text-red-600' : 'text-gray-400'}`}></i>
                                </button>

                                <div className="relative w-[80%] h-[50px]">
                                    <button
                                        onClick={() => addProduct(product.id)}
                                        type="button"
                                        className="absolute top-96 left-0 w-full transition-all duration-300 ease-in-out group-hover:top-3 focus:outline-none text-white mt-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
