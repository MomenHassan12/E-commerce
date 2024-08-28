import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
    const { setToken, token } = useContext(authContext)
    const [isLoading, setIsLoading] = useState(false)

    const user = {
        email: "",
        password: "",
    };
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email is Required")
            .email("Enter valid Email"),
        password: Yup.string()
            .required("Password is Required")
            .matches(/^[A-Z][a-z0-9]{3,10}$/, "Password must start with an uppercase letter"),
    });

    async function registerUser(values) {
        setIsLoading(true)
        try {
            const respones = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",
                values)
            console.log(respones)
            console.log(respones.data.token)

            toast.success('Success')
            setIsLoading(false)
            setToken(respones.data.token);
            localStorage.setItem('tkn', respones.data.token)
            console.log(token)

            navigate('/E-commerce')
        } catch (err) {
            console.log(err)
            toast.error("Failed.")
            setIsLoading(false)

        }

    }

    const formik = useFormik({
        initialValues: user,
        validationSchema: validationSchema,
        onSubmit: registerUser,
    });


    return (<>
        <div className="py-10 mt-16">
            <div className="sm:w-[100%]  md:w-[80%]  mx-auto md:p-0 p-5">
                <h1 className="mt-8 text-3xl font-semibold ">Login Now</h1>

                <form onSubmit={formik.handleSubmit} className="w-full mx-auto py-5">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            htmlFor="email"
                            class="block mb-2 text-sm font-normal text-gray-900 dark:text-white">Email :
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
                            class="block mb-2 text-sm font-normal text-gray-900 dark:text-white"
                        >
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
                    <div className="flex flex-wrap justify-between">
                        <Link to="/E-commerce/forgetpassword" >forget your password ?</Link>
                        <button type="submit" className="focus:outline-none border border-gray-400 text-gray-400  mt-3  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{isLoading ? <i className=" text-gray-500 fa-solid fa-spinner fa-spin" ></i> : 'Login Now'}</button>
                    </div>
                </form>
            </div >
        </div >
    </>)
}