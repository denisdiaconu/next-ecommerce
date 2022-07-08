/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Link } from 'next/link';

const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className='flex items-center justify-center flex-col'>

      </div>
    </div>
  );
};

export default ProductItem;
