"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "other",
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(`${API}/products/${id}`);
    const data = await res.json();

    setProduct(data);
    setForm({
      title: data.title || "",
      description: data.description || "",
      price: data.price || "",
      stock: data.stock || "",
      category: data.category || "other",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${API}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data._id) {
      router.push("/vendor/dashboard");
    } else {
      alert(data.message || "Update failed");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/40">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Edit Product</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="number"
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="number"
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <select
            className="w-full bg-black border border-white/10 p-3 rounded-xl"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="fashion">Fashion</option>
            <option value="furniture">Furniture</option>
            <option value="art">Art</option>
            <option value="handmade">Handmade</option>
            <option value="electronics">Electronics</option>
            <option value="other">Other</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-xl"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
