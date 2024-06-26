import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom'
import { resetCartAsync } from '../features/cart/cartSlice';
import { resetOrder } from '../features/order/orderSlice';
import { selectUserInfo } from '../features/user/userSlice';
import Navbar from '../features/navbar/Navbar';

function OrderSuccess({ order }) {
    const param = useParams();
    const user = useSelector(selectUserInfo)
    const dispatch = useDispatch();
    useEffect(()=>{
        //Reset cart
        dispatch(resetCartAsync(user.id)); 
        //Reset current order
        dispatch(resetOrder());     
    },[dispatch, user])
    return (
        <Navbar>
            {!param.id && <Navigate to={'/'} replace={true} />}
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">Congratulations!!</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order has been successfully placed.</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Order ID #{param?.id} has been successfully placed.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to={'/'}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        </Navbar>
    )
}

export default OrderSuccess
