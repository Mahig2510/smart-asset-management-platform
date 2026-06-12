"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await axios.post(
          "/api/auth/register",
          formData
        );

      toast.success(
        response.data.message
      );

      router.push("/login");
      } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          autoComplete="off"
        >
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 p-3 text-white"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}