import React from 'react';
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';

export default function shipping() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const submitHandler = () => {

  }
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-w-screen-md mx-auto"
      >
        <h1 className='text-xl mb-4'>Shipping Address</h1>
        <div className='mb-4'>
            <label htmlFor='fullName'>Full Name</label>
            <input id="fullName" className='w-full' autoFocus {...register('fullName', {
                required: 'Please enter full name',
            })} />
            {errors.fullName && (
                <div className='text-red-500'>{errors.fullName.message}</div>
            )}
        </div>
        <div className='mb-4'>
            <label htmlFor='address'>Address</label>
            <input id="address" className='w-full' autoFocus {...register('address', {
                required: 'Please enter address',
                minLength: { value: 3, message: 'Address is more than 2 chars'},
            })} />
            {errors.address && (
                <div className='text-red-500'>{errors.address.message}</div>
            )}
        </div>
        <div className='mb-4'>
            <label htmlFor='city'>City</label>
            <input id="city" className='w-full' autoFocus {...register('city', {
                required: 'Please enter city',
            })} />
            {errors.city && (
                <div className='text-red-500'>{errors.city.message}</div>
            )}
        </div>
        <div className='mb-4'>
            <label htmlFor='postalCode'>Postal Code</label>
            <input id="postalCode" className='w-full' autoFocus {...register('postalCode', {
                required: 'Please enter postal code',
            })} />
            {errors.postalCode && (
                <div className='text-red-500'>{errors.postalCode.message}</div>
            )}
        </div>
        <div className='mb-4'>
            <label htmlFor='country'>Country</label>
            <input id="country" className='w-full' autoFocus {...register('country', {
                required: 'Please enter country',
            })} />
            {errors.country && (
                <div className='text-red-500'>{errors.country.message}</div>
            )}
        </div>
        <div className='flex justify-between mb-4'>
            <button className='rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500'>Next</button>
        </div>
      </form>
    </Layout>
  );
}
