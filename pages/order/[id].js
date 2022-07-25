import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getError } from '../../utils/error';
import Link from 'next/link';
import Image from 'next/image';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    default:
      state;
  }
}

function OrderScreen() {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      order: {},
      error: '',
    }
  );
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'EUR',
          },
        });
        paypalDispatch({
          type: 'setLoadingStatus',
          value: 'pending',
        });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;
  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        shippingAddress
      ) : (
        <div className="grid md:gap-5 md:grid-cols-4">
          <div className="overflow-x-auto md:col-span-3">
            <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},
                {shippingAddress.city}, {shippingAddress.postalCode},
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="my-3 rounded-lg bg-green-100 p-3 text-green-700">
                  Delivered at {deliveredAt}
                </div>
              ) : (
                <div className="my-3 rounded-lg bg-red-100 p-3 text-red-700">
                  Not delivered
                </div>
              )}
            </div>
            <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5">
              <h2 className="text-lg mb-2">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="my-3 rounded-lg bg-green-100 p-3 text-green-700">
                  Paid at {paidAt}
                </div>
              ) : (
                <div className="my-3 rounded-lg bg-red-100 p-3 text-red-700">
                  Not paid
                </div>
              )}
            </div>
            <div className="mb-5 block rounded-lg border border-gray-200 shadow-md p-5 overflow-x-auto">
              <h2>Order items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr className="border-b" key={item._id}>
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">{item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className=" mb-5 block rounded-lg border border-gray-200 shadow-md p-5">
              <h2 className="text-lg mb-2">Order Summary</h2>
              <ul>
                <li>
                  <div className="flex justify-between mb-2">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between mb-2">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between mb-2">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between mb-2">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                {!isPaid && (
                  <li>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
