import React from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard';
import Link from 'next/link';

export default function PlaceOrderScreen() {
  return (
    <Layout title='Place Order'>
        <CheckoutWizard activeStep={3} />
        <h1 className='text-xl mb-4'>Place Order</h1>
        {cartItems.length === 0 ?
        (
            <div>
                Cart is empty. <Link href='/'>Go shopping</Link>
            </div>
        ) :
        (
            <div className="grid md:gap-5 md:grid-cols-4">
                
            </div>
        )
    }
    </Layout>
  )
}
