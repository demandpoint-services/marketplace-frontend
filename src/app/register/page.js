"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await registerUser(form);

      if (data.token) {
        localStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/`;
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-4"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full border p-3 rounded mb-4"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="client">Client</option>
          <option value="artisan">Artisan</option>
        </select>

        <button
          className="w-full bg-black text-white p-3 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="mt-4 text-sm">
          Already have account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
