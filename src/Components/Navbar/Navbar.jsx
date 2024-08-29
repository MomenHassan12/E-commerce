import { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import img1 from "../../assets/images/freshcart-logo.svg";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
    const { token, setToken } = useContext(authContext);
    const { numOfItems } = useContext(cartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("tkn") !== null) {
            setToken(localStorage.getItem("tkn"));
        }
    }, []);

    function logout() {
        localStorage.removeItem("tkn");
        setToken(null);
        navigate("Login");
    }

    return (
        <nav className="!bg-[#F8F9FA] w-full border-gray-200 fixed top-0 left-0 z-50 dark:bg-gray-900">
            <div className="w-[95%] !bg-[#F8F9FA] flex flex-wrap items-center justify-between mx-auto sm:p-0 sm:pb-4 md:p-4">
                <NavLink to="/E-commerce" className="md:w-[15%] lg:w-[25%]">
                    <img src={img1} className="!w-[150px]" alt="icon" />
                </NavLink>

                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex order-12 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                <div
                    className="hidden lg:w-[75%] md:w-[30%] lg:flex lg:flex-wrap lg:!justify-end lg:!items-center !bg-[#F8F9FA]"
                    id="navbar-default"
                >
                    {token && (
                        <ul className="font-normal flex gap-2 w-[85%] flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg !bg-[#F8F9FA] lg:flex-row lg:space-x-4 rtl:space-x-reverse lg:mt-0 md:border-0 lg:bg-white">
                            <li>
                                <NavLink
                                    to="/E-commerce"
                                    className="py-2 px-1 !text-gray-500 rounded hover:text-black"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="Cart"
                                    className="py-2 px-1 text-gray-500 rounded hover:text-black"
                                >
                                    Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="wishlist"
                                    className="py-2 px-1 text-gray-500 rounded hover:text-black"
                                >
                                    WishList
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="Products"
                                    className="py-2 px-1 text-gray-500 rounded hover:text-black"
                                >
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="Category"
                                    className="py-2 px-1 text-gray-500 rounded hover:text-black"
                                >
                                    Categories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="Brands"
                                    className="py-2 px-1 text-gray-500 rounded hover:text-black"
                                >
                                    Brands
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="allorders"
                                    className="py-2 px-1 text-gray-500 rounded hover:text-black"
                                >
                                    All Orders
                                </NavLink>
                            </li>
                        </ul>
                    )}
                    <div className="w-[15%] sm:mt-5 lg:mt-0 justify-self-end">
                        {token ? (
                            <>
                                <Link
                                    to="Cart"
                                    className="py-2 px-1 text-gray-500 rounded hover:text-black sm:block lg:inline"
                                >
                                    <i className="text-xl relative fa-solid fa-cart-shopping">
                                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded -top-5 -end-5 dark:border-gray-900">
                                            {numOfItems}
                                        </div>
                                    </i>
                                </Link>
                                <button onClick={logout}>
                                    <NavLink
                                        to="Register"
                                        className="py-2 px-1 text-gray-500 rounded hover:text-black"
                                    >
                                        Logout
                                    </NavLink>
                                </button>
                            </>
                        ) : (
                            <>
                                <button>
                                    <NavLink
                                        to="Login"
                                        className="py-2 px-1 text-gray-500 rounded hover:text-black"
                                    >
                                        Login
                                    </NavLink>
                                </button>
                                <button>
                                    <NavLink
                                        to="Register"
                                        className="py-2 px-1 text-gray-500 rounded hover:text-black"
                                    >
                                        Register
                                    </NavLink>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
