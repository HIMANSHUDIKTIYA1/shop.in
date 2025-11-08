"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewProductPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', slug: '', desc: '', img: '', category: '', size: '', color: '', price: '', availableQty: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = [{
      title: form.title,
      slug: form.slug,
      desc: form.desc,
      img: form.img,
      category: form.category,
      size: form.size.split(',').map(s => s.trim()).filter(Boolean),
      color: form.color.split(',').map(c => c.trim()).filter(Boolean),
      price: Number(form.price),
      availableQty: Number(form.availableQty),
    }];

    const res = await fetch('/api/addproducts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setSuccess('Product created');
      setTimeout(() => router.push('/admin'), 800);
    } else {
      setError('Failed to create product');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
        <input name="title" value={form.title} onChange={update} className="border p-2" placeholder="Title" />
        <input name="slug" value={form.slug} onChange={update} className="border p-2" placeholder="Slug" />
        <input name="img" value={form.img} onChange={update} className="border p-2" placeholder="Image URL" />
        <input name="category" value={form.category} onChange={update} className="border p-2" placeholder="Category" />
        <input name="size" value={form.size} onChange={update} className="border p-2" placeholder="Sizes (comma separated)" />
        <input name="color" value={form.color} onChange={update} className="border p-2" placeholder="Colors (comma separated)" />
        <input name="price" value={form.price} onChange={update} className="border p-2" placeholder="Price" />
        <input name="availableQty" value={form.availableQty} onChange={update} className="border p-2" placeholder="Available Qty" />
        <textarea name="desc" value={form.desc} onChange={update} className="border p-2" placeholder="Description" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default NewProductPage;


