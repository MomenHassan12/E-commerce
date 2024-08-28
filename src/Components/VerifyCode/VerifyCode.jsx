import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const VerifyCode = () => {
    const [code, setCode] = useState(' ')
    const navigate = useNavigate()
    async function setCodeForgetPassword() {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
                {
                    resetCode: code
                }
            )
            console.log(data)
            toast.success("success")
            navigate('/E-commerce/resetpassword')

        } catch (error) {
            console.log(error)
            toast.error("Write the correct code")
        }
    }
    return (
        <section className='mt-20 w-full mx-auto'>
            <div className="w-full md:w-[80%] mx-auto p-5">
                <h1 className="mt-8  text-3xl font-semibold ">reset your account password</h1>

                <div>
                    <div className="relative mt-6 z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="code"
                            id="code"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <label
                            htmlFor="code"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            code
                        </label>
                    </div>
                    <button
                        onClick={setCodeForgetPassword}
                        type="button"
                        className="hover:text-white text-green-600  hover:bg-green-700 border border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">verify</button>
                </div>
            </div>

        </section>)
}


export default VerifyCode
