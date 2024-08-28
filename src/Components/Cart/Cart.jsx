import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'

const Cart = () => {

    const { products, totalPrice, updateCart, deleteItem, clearCart, numOfItems } = useContext(cartContext)

    return (
        <section className='my-32'>

            <div className="w-full md:w-[80%] mx-auto bg-[#F8F9FA] p-9">
                <div className="flex flex-wrap justify-between items-center">
                    <h1 className=" text-3xl font-semibold ">Cart Shop</h1>
                    {products.length != 0 ? (
                        <Link to={'payment'}
                            class="focus:outline-none text-white  mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Check Out</Link>
                    ) : ""}
                </div>
                {products.length != 0 ? (<>
                    <div className="flex flex-wrap justify-between items-center">
                        <h2 className=' text-2xl font-mono'>TotalPrice:<span className='text-green-400 text-2xl font-mono'> {totalPrice}{" "}EGP </span> </h2>
                        <h2 className=' text-2xl font-mono'>Total Number of Items:<span className='text-green-400 text-2xl font-mono'> {numOfItems}{" "} </span> </h2>

                    </div>
                    {products?.map((item, idx) => <>
                        <div key={idx} className="flex flex-wrap justify-center items-center border-b border-slate-300">
                            <div className="w-1/6">
                                <img src={item.product.imageCover} className='w-full h-[180px] my-3' alt="" /></div>
                            <div className="w-4/6">
                                <h2 className='mb-3 text-xl'>{item.product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                <h2 className='mb-3 text-xl'>{item.price}</h2>
                                <button onClick={() => deleteItem(item.product.id)} type="button" className="focus:outline-none text-red-600  mt-3  focus:ring-4  focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><i class="fa-solid fa-trash-can"></i> Remove</button>
                            </div>
                            <div className="w-1/6 flex flex-wrap justify-between items-center ">
                                <button disabled={item.count == 0 ? true : false} onClick={() => updateCart(item.product.id, item.count - 1)} type="button" className={`${item.count == 0 ? "disabled:opacity-25" : ""} focus:outline-none border border-green-400 text-black mt-3  focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}  >-</button>
                                <h2 className=''>{item.count}</h2>
                                <button onClick={() => updateCart(item.product.id, item.count + 1)} type="button" className="focus:outline-none border border-green-400 text-black  mt-3  focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">+</button>
                            </div>
                        </div >

                    </>)}</>) : <>
                    <div className="py-5 text-center">
                        <h2 className='text-3xl font-bold'>No Data To Display</h2>
                    </div>
                </>}
                {products.length != 0 ? (
                    <div className=" flex justify-center">
                        <button onClick={() => clearCart()} type="button" className="focus:outline-none border border-green-400 text-black  mt-3  focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-xl px-5 py-2.5 me-2 mb-2"> Clear Your Cart</button>
                    </div>
                ) : ""}
            </div>
        </section >)
}

export default Cart
