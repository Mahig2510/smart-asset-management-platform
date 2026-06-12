"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function HistoryPage() {
  const [history, setHistory] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response =
        await axios.get(
          "/api/history"
        );

      setHistory(
        response.data.history
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-3xl font-bold">
        Borrowing History
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
                  Status
                </th>

                <th className="p-3 text-left">
                  Purpose
                </th>

                <th className="p-3 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {history.map(
                (item) => (
                  <tr
                    key={item._id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {
                        item.asset
                          ?.name
                      }
                    </td>

                    <td className="p-3">
                      {
                        item.user
                          ?.name
                      }
                    </td>

                    <td className="p-3">
                      {
                        item.quantity
                      }
                    </td>

                    <td className="p-3">
                      {
                        item.status
                      }
                    </td>

                    <td className="p-3">
                      {
                        item.purpose
                      }
                    </td>

                    <td className="p-3">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
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