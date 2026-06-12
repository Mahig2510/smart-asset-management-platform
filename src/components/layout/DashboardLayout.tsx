"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [currentUser, setCurrentUser] =
    useState<any>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser =
    async () => {
      try {
        const response =
          await axios.get("/api/me");

        setCurrentUser(
          response.data.user
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout"
      );

      window.location.href = "/";
    } catch (error) {
      console.error(
        "Logout failed",
        error
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-72 border-r bg-white shadow-sm">
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Smart Asset
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Management Platform
          </p>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-black"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/assets"
            className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-black"
          >
            Assets
          </Link>

          <Link
            href="/dashboard/requests"
            className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-black"
          >
            Requests
          </Link>

          <Link
            href="/dashboard/allocations"
            className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-black"
          >
            Allocations
          </Link>

          <Link
            href="/dashboard/history"
            className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-black"
          >
            History
          </Link>

          <Link
            href="/dashboard/qr-scanner"
            className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-black"
          >
            QR Scanner
          </Link>

          <Link
            href="/dashboard/notifications"
            className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-black"
          >
            Notifications
          </Link>

          {currentUser?.role ===
            "ADMIN" && (
            <Link
              href="/dashboard/audit-logs"
              className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-black"
            >
              Audit Logs
            </Link>
          )}

          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg border border-red-200 px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}