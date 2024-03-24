import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserInfo
} from '../userSlice';
import { selectLoggedInUser, updateUserAsync } from '../../auth/authSlice';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [updateAddressIndex, setUpdateAddressIndex] = useState(-1)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const handleAddNewAddress = (data) => {
    const newUser = { ...user, addresses: [...user.addresses, data] };
    dispatch(updateUserAsync(newUser));
  }

  const handleEdit = (updatedAddress, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, updatedAddress);
    dispatch(updateUserAsync(newUser));
    setUpdateAddressIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
    setUpdateAddressIndex(-1);
    reset();
  }

  const handleEditForm = (e, index) => {
    setUpdateAddressIndex(index);
    const address = user.addresses[index];
    setValue('name', address.name);
    setValue('email', address.email);
    setValue('phone', address.phone);
    setValue('country', address.country);
    setValue('street', address.street);
    setValue('city', address.city);
    setValue('state', address.state);
    setValue('pincode', address.pincode);
  }

  const handleReset = () => {
    setUpdateAddressIndex(-1);
    reset();
  }

  return (
    <div className='mx-auto max-w-2xl px-0 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">{user.role === 'admin' && user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile</h2> 
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <p
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >{user.name}</p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <p
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >{user.email.toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Saved Addresses</p>
          <p className='text-xs mt-2 text-gray-500'>Check/Uncheck to change the default address</p>

          {user.addresses.map((address, index) => (
            <div className="mt-1 border p-2 space-y-10" key={index}>
              <fieldset>
                <div className="mt-1 space-y-6">
                  <div className="relative flex gap-x-3 justify-between">
                    <div className='flex w-1/2'>
                      <div className="flex h-6 items-center mr-2">
                        <input
                          id="address"
                          name="address"
                          type="radio"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="comments" className="leading-5 text-gray-900">
                          {address.name}
                        </label>
                        <p className=" truncate text-xs  leading-5 text-gray-900">{address.street},{address.city}, {address.pinCode}</p>
                        <p className=" truncate text-xs  leading-5 text-gray-900">{address.email}</p>
                        <p className=" truncate text-xs  leading-5 text-gray-900">{address.phone}</p>
                      </div>
                    </div>
                    <div className="w-1/2 flex-col inline-block justify-end text-right">
                      <button
                        type="button"
                        onClick={(e) => handleEditForm(e, index)}
                        className="text-sm text-indigo-400 hover:text-indigo-600 m-4"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleRemove(e, index)}
                        className="text-sm text-indigo-400 hover:text-indigo-600 m-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          ))}
        </div>
        <div className=" border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-600">{updateAddressIndex === -1 ? "Add a new shipping address" : "Update address"}.</p>
          <form noValidate className="bg-white p-5 rounded"
            onSubmit={handleSubmit((data) => {
              updateAddressIndex === -1 ? handleAddNewAddress(data) : handleEdit(data, updateAddressIndex);
              reset();
            })}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => handleReset()}>
                  {updateAddressIndex === -1 ? "Reset" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {updateAddressIndex === -1 ? "Add address" : "Save changes"}
                </button>
              </div>
            </div>
          </form>
        </div>


      </div>


    </div>
  );
}
