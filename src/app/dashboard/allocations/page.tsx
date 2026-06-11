"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AllocationsPage() {
  const [allocations, setAllocations] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      const response =
        await axios.get(
          "/api/allocations"
        );

      setAllocations(
        response.data.allocations
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Active Allocations
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-3 text-left">
                  Asset
                </th>

                <th className="p-3 text-left">
                  User
                </th>

                <th className="p-3 text-left">
                  Quantity
                </th>

                <th className="p-3 text-left">
                  Issue Date
                </th>

                <th className="p-3 text-left">
                  Due Date
                </th>

                <th className="p-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {allocations.map(
                (allocation) => (
                  <tr
                    key={
                      allocation._id
                    }
                    className="border-b"
                  >
                    <td className="p-3">
                      {
                        allocation.asset
                          ?.name
                      }
                    </td>

                    <td className="p-3">
                      {
                        allocation.user
                          ?.name
                      }
                    </td>

                    <td className="p-3">
                      {
                        allocation.quantity
                      }
                    </td>

                    <td className="p-3">
                      {new Date(
                        allocation.issueDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {new Date(
                        allocation.dueDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {
                        allocation.status
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}