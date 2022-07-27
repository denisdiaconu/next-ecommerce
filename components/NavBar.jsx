import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

const NavBar = () => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const [cartItemsCount, setcartItemsCount] = useState(0);
  const { cart } = state;

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
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
          <Menu as="div" className="relative inline-block">
            <Menu.Button className="text-blue-600">
              {session.user.name}
            </Menu.Button>
            <Menu.Items className="absolute bg-white right-0 origin-top-right w-56 shadow-lg">
              <Menu.Item>
                <DropdownLink className="dropdown-link" href="/profile">
                  Profile
                </DropdownLink>
              </Menu.Item>
              <Menu.Item>
                <DropdownLink className="dropdown-link" href="/order-history">
                  Order History
                </DropdownLink>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={logoutClickHandler}
                  className="dropdown-link"
                  href="#"
                >
                  Logout
                </a>
              </Menu.Item>
            </Menu.Items>
          </Menu>
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
