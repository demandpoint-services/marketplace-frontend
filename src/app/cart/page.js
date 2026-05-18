"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API = "http://localhost:5000/api";

export default function CartPage() {
  const { cart, removeItem, fetchCart, addItem } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data._id) {
        await fetchCart();
        router.push(`/orders/${data._id}`);
      } else {
        alert(data.message || "Checkout failed");
      }
    } catch (err) {
      alert("Checkout error");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-lg">Your cart is empty</p>
          <button
            onClick={() => router.push("/marketplace")}
            className="mt-4 px-5 py-2 bg-white text-black rounded-xl"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-10">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT: ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const product = item.product;

              return (
                <div
                  key={product?._id}
                  className="group flex gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:border-white/20 transition"
                >
                  {/* IMAGE */}
                  <div className="w-20 h-20 bg-white/10 rounded-xl overflow-hidden flex-shrink-0">
                    {product?.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    ) : null}
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <h2 className="font-medium">
                      {product?.title || "Product"}
                    </h2>

                    <p className="text-white/40 text-sm mt-1">
                      ₦{item.price.toLocaleString()} each
                    </p>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => removeItem(product._id)}
                        className="text-white/60 hover:text-white px-2"
                      >
                        −
                      </button>

                      <span className="text-sm">{item.quantity}</span>

                      <button
                        onClick={() => addItem(product._id)}
                        className="text-white/60 hover:text-white px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* PRICE + REMOVE */}
                  <div className="text-right flex flex-col justify-between">
                    <p className="font-semibold">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeItem(product._id)}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: SUMMARY (STICKY) */}
          <div className="lg:sticky top-24 h-fit">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-white/60">
                  <span>Delivery</span>
                  <span>₦0</span>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full mt-6 bg-white text-black py-3 rounded-xl font-medium hover:scale-[1.02] transition"
              >
                {loading ? "Processing..." : "Checkout"}
              </button>

              <p className="text-white/30 text-xs mt-4 text-center">
                Secure checkout powered by Demand Point
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
