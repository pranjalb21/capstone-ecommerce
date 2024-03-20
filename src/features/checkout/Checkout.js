import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteCartItemAsync, selectItems, updateCartAsync } from "../cart/cartSlice";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../auth/authSlice";
import { useState } from "react";
import { createOrderAsync, selectCurrentOrder } from "../order/orderSlice";
import { selectUserInfo } from "../user/userSlice";
import { discountedPrice } from "../../app/constants";

function Checkout() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const products = useSelector(selectItems);
    const items = useSelector(selectItems);
    const currentOrder = useSelector(selectCurrentOrder);
    const totalAmount = products.reduce((amount, item) => discountedPrice(item) * item.quantity + amount, 0)
    const totalItems = products.reduce((totalItem, item) => item.quantity + totalItem, 0);
    const dispatch = useDispatch()
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cash");

    const handleChange = (e, item) => {
        dispatch(updateCartAsync({ ...item, quantity: +e.target.value }))
    }

    const handleDelete = (e, id) => {
        dispatch(deleteCartItemAsync(id))
    }

    const handleAddress = (e) => {
        console.log(user.addresses[e.target.value])
        setSelectedAddress(user.addresses[e.target.value])
    }

    const handlePayment = (e) => {
        console.log(e.target.value)
        setPaymentMethod(e.target.value)
    }

    const handleOrder = (e) => {
        if (selectedAddress && paymentMethod) {
            const order = {
                items,
                totalAmount,
                totalItems,
                user,
                paymentMethod,
                selectedAddress,
                status: 'pending' /*Other statuses are delivered, received */
            }
            dispatch(createOrderAsync(order))
        }
        else {
            alert('Enter Address and Payment method')
        }
        //TODO : Redirect to success order page once a order is successfull.
        //TODO : Clear cart to avoid confusion
        //TODO : Change the stock in server
    }
    const user = useSelector(selectUserInfo)
    return (
        <>
            {items.length <= 0 && <Navigate to={'/'}></Navigate>}
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 mt-10 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <form noValidate className="bg-white p-5 rounded"
                            onSubmit={handleSubmit((data) => {
                                console.log(data)
                                dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }));
                                reset();
                            })}
                        >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Shipping details</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-500">Provide shipping info</p>

                                    <div className="borde-b border-gray-900/10 pb-12 mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-xl font-bold leading-6 text-gray-900">Payment method:</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-500">Please choose a payment method</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="push-everything"
                                                        name="payments"
                                                        value="cash"
                                                        onChange={handlePayment}
                                                        checked={paymentMethod === "cash"}
                                                        type="radio"
                                                        className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                                                    />
                                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="push-email"
                                                        name="payments"
                                                        value="card"
                                                        onChange={handlePayment}
                                                        checked={paymentMethod === "card"}
                                                        type="radio"
                                                        className="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-bold leading-7 text-gray-900">Address</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-500">
                                            Choose from an existing address
                                        </p>
                                        <ul role="list">
                                            {user.addresses.map((address, index) => (
                                                <li key={index} className="flex justify-between gap-x-6 py-5 px-5 border m-1">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <input
                                                            id="push-everything"
                                                            name="adress"
                                                            type="radio"
                                                            onChange={handleAddress}
                                                            value={index}
                                                            className="h-5 w-5 mt-1 self-center cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-bold leading-6 text-gray-900">{address.name}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-600">{address.street}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-600">{address.city}, {address.pinCode}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-600">{address.email}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-600">{address.phone}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>

                                    <p className="mt-1 text-sm leading-6 text-gray-500">Add new address</p>
                                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    {...register('name', { required: 'Name is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', { required: 'Email address is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Mobile number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    {...register('phone', { required: 'Phone number is required' })}
                                                    type="tel"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Country
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    {...register('country', { required: 'Country is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option>India</option>
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>Mexico</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="street"
                                                    {...register('street', { required: 'Street is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="city"
                                                    {...register('city', { required: 'City is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="state"
                                                    {...register('state', { required: 'State is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="pinCode"
                                                    {...register('pinCode', { required: 'Postal code is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add address
                                    </button>
                                </div>


                            </div>
                        </form>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="mx-auto mt-24 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
                            <div className="mt-8 p-5">
                                <h2 className='text-2xl'>Cart Items</h2>
                                <hr />
                                <div className="flow-root mt-5">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {products.map((product) => (
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
                                                                <Link to={`/product-detail/${product.id}`} className=' hover:underline'>{product.title}</Link>
                                                            </h3>
                                                            <p className="ml-4">${discountedPrice(product) * product.quantity}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
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
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between mx-5 my-2 text-base font-medium text-gray-900">
                                    <p>Total items in cart</p>
                                    <p>{totalItems} items</p>
                                </div>
                                <div className="flex justify-between mx-5 my-2 text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${totalAmount}</p>
                                </div>
                                <div className="flex justify-between mx-5 my-2 text-base font-medium text-gray-900">
                                    <p>Shipping cost</p>
                                    <p>$10</p>
                                </div>
                                <div className="flex justify-between mx-5 my-2 text-base font-medium text-gray-900">
                                    <p>Final price</p>
                                    <p>${totalAmount + 10}</p>
                                </div>
                                <div className="mt-6">
                                    <div
                                        onClick={handleOrder}
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                                    >
                                        Order now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;