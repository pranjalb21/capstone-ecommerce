import React, { useEffect } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


import Home from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import Page404 from './pages/Page404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrders from './pages/UserOrders';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHomePage from './pages/AdminHomePage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductForm from './pages/AdminProductForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHomePage /></ProtectedAdmin>,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  ,
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage /></Protected>,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductForm /></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductForm /></ProtectedAdmin>,
  },
  {
    path: "/order-success/:id",
    element: <Protected><OrderSuccess /></Protected>,
  },
  {
    path: "/orders",
    element: <Protected><UserOrders /></Protected>,
  },
  {
    path: "/profile",
    element: <Protected><UserProfilePage /></Protected>,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    };
  },[dispatch, user?.id]);

  return (
    <h1 className="text-3xl font-bold underline">
        <RouterProvider router={router} />
    </h1>
  )
}

export default App;
