import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug)
  if (!product) {
    return <div>Product not found!</div>
  }
  return <Layout title={product.name}>
    <h1>{product.name}</h1>
  </Layout>;
}
