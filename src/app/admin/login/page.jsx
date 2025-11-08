"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="mt-32 max-w-md mx-auto lg:px-8  justify-center px-6 py-12">
      <div className=' sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
            alt="Your Company"
            src="/store.png"
            className="mx-auto h-10 w-auto"
          />
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
          <label htmlFor="email"  className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-10 w-full border p-2" placeholder="Email" />
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2" placeholder="Password" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <div className="text-sm mt-2">
          Don&apos;t have admin account? <a href="/admin/signup" className="text-orange-600 ">Create one</a>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

