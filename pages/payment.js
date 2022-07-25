import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form onSubmit={submitHandler} className="max-w-screen-md mx-auto">
        <h1 className="text-xl mb-4">Payment Method</h1>
        {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              onChange={() => setSelectedPaymentMethod(payment)}
              type="radio"
              name="paymentMethod"
              className="outline-none p-2 focus:ring-0"
              id={payment}
              checked={selectedPaymentMethod === payment}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => router.push('shipping')}
            type="button"
            className="rounded bg-gray-100 py-2  px-4 text-black shadow outline-none hover:bg-gray-200  active:bg-gray-300"
          >
            Back
          </button>
          <button className="rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
}

PaymentScreen.auth = true;
