import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedProduct, createProductAsync, fetchProductByIDAsync, selectAllBrands, selectAllCategories, selectedProduct, updateProductAsync } from '../../product/productSlice'
import { useForm } from 'react-hook-form';
import { Link, Navigate, useParams } from 'react-router-dom';

export default function ProductUpdateForm() {
    const brands = useSelector(selectAllBrands);
    const categories = useSelector(selectAllCategories);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const params = useParams();
    const selectedItem = useSelector(selectedProduct);

    useEffect(()=>{
        if(params.id){
            dispatch(fetchProductByIDAsync(params.id));
        }
    },[params.id, dispatch])


    useEffect(()=>{
        if(selectedItem){
            setValue('title', selectedItem.title);
            setValue('description', selectedItem.description);
            setValue('price', selectedItem.price);
            setValue('discountPercentage', selectedItem.discountPercentage);
            setValue('stock', selectedItem.stock);
            setValue('brand', selectedItem.brand);
            setValue('category', selectedItem.category);
            setValue('thumbnail', selectedItem.thumbnail);
            setValue('image1', selectedItem.images[0]);
            setValue('image2', selectedItem.images[1]);
            setValue('image3', selectedItem.images[2]);
            setValue('image4', selectedItem.images[3]);
            setValue('image5', selectedItem.images[4]);
        }
    },[selectedItem, setValue])

    const handleDelete = ()=>{
        const deletedProduct = {...selectedItem};
        deletedProduct.active = false;
        dispatch(updateProductAsync(deletedProduct));
    }
    return (
        <form
            noValidate
            onSubmit={handleSubmit((data) => {
                const product = {
                    title: data.title,
                    description: data.description,
                    price: +data.price,
                    discountPercentage: +data.discountPercentage,
                    rating: selectedItem.rating,
                    stock: +data.stock,
                    brand: data.brand,
                    active: true,
                    category: data.category,
                    thumbnail: data.thumbnail,
                    images: [
                        data.image1,
                        data.image2,
                        data.image3,
                        data.image4,
                        data.image5,
                    ]
                }
                product.id = selectedItem.id
                dispatch(updateProductAsync(product));
                reset();
            })}
        >
            <div className="space-y-12 bg-white p-10">
                <div className="border-b border-gray-900/10 pb-12">
                    <h1 className="font-bold text-gray-900">Add a new product</h1>
                    <hr />
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                        Fill the below details of the product
                    </p>
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Product name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="text"
                                        id="title"
                                        {...register('title', {
                                            required: "Product name is required."
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter the name of the product"
                                    />
                                </div>
                                {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
                            </div>
                        </div>

                        <div className='sm:col-span-6 flex sm:flex-row'>
                            <div className='mr-10 w-1/4'>
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                                        <select id='brand' className='select-text 1.5 pl-1 text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md bg-transparent ring-gray-300 border-0 w-full'
                                            {...register('brand', {
                                                required: "Product brand is required."
                                            })}>
                                            <option value=''></option>
                                            {brands.map((brand, index) => (
                                                <option key={index} value={brand.value}>{brand.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.brand && <p className='text-sm text-red-500'>{errors.brand.message}</p>}
                                </div>
                            </div>
                            <div className='mr-10 w-1/4'>
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <select id='category' className='select-text 1.5 pl-1 text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md bg-transparent ring-gray-300 border-0 w-full'
                                            {...register('category', {
                                                required: "Product category is required."
                                            })}>
                                            <option value=''></option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category.value}>{category.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.category && <p className='text-sm text-red-500'>{errors.category.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-6 flex justify-between">
                            <div className='w-1/4'>
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                                    >
                                        <input
                                            type="number"
                                            {...register('price', {
                                                required: "Product price is required.",
                                                min: 1
                                            })}
                                            id="price"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                                            placeholder="Price"
                                        />
                                    </div>
                                    {errors.price && <p className='text-sm text-red-500'>{errors.price.message}</p>}
                                </div>
                            </div>
                            <div className='w-1/4'>
                                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discounted percentage
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                                    >
                                        <input
                                            type="number"
                                            {...register('discountPercentage', {
                                                min: 0,
                                                max: 100
                                            })}
                                            id="discountPercentage"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Discount percentage"
                                        />
                                    </div>
                                    {errors.discountPercentage && <p className='text-sm text-red-500'>{errors.discountPercentage.message}</p>}
                                </div>
                            </div>
                            <div className='w-1/4'>
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="number"
                                            {...register('stock', {
                                                required: "Stock availability count is required.",
                                                min: 0
                                            })}
                                            id="stock"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Items in stock"
                                        />
                                    </div>
                                    {errors.stock && <p className='text-sm text-red-500'>{errors.stock.message}</p>}
                                </div>
                            </div>


                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    rows={3}
                                    {...register('description')}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                            {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                Thumbnail
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="text"
                                        id="thumbnail"
                                        {...register('thumbnail', {
                                            required: "Product thumnail image is required."
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter a thumbnail for the product"
                                    />
                                </div>
                                {errors.thumbnail && <p className='text-sm text-red-500'>{errors.thumbnail.message}</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 1
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="text"
                                        name="image1"
                                        {...register('image1', {
                                            required: "Product image is required."
                                        })}
                                        id="image1"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter few image the product"
                                    />
                                </div>
                                {errors.image1 && <p className='text-sm text-red-500'>{errors.image1.message}</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 2
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="text"
                                        name="image2"
                                        id="image2"
                                        {...register('image2')}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter few image the product"
                                    />
                                </div>
                                {errors.image2 && <p className='text-sm text-red-500'>{errors.image2.message}</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 3
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="text"
                                        name="image3"
                                        id="image3"
                                        {...register('image3')}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter few image the product"
                                    />
                                </div>
                                {errors.image3 && <p className='text-sm text-red-500'>{errors.image3.message}</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 4
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="text"
                                        name="image4"
                                        id="image4"
                                        {...register('image4')}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter few image the product"
                                    />
                                </div>
                                {errors.image4 && <p className='text-sm text-red-500'>{errors.image4.message}</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="image5" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 5
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                        type="text"
                                        name="image5"
                                        id="image5"
                                        {...register('image5')}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter few image the product"
                                    />
                                </div>
                                {errors.image5 && <p className='text-sm text-red-500'>{errors.image5.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>



                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to={'/admin'} onClick={()=>reset()} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>
                    {selectedItem && <button 
                    onClick={()=>handleDelete()}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete
                    </button>}
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}
