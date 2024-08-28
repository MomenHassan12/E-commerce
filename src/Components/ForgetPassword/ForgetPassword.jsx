import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
    const [email, setEmail] = useState(' ')
    const navigate = useNavigate()
    async function setEmailForgetPassword() {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
                {
                    email: email
                }
            )
            console.log(data)
            toast.success(data.message)
            navigate('/E-commerce/verifycode')

        } catch (error) {
            console.log(error)
            toast.error("Write the correct email")
        }
    }
    return (
        <section className='mt-20 w-full mx-auto'>
            <div className="w-full md:w-[80%] mx-auto p-5">
                <h1 className="mt-8  text-3xl font-semibold ">please enter your verification code</h1>

                <div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="email"
                            class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">

                            email:
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=" "
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={setEmailForgetPassword}
                        type="button"
                        className="hover:text-white text-green-600  hover:bg-green-700 border border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">verify</button>
                </div>
            </div>

        </section>)
}

export default ForgetPassword
