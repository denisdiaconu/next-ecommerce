import React from 'react'
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';

export default function PaymentScreen() {
  return (
    <Layout title='Payment Method'>
        <CheckoutWizard activeStep={2} />
    </Layout>
  )
}
