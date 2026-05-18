"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addItem } = useCart();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(`${API}/products/${id}`);
    const data = await res.json();
    setProduct(data);
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
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="rounded-2xl overflow-hidden bg-white/10 h-96">
          <img
            src={product.images?.[0]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl font-semibold">{product.title}</h1>

          <p className="text-white/40 mt-4">{product.description}</p>

          <p className="text-2xl font-semibold mt-6">₦{product.price}</p>

          <button
            onClick={() => addItem(product._id)}
            className="mt-6 w-full bg-white text-black py-3 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
