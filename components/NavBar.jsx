import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import { useSession } from 'next-auth/react';

const NavBar = () => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const [cartItemsCount, setcartItemsCount] = useState(0);
  const { cart } = state;

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  return (
    <nav className="flex shadow-md items-center px-4 justify-between h-12">
      <Link href="/">
        <a className="font-bold text-lg">Lapage</a>
      </Link>
      <div>
        <Link href="/cart">
          <a className="p-2">
            Cart
            {cartItemsCount > 0 && (
              <span className="ml-1 rounded-full px-2 py-1 text-white bg-red-600 text-xs font-bold">
                {cartItemsCount}
              </span>
            )}
          </a>
        </Link>
        {status === 'loading' ? (
          'Loading'
        ) : session?.user ? (
          session.user.name
        ) : (
          <Link href="/login">
            <a className="p-2">Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
