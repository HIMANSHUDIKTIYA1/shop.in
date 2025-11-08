"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminSignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch('/api/admin/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      setSuccess('Admin account created. Please login.');
      setTimeout(() => router.push('/admin/login'), 1000);
    } else {
      const data = await res.json();
      setError(data?.error || 'Signup failed');
    }
  };

  return (
    <div className="mt-32 max-w-md mx-auto lg:px-8  justify-center px-6 py-12">
              <img
            alt="Your Company"
            src="/store.png"
            className="mx-auto h-10 w-auto"
          />
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">Admin Signup</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-10 w-full border p-2" placeholder="Name" />
         <label htmlFor="email"  className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2" placeholder="Email" />
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2" placeholder="Password" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Create Admin</button>
      </form>
    </div>
  );
};

export default AdminSignupPage;


