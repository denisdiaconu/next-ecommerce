import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Layout({title, children }) {
  return (
    <div>
      <>
        <Head>
          <title>{title? title + ' - Lapage ':'Lapage'}</title>
          <meta name="description" content="Ecommerce Website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='flex justify-between min-h-screen flex-col'>
          <header>
            <nav className='flex shadow-md items-center px-4 justify-between h-12'>
              <Link href="/">
                <a className='font-bold text-lg'>Lapage</a>
              </Link>
              <div>
                <Link href="/cart">Cart</Link>
                <Link href="/login">Login</Link>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer>footer</footer>
        </div>
      </>
    </div>
  );
}
