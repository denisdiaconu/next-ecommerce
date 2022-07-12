import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { Link } from 'next/link';
import Image from 'next/image';

export default function cartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <Layout title="Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:gap-5 md:grid-cols-4">
          <div className="md:col-span-3 overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border.b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            height={50}
                            width={50}
                          ></Image>
                          &nbsp
                          {cartItems.name}
                        </a>
                      </Link>
                    </td>
                    <td className='text-right p-5'>
                        {item.quantity}
                    </td>
                    <td className='text-right p-5'>
                        ${item.price}
                    </td>
                    <td className='text-center p-5'>
                        <button>
                            <XCircleIcon className='w-5 b-5'></XCircleIcon>
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}
