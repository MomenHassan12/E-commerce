import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {

    const [isLoading, setIsLoading] = useState(false)
    const user = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
    };
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is Required")
            .min(3, "Name must be min 3 chars")
            .max(15, "Name must be max 15 chars"),
        email: Yup.string()
            .required("Email is Required")
            .email("Enter valid Email"),
        password: Yup.string()
            .required("Password is Required")
            .matches(/^[A-Z][a-z0-9]{3,10}$/, "Password must start with an uppercase letter"),
        rePassword: Yup.string()
            .required("RePassword is Required")
            .oneOf([Yup.ref("password")], "Repassword does not match with password"),
        phone: Yup.string()
            .required("Phone is Required")
            .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
    });

    async function registerUser(values) {
        setIsLoading(true)
        try {
            const respones = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            console.log(respones)
            toast.success('Success')
            setIsLoading(false)
            navigate('/Login')
        } catch (err) {
            console.log(err.response.data.message)
            toast.error("Failed.")
            setIsLoading(false)

        }

    }

    const formik = useFormik({
        initialValues: user,
        validationSchema: validationSchema,
        onSubmit: registerUser,
    });

    return (
        <>
            <div className="py-10 mt-16">
                <div className="sm:w-[100%] md:w-[80%] mx-auto md:p-0 p-5">
                    <h1 className="mt-8 text-3xl font-semibold ">Register Now</h1>
                    <form onSubmit={formik.handleSubmit} className="w-full mx-auto py-5">
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                htmlFor="name"
                                class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
                                Name :
                            </label>
                            <input
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                name="name"
                                id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                placeholder=" "
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-600 bg-red-200 p-4  mt-2 border border-solid border-red-500 rounded text-sm">{formik.errors.name}</div>
                            ) : null}

                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                htmlFor="email"
                                class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
                                Email address :
                            </label>
                            <input
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="email"
                                name="email"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=" "
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-600 bg-red-200 p-4  mt-2 border border-solid border-red-500 rounded text-sm">{formik.errors.email}</div>
                            ) : null}

                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                htmlFor="password"
                                class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
                                Password :
                            </label>
                            <input
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="password"
                                name="password"
                                id="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=" "
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-600 bg-red-200 p-4  mt-2 border border-solid border-red-500 rounded text-sm">{formik.errors.password}</div>
                            ) : null}

                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                htmlFor="rePassword"
                                class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
                                Confirm password :
                            </label>
                            <input
                                value={formik.values.rePassword}
                                onChange={formik.handleChange}
                                type="password"
                                name="rePassword"
                                id="rePassword"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=" "
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.rePassword && formik.errors.rePassword ? (
                                <div className="text-red-600 bg-red-200 p-4  mt-2 border border-solid border-red-500 rounded text-sm">{formik.errors.rePassword}</div>
                            ) : null}

                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                htmlFor="phone"
                                class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
                                Phone number (123-456-7890)
                            </label>

                            <input
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="tel"
                                name="phone"
                                id="phone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=" "
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="text-red-600 bg-red-200 p-4  mt-2 border border-solid border-red-500 rounded text-sm">{formik.errors.phone}</div>
                            ) : null}
                        </div>
                        <button type="submit" className=" float-end focus:outline-none border border-gray-400 text-gray-400  mt-3  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{isLoading ? <i className=" text-white fa-solid fa-spinner fa-spin" ></i> : 'Register Now'}</button>

                    </form>
                </div>
            </div>
        </>
    );
}
