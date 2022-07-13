import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

export default function LoginScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen-md">
        <h1 className="text-xl mb-4">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email" className="w-full" id="email" autoFocus />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" className="w-full" id="password" autoFocus />
        </div>
        <div className="mb-4">
          <button className="rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500">
            Login
          </button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
