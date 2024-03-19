import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, selectAllOrder, selectTotalOrders } from '../../order/orderSlice'
import { ITEM_LIMIT_PER_PAGE, discountedPrice } from '../../../app/constants'




function AdminOrder() {
    const [page, setPage] = useState(1);
    const orders = useSelector(selectAllOrder);
    const totalOrders = useSelector(selectTotalOrders);
    const dispatch = useDispatch();

    const handleShow = (order) => {
        console.log(order)
    }

    const handleEdit = (order) => {

    }

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEM_LIMIT_PER_PAGE };
        dispatch(fetchAllOrdersAsync(pagination));
    }, [dispatch, page]);
    return (
        <>
            <div className="overflow-x-auto">
                <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Order#</th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-center">
                                            Total amount
                                            <div className='text-xs font-light tracking-tighter font-arial'>*Includes $10 Shipping charges</div>
                                        </th>
                                        <th className="py-3 px-6 text-center">Shipping Address</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.map(order =>
                                        <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100 hover:border-1">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2 font-bold">
                                                        {order.id}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-3 px-6 text-left">
                                                <div className="flex-row  items-center">
                                                    {order.items.map(item =>
                                                        <div key={item.id} className="mr-2 flex ">
                                                            <img
                                                                className="w-12 h-12 rounded-full mr-3"
                                                                src={item.thumbnail}
                                                            />
                                                            <span className='self-center'>{item.title} &nbsp;x {item.quantity} = <b> $<span className='line-through mr-2'>{item.price * item.quantity} </span> ${discountedPrice(item) * item.quantity}</b></span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-start px-5">
                                                    <span className=" text-black-600 py-1 px-3 rounded-full font-bold">
                                                        $ {order.totalAmount}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6">
                                                <div className="flex items-center justify-start px-5">
                                                    <span className=" text-black-600 py-1 px-3 rounded-full font-bold">
                                                        <div>{order.selectedAddress.name},</div>
                                                        <div>{order.selectedAddress.street},{order.selectedAddress.city},</div>
                                                        <div>{order.selectedAddress.state},{order.selectedAddress.country},</div>
                                                        <div>{order.selectedAddress.pinCode}</div>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span className="bg-purple-200 text-red-600 py-1 px-3 rounded-full text-xs font-bold">
                                                    {order.status[0].toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-7 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                                                        onClick={() => handleShow(order)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="w-7 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                                                        onClick={() => handleEdit(order)}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminOrder
