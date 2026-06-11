"use client";

import Link from "next/link";
import { ReactNode } from "react";
import axios from "axios";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">
            Smart Asset
          </h1>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block rounded-md px-4 py-2 hover:bg-slate-100"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/assets"
            className="block rounded-md px-4 py-2 hover:bg-slate-100"
          >
            Assets
          </Link>

          <Link
           href="/dashboard/requests"
           className="block rounded-md px-4 py-2 hover:bg-slate-100"
          >
            Requests
          </Link>

          <Link
          href="/dashboard/allocations"
          className="block rounded-md px-4 py-2 hover:bg-slate-100"
          >
          Allocations
         </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left rounded-md px-4 py-2 hover:bg-slate-100"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}