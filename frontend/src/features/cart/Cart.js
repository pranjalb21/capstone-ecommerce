import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteCartItemAsync,
  selectItems, updateCartAsync,
} from './cartSlice';

import { Link, Navigate } from 'react-router-dom';
import { discountedPrice } from '../../app/constants';


export default function Cart() {
  const [open, setOpen] = useState(true)
  const products = useSelector(selectItems);
  console.log(products)
  const items = useSelector(selectItems);
  const totalAmount = products.reduce((amount, item) => discountedPrice(item.item) * item.quantity + amount, 0)
  const totalItems = products.reduce((totalItem, item) => item.quantity + totalItem, 0);
  const dispatch = useDispatch()

  const handleChange = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }))
  }

  const handleDelete = (e, id) => {
    dispatch(deleteCartItemAsync(id))
  }
  return (
    <>
      {items.length <= 0 && <Navigate to={'/'}></Navigate>}
      <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 p-5">
          <h2 className='text-2xl'>Cart Items</h2>
          <hr />
          <div className="flow-root mt-5">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.item.thumbnail}
                      alt={product.item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/product-detail/${product.item.id}`} className=' hover:underline'>{product.item.title}</Link>
                        </h3>
                        <p className="ml-4">${discountedPrice(product.item) * product.quantity}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.item.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        Qty:&nbsp;
                        <select
                          onChange={(e) => handleChange(e, product)}
                          value={product.quantity}
                          className='absolute z-10 -mt-1.5 max-h-56 w-half overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={(e) => handleDelete(e, product.id)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mx-5 px-4 py-6 sm:px-6">
          <div className="flex justify-between mx-5 my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between mx-5 my-2 text-base font-medium text-gray-900">
            <p>Total items in cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm mx-5 text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6 mx-5">
            <Link
              to={'/checkout'}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center  text-center text-sm text-gray-500">
            <p>
              or
              <Link to={"/"}>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  &nbsp;Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div >
    </>
  );
}
