import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import { Toaster } from 'react-hot-toast'
import Login from './Components/Login/Login'
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Products from './Components/Products/Products'
import { QueryClient, QueryClientProvider } from 'react-query'
import Category from './Components/Categeroy/Categeroy'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext';
import Cart from './Components/Cart/Cart'
import Payment from './Components/Payment/Payment'
import AllOrders from './Components/AllOrders/AllOrders'
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import WishList from './Components/WishList/WishList'
import WishContextProvider from './Context/WishContext'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'

function App() {
  const [count, setCount] = useState(0)
  const x = new QueryClient()
  const router = createBrowserRouter([
    {
      path: '/E-commerce',
       element: <Layout />,
        children: [
        { index: true, element: (<ProtectedRoute> <Home /> </ProtectedRoute>), },
        { path: 'Products', element: (<ProtectedRoute><Products /></ProtectedRoute>), },
        { path: 'Brands', element: (<ProtectedRoute><Brands /></ProtectedRoute>), },
        { path: 'ProductDetails/:id', element: (<ProtectedRoute><ProductDetails /></ProtectedRoute>), },
        { path: 'Register', element: <Register /> },
        { path: 'Login', element: <Login /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'verifycode', element: <VerifyCode /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: 'Category', element: <Category /> },
        { path: 'Cart', element: (<ProtectedRoute><Cart /></ProtectedRoute>), },
        { path: 'Payment', element: (<ProtectedRoute><Payment /></ProtectedRoute>), },
        { path: 'allorders', element: (<ProtectedRoute><AllOrders /></ProtectedRoute>), },
        { path: 'wishlist', element: (<ProtectedRoute><WishList /></ProtectedRoute>), },

      ]
    }
  ])
  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider>
        <CartContextProvider>
          <WishContextProvider>
            <Toaster />
            <RouterProvider router={router} />
          </WishContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>)
}

export default App
