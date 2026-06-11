"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";

interface DashboardStats {
  totalAssets: number;
  availableAssets: number;
  allocatedAssets: number;
  totalCategories: number;
}

export default function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "/api/dashboard/stats"
      );

      setStats(response.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Smart Asset Management Overview
        </p>
      </div>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-sm text-gray-500">
              Total Assets
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {stats.totalAssets}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-sm text-gray-500">
              Available Assets
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {stats.availableAssets}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-sm text-gray-500">
              Allocated Assets
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {stats.allocatedAssets}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-sm text-gray-500">
              Categories
            </h2>

            <p className="mt-2 text-3xl font-bold">
              {stats.totalCategories}
            </p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}