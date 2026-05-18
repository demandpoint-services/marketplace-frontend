"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

const API = API_URL;

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch(`${API}/orders/vendor/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setOrders(data);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Sales Overview</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/5 border border-white/10 p-5 rounded-2xl"
            >
              <p className="text-white/40 text-sm">Order ID: {order._id}</p>

              <p className="mt-2">
                Status: <span className="text-yellow-400">{order.status}</span>
              </p>

              <p className="mt-2">
                Total: ₦
                {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}
              </p>

              <p className="text-white/40 text-sm mt-2">
                Items: {order.items.length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
