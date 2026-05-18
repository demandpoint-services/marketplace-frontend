"use client";

import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, onView }) {
  const { addItem } = useCart();

  return (
    <div className="group relative border border-white/10 bg-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition">
      {/* IMAGE */}
      <div className="h-44 bg-black/40 overflow-hidden">
        {product.images?.[0] && (
          <img
            src={product.images[0]}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h2 className="text-lg font-semibold">{product.title}</h2>

        <p className="text-white/40 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <p className="mt-3 font-semibold text-white">₦{product.price}</p>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={onView}
            className="flex-1 bg-white/10 text-white py-2 rounded-xl"
          >
            View
          </button>

          <button
            onClick={() => addItem(product._id)}
            className="flex-1 bg-white text-black py-2 rounded-xl"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
