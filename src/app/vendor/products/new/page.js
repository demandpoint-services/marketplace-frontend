"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:5000/api";

export default function NewProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        images: [form.image],
      }),
    });

    router.push("/vendor/products");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Title"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            placeholder="Price"
            type="number"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="Stock"
            type="number"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <input
            placeholder="Image URL"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <button className="w-full bg-white text-black py-3 rounded-xl">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
