"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log("FORM SUBMITTED");
  console.log(data);
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "/api/auth/login",
        data
      );
      console.log(response.data);

      if (response.data.success) {
  console.log("LOGIN SUCCESS");

  reset();

  console.log("BEFORE REDIRECT");

  router.push("/dashboard");

  console.log("AFTER REDIRECT");
}
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Smart Asset Management
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            autoComplete="off"
          >
            <div>
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                autoComplete="new-email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>

            <div>
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                {...register("password")}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 font-medium"
              >
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}