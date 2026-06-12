"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardStats {
  totalAssets: number;
  availableAssets: number;
  totalCategories: number;
  activeRequests: number;
  activeAllocations: number;
  totalUsers: number;
}

interface RequestStatusData {
  name: string;
  value: number;
}

interface CategoryData {
  name: string;
  value: number;
}

export default function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [requestStatusData, setRequestStatusData] =
  useState<RequestStatusData[]>([]);

const [categoryData, setCategoryData] =
  useState<CategoryData[]>([]);  
const [currentUser, setCurrentUser] =
  useState<any>(null);

 useEffect(() => {
  fetchStats();
  fetchCurrentUser();
}, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "/api/dashboard/stats"
      );

      setStats(response.data.stats);
      setRequestStatusData(
  response.data.requestStatusData
);

setCategoryData(
  response.data.categoryData
);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentUser = async () => {
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
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-sm text-gray-500">
                Total Assets
              </h2>

              <p className="mt-2 text-3xl font-bold">
                {stats.totalAssets}
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-sm text-gray-500">
                Available Assets
              </h2>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {stats.availableAssets}
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-sm text-gray-500">
                Pending Requests
              </h2>

              <p className="mt-2 text-3xl font-bold text-yellow-600">
                {stats.activeRequests}
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-sm text-gray-500">
                Active Allocations
              </h2>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {stats.activeAllocations}
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-sm text-gray-500">
                Total Users
              </h2>

              <p className="mt-2 text-3xl font-bold text-purple-600">
                {stats.totalUsers}
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-sm text-gray-500">
                Categories
              </h2>

              <p className="mt-2 text-3xl font-bold">
                {stats.totalCategories}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div
  onClick={() => {
    if (
      currentUser?.role !==
      "ADMIN"
    ) {
      toast.error(
        "Only admins can add assets"
      );
      return;
    }

    window.location.href =
      "/dashboard/assets/create";
  }}
  className="cursor-pointer rounded-lg bg-black p-5 text-white shadow-sm transition hover:opacity-90"
>
  <h3 className="text-lg font-semibold">
    Create Asset
  </h3>

  <p className="mt-2 text-sm text-gray-200">
    Add a new asset to inventory
  </p>
</div>

              <a
                href="/dashboard/requests"
                className="rounded-lg bg-blue-600 p-5 text-white shadow-sm transition hover:opacity-90"
              >
                <h3 className="text-lg font-semibold">
                  Manage Requests
                </h3>

                <p className="mt-2 text-sm text-blue-100">
                  Review pending requests
                </p>
              </a>

              <a
                href="/dashboard/allocations"
                className="rounded-lg bg-green-600 p-5 text-white shadow-sm transition hover:opacity-90"
              >
                <h3 className="text-lg font-semibold">
                  View Allocations
                </h3>

                <p className="mt-2 text-sm text-green-100">
                  Monitor allocated assets
                </p>
              </a>
            </div>
          </div>

         <div className="mt-10 grid gap-6 lg:grid-cols-2 items-stretch">

  <div className="rounded-lg border bg-white p-6 shadow-sm min-w-0">
    <h2 className="mb-4 text-xl font-semibold">
      Requests by Status
    </h2>

    <div
      style={{
        width: "100%",
        height: 300,
      }}
    >
      {requestStatusData.length > 0 && (
        <ResponsiveContainer>
          <BarChart
            data={requestStatusData}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="value"
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  </div>

  <div className="rounded-lg border bg-white p-6 shadow-sm min-w-0">
    <h2 className="mb-4 text-xl font-semibold">
      Assets by Category
    </h2>

    <div
      style={{
        width: "100%",
        height: 300,
      }}
    >
      {categoryData.length > 0 && (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {categoryData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={[
                      "#2563eb",
                      "#16a34a",
                      "#dc2626",
                      "#d97706",
                      "#7c3aed",
                    ][index % 5]}
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  </div>

</div>
        </>
      )}
    </DashboardLayout>
  );
}