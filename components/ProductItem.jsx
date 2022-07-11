/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const ProductItem = ({ product }) => {
  return (
    <div className="mb-5 block rounded-lg border border-gray-200 shadow-md">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex p-5 items-center justify-center flex-col">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          type="button"
          className="rounded bg-amber-300 py-2 px-4 shadow outline-none duration-300 hover:bg-amber-400 active:bg-amber-700"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
