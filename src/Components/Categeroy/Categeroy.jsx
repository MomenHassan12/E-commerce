import axios from 'axios'
import React from 'react'
import { Circles } from 'react-loader-spinner'
import { useQuery } from 'react-query'

const Category = () => {
    async function getAllCategory() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const { data, isLoading } = useQuery("category", getAllCategory)
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
        <section className="my-24">
            <div className="w-full md:w-[90%] m-auto">

                <div className=" gap-4 flex flex-wrap justify-center items-center">
                    {data?.data.data?.map((item, idx) => (

                        <div key={idx} className="  border-2 shadow hover:shadow-md transition-shadow duration-300 hover:ring-2 hover:ring-green-100 rounded sm:w-[30%] w-[80%]" >
                            <img src={item.image} className='w-full  h-[300px]' alt="" />
                            <h2 className='py-5 text-3xl text-green-500 text-center ' >{item.name}</h2>

                        </div>

                    ))}
                </div>
            </div>
        </section>
    )
}


export default Category
