import Head from 'next/head';
import React from 'react';
import NavBar from './NavBar';

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
            <NavBar />
          </header>
          <main>{children}</main>
          <footer>footer</footer>
        </div>
      </>
    </div>
  );
}
