import React, { useContext } from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import Link from 'next/link';
import { Store } from '../utils/Store';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="text-xl mb-4">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:gap-5 md:grid-cols-4">
          <div className="overflow-x-auto md:col-span-3">
            <div className="p-5 mb-5  block rounded-lg border border-gray-200 shadow-md">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address}, ,
                {shippingAddress.city}, {shippingAddress.postalCode}, ,
                {shippingAddress.country}
              </div>
              <div>
                <Link href="/shipping">Edit</Link>
              </div>
            </div>
            <div className="p-5 mb-5  block rounded-lg border border-gray-200 shadow-md">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className="p-5 mb-5  block rounded-lg border border-gray-200 shadow-md">
                <h2 className="mb-2 text-lg">Order Items</h2>
                <table className='min-w-full'>

                </table>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
