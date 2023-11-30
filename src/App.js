import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import ProductList from './features/product/components/ProductList';
import Home from './pages/HomePage';
import Login from './features/auth/components/Login';
import SignupPage from './pages/SignupPage';


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import ProductDetail from './features/product/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  ,
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/product-detail",
    element: <ProductDetailPage />,
  },
]);

function App() {
  return (
    <h1 className="text-3xl font-bold underline">
        <RouterProvider router={router} />
    </h1>
  )
}

export default App;
