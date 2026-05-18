"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";

const API = "http://localhost:5000/api";

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/40">Loading marketplace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold">Marketplace</h1>
          <p className="text-white/40 mt-2">
            Discover products from trusted vendors
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onView={() => router.push(`/marketplace/product/${product._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
