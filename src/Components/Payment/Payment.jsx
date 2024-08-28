import axios from 'axios';
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const Payment = () => {
    const { cartId } = useContext(cartContext);

    const validationSchema = Yup.object({
        details: Yup.string()
            .required('Details are required')
            .min(5, 'Details must be at least 5 characters long')
            .max(200, 'Details cannot be more than 200 characters long'),

        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^\d{11}$/, 'Phone number must be exactly 10 digits'),

        city: Yup.string()
            .required('City is required')
            .min(2, 'City must be at least 2 characters long')
            .max(100, 'City cannot be more than 100 characters long')
    });

    async function onlinePayment(values) {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://https://momenhassan12.github.io/E-commerce`,
                values,
                {
                    headers: {
                        token: localStorage.getItem('tkn'),
                    },
                }
            );

            toast.success(data.status);
            console.log(data.session.url)
            window.open(data.session.url);
        } catch (error) {
            toast.error('Error during payment');
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        validationSchema: validationSchema,
        onSubmit: onlinePayment,
    });

    return (
        <section className='my-20'>
            <h2 className='text-green-600 text-center text-2xl font-mono'>Payment</h2>
            <div className="w-full md:w-[80%] mx-auto p-5">
                <div>
                    <form onSubmit={formik.handleSubmit} className="w-full mx-auto py-5">
                        {/* Phone */}
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                htmlFor="phone"
                                class="block mb-2 text-sm font-normal text-gray-900 dark:text-white"
                            >
                                Phone number (123-456-7890)
                            </label>

                            <input
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder=" "
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="text-red-600 bg-red-200 p-4 mt-2 border border-solid border-red-500 rounded text-sm">
                                    {formik.errors.phone}
                                </div>
                            ) : null}
                        </div>

                        {/* City */}
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                htmlFor="city"
                                class="block mb-2 text-sm font-normal text-gray-900 dark:text-white"
                            >
                                City
                            </label>

                            <input
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                name="city"
                                id="city"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=" "
                            />
                            {formik.touched.city && formik.errors.city ? (
                                <div className="text-red-600 bg-red-200 p-4 mt-2 border border-solid border-red-500 rounded text-sm">
                                    {formik.errors.city}
                                </div>
                            ) : null}
                        </div>

                        {/* Details */}
                        <label
                            htmlFor="details"
                            class="block mb-2 text-sm font-normal text-gray-900 dark:text-white"
                        >
                            Details
                        </label>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                value={formik.values.details}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                name="details"
                                id="details"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=" "
                            />
                            {formik.touched.details && formik.errors.details ? (
                                <div className="text-red-600 bg-red-200 p-4 mt-2 border border-solid border-red-500 rounded text-sm">
                                    {formik.errors.details}
                                </div>
                            ) : null}
                        </div>

                        <div className="text-center w-full">
                            <button
                                type="submit"
                                disabled={!formik.isValid || !formik.dirty}
                                className={"hover:text-black w-full border text-sky-400 border-sky-400  hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 " +
                                    (!formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : "")}
                            >
                                Pay Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Payment;
