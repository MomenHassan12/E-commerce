import axios from 'axios'
import React from 'react'
import { Circles } from 'react-loader-spinner'
import { useQuery } from 'react-query'

const Brands = () => {
    async function getAllBrands() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
    const { data, isLoading } = useQuery("brands", getAllBrands)
    console.log(data?.data.data)
    console.log(isLoading)

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
        <section className="py-16">
            <div className="w-full md:w-[95%] m-auto">
                <h1 className=" my-10 text-4xl text-green-500 text-center font-semibold ">All Brands</h1>

                <div className=" gap-4 flex flex-wrap justify-center items-center">
                    {data?.data.data?.map((item, idx) => (

                        <div key={idx} className=" border-2 shadow hover:shadow-md transition-shadow duration-300 hover:ring-2 hover:ring-green-100 border-1 rounded sm:w-[23%] w-[80%]" >
                            <img src={item.image} className='w-full' alt="" />
                            <h2 className='text-xl text-center py-5 ' >{item.name}</h2>

                        </div>

                    ))}
                </div>
            </div>
        </section>
    )
}


export default Brands
