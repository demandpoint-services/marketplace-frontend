"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${API}/products/vendor/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setProducts(data);
  };

  const fetchSales = async () => {
    const res = await fetch(`${API}/orders/vendor/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setOrders(data);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-10">Vendor Dashboard</h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <p className="text-white/40">Products</p>
            <p className="text-2xl font-semibold">{products.length}</p>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <p className="text-white/40">Orders</p>
            <p className="text-2xl font-semibold">{orders.length}</p>
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <p className="text-white/40">Revenue</p>
            <p className="text-2xl font-semibold">
              ₦
              {orders.reduce((sum, order) => {
                return (
                  sum +
                  order.items.reduce((s, i) => s + i.price * i.quantity, 0)
                );
              }, 0)}
            </p>
          </div>
        </div>

        {/* PRODUCTS */}
        <h2 className="text-xl mb-4">Your Products</h2>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white/5 p-5 rounded-2xl border border-white/10"
            >
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-white/40 text-sm">₦{p.price}</p>
            </div>
          ))}
        </div>

        {/* SALES */}
        <h2 className="text-xl mb-4">Recent Orders</h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/5 p-5 rounded-2xl border border-white/10"
            >
              <p className="text-white/40 text-sm">Order ID: {order._id}</p>

              <p className="mt-2">
                Total: ₦
                {order.items.reduce((s, i) => s + i.price * i.quantity, 0)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
