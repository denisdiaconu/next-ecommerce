import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../utils/Store';

const NavBar = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <nav className="flex shadow-md items-center px-4 justify-between h-12">
      <Link href="/">
        <a className="font-bold text-lg">Lapage</a>
      </Link>
      <div>
        <Link href="/cart">
          <a className="p-2">
            Cart
            {cart.cartItems.length > 0 && (
              <span className="ml-1 rounded-full px-2 py-1 text-white bg-red-600 text-xs font-bold">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </a>
        </Link>
        <Link href="/login">
          <a className="p-2">Login</a>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
