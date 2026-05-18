"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function VendorProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    const res = await fetch(`${API}/products/vendor/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-semibold">Your Products</h1>
            <p className="text-white/40">Manage your listings</p>
          </div>

          <button
            onClick={() => router.push("/vendor/products/new")}
            className="bg-white text-black px-4 py-2 rounded-xl"
          >
            + Add Product
          </button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5"
            >
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="text-white/40 text-sm mt-1">₦{p.price}</p>

              <p className="text-white/30 text-xs mt-2">Stock: {p.stock}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => router.push(`/vendor/products/${p._id}/edit`)}
                  className="flex-1 bg-white/10 py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
