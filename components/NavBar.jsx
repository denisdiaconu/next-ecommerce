import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="flex shadow-md items-center px-4 justify-between h-12">
      <Link href="/">
        <a className="font-bold text-lg">Lapage</a>
      </Link>
      <div>
        <Link href="/cart">
          <a className="p-2">Cart</a>
        </Link>
        <Link href="/login">
          <a className="p-2">Login</a>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
