import Head from 'next/head';
import Footer from './Footer';
import NavBar from './NavBar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React from 'react';

export default function Layout({ title, children }) {
  return (
    <div>
      <>
        <Head>
          <title>{title ? title + ' - Lapage ' : 'Lapage'}</title>
          <meta name="description" content="Ecommerce Website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer position="bottom-center" limit={1} />
        <div className="flex justify-between min-h-screen flex-col">
          <header>
            <NavBar />
          </header>
          <main className="container mt-4 px-4 m-auto">{children}</main>
          <footer className="flex items-center justify-center h-10 shadow-inner">
            <Footer />
          </footer>
        </div>
      </>
    </div>
  );
}
