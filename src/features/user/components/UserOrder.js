import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders,
} from '../userSlice';
import { Link } from 'react-router-dom';
import { discountedPrice } from '../../../app/constants';

export default function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch,user.id])
  return (
    <div className='mx-auto max-w-2xl px-0 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8'>
      {orders.map((order, index) => (
        <div className="mx-auto mb-4 bg-white max-w-7xl px-4 sm:px-6 lg:px-8" key={index}>
          <div className="p-5">
            <h1 className='text-2xl'>Order #{order.id}</h1>
            <h3 className='text-xl text-red-900'>Order status : {order.status}</h3>
            <hr />
            <div className="flow-root mt-5">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/product-detail/${product.itemId}`} className=' hover:underline'>{product.title}</Link>
                          </h3>
                          <p className="ml-4">${discountedPrice(product) * product.quantity}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          Qty:&nbsp;{product.quantity}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between  my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between  my-2 text-base font-medium text-gray-900">
              <p>Total items in cart</p>
              <p>{order.totalItems} items</p>
            </div>
            <div className="min-w-0 flex-auto">
              <p className="mt-0.5 text-sm   text-gray-700">Shipping Address:</p>
              <p className="text-sm  leading-5 text-gray-900">{order.selectedAddress.name}</p>
              <p className="mt-1 truncate text-xs  leading-5 text-gray-900">{order.selectedAddress.street},{order.selectedAddress.city}, {order.selectedAddress.pinCode}</p>
              <p className="mt-1 truncate text-xs  leading-5 text-gray-900">{order.selectedAddress.email}</p>
              <p className="mt-1 truncate text-xs  leading-5 text-gray-900">{order.selectedAddress.phone}</p>
            </div>
          </div>
        </div >
      ))}
    </div>
  );
}
