import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'
import axios from 'axios'
import * as Yup from "yup";
import { useFormik } from 'formik'


const ResetPassword = () => {

    const { setToken, token } = useContext(authContext)

    const user = {
        email: "",
        newPassword: "",
    };
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email is Required")
            .email("Enter valid Email"),
        newPassword: Yup.string()
            .required("Password is Required")
            .matches(/^[A-Z][a-z0-9]{3,10}$/, "Password must start with an uppercase letter"),
    });

    async function setResetPassword(values) {
        try {
            const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
                values
            )


            setToken(data.token);
            localStorage.setItem('tkn', data.token)
            toast.success("success")
            navigate('/E-commerce')
        } catch (error) {
            console.log(error)
            toast.error("Enter the correct email and password")
        }
    }
    const formik = useFormik({
        initialValues: user,
        validationSchema: validationSchema,
        onSubmit: setResetPassword,
    });
    return (
        <section className='mt-20 w-full mx-auto'>
            <div className="w-full md:w-[80%] mx-auto p-5">
                <h1 className="mt-8  text-3xl font-semibold ">reset your account password</h1>
                <div className='mt-6'>
                    <form onSubmit={formik.handleSubmit} className="w-full mx-auto py-5">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="email"
                                name="email"
                                id="email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                email
                            </label>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-600 bg-red-200 p-4  mt-2 border border-solid border-red-500 rounded text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="newPassword"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                New Password
                            </label>
                            {formik.touched.newPassword && formik.errors.newPassword ? (
                                <div className="text-red-600 bg-red-200 p-4  mt-2 border border-solid border-red-500 rounded text-sm">{formik.errors.newPassword}</div>
                            ) : null}
                        </div>
                        <button
                            type="submit"
                            className="hover:text-white text-green-600  hover:bg-green-700 border border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">verify</button>

                    </form>
                </div>
            </div>

        </section >)
}


export default ResetPassword
