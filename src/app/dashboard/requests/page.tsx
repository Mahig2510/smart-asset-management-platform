"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function RequestsPage() {
  const [requests, setRequests] =
    useState<any[]>([]);

  const [currentUser, setCurrentUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRequests();
    fetchCurrentUser();
  }, []);

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

  const fetchRequests = async () => {
    try {
      const response =
        await axios.get(
          "/api/requests"
        );

      setRequests(
        response.data.requests
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequest = async (
    id: string,
    status: string
  ) => {
    try {
      await axios.patch(
        `/api/requests/${id}`,
        { status }
      );

      fetchRequests();
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Requests
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

                {currentUser?.role === "ADMIN" && (
                 <th className="p-3 text-left">
                 Actions
                 </th>
               )}
              </tr>
            </thead>

            <tbody>
              {requests.map(
                (request) => (
                  <tr
                    key={request._id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {
                        request.asset
                          ?.name
                      }
                    </td>

                    <td className="p-3">
                      {
                        request.user
                          ?.name
                      }
                    </td>

                    <td className="p-3">
                      {
                        request.quantity
                      }
                    </td>

                    <td className="p-3">
                      {
                        request.status
                      }
                    </td>

                    {currentUser?.role === "ADMIN" && (
  <td className="p-3">
    <div className="flex gap-2">
      <button
        onClick={() =>
          updateRequest(
            request._id,
            "APPROVED"
          )
        }
        className="rounded bg-green-600 px-2 py-1 text-white"
      >
        Approve
      </button>

      <button
        onClick={() =>
          updateRequest(
            request._id,
            "REJECTED"
          )
        }
        className="rounded bg-red-600 px-2 py-1 text-white"
      >
        Reject
      </button>
    </div>
  </td>
)}
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
