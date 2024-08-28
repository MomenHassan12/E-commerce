import axios from 'axios';
import React, { useContext } from 'react';
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { cartContext } from '../../Context/CartContext';
import { wishContext } from '../../Context/WishContext';

const WishList = () => {
    const { addProductToCart } = useContext(cartContext);
    const { wishlist, deleteProductWishlist } = useContext(wishContext);

    async function getWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        });
    }

    const { data, isLoading } = useQuery("wish", getWishList, {
        refetchInterval: 1000, // Refetch every 1 seconds
    });

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

    return (
        <section className='my-20'>
            <div className="w-full md:w-[80%] mx-auto bg-slate-200 p-5">
                {data?.data.data.length > 0 ? (
                    data.data.data.map((item, idx) => (
                        <div key={idx} className="flex flex-wrap justify-center items-center border-b border-green-600 mb-4">
                            <div className="w-1/6">
                                <img src={item.imageCover} className='w-full h-[180px] my-3' alt={item.title} />
                            </div>
                            <div className="w-4/6  ps-3">
                                <h2 className='mb-3 text-xl'>{item.title}</h2>
                                <h2 className='mb-3 text-xl text-green-600'>{item.price} EGP</h2>
                                <button
                                    onClick={() => deleteProductWishlist(item.id)}
                                    type="button"
                                    className="focus:outline-none text-red-600  mt-3  focus:ring-4  focus:ring-green-300 font-medium rounded-lg text-sm  py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">     <i className="fa-solid fa-trash-can"></i> Remove
                                </button>
                            </div>
                            <div className="w-1/6 flex justify-center items-center">
                                <button
                                    onClick={() => addProductToCart(item.id)}
                                    type="button"
                                    className="focus:outline-none border border-green-400 text-black  mt-3  focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-xl px-5 py-2.5 me-2 mb-2"                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-5 text-center text-green-600">
                        <h2 className='text-3xl font-bold'>No Data To Display</h2>
                    </div>
                )}
            </div>
        </section>
    );
}

export default WishList;
