import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'

const AllOrders = () => {
    const [loading, setLoading] = useState(false)
    const [allOrders, setAllOrders] = useState(null)
    const { id } = jwtDecode(localStorage.getItem('tkn'))
    console.log(id)
    async function getAllOrders() {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            console.log(data)
            setAllOrders(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(function () {
        getAllOrders()
    }, [])
    if (loading) {
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
        )
    }

    return (

        <section className='py-24'>
            <div className="w-full md:w-[80%] mx-auto  p-5 ">
                {allOrders ? allOrders.map((order, idx) => (
                    <div key={idx} className=''>
                        <div className="bg-slate-200 p-4 mb-3">
                            <div className="flex flex-wrap justify-center  items-center gap-2">
                                {order.cartItems ? order.cartItems.map((item, idx) => (
                                    <div key={idx} className='w-[22%] '>
                                        <img src={item.product.imageCover} className='w-full' alt="" />
                                        <h2 className='text-center'>{item.product.title}</h2>
                                    </div>
                                )) : ""}
                            </div>
                            <h2>Total order price :{order.totalOrderPrice} EGP</h2>
                            <h2>Payment Method Type : {order.paymentMethodType}</h2>
                        </div>
                    </div>
                )) : ""}
            </div>
        </section>)
}

export default AllOrders
