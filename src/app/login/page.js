"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(form);

      if (data.token) {
        localStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/`;
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
            {error}
          </div>
        )}

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

        <button
          className="w-full bg-black text-white p-3 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
