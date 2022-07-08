import Head from 'next/head';
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
        <div>
          <header>headr</header>
          <main>{children}</main>
          <footer>footer</footer>
        </div>
      </>
    </div>
  );
}
