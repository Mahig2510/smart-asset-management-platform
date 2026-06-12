"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

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
      toast.error(
        "Failed to update request"
      );
    }
  };


  if (
  !loading &&
  requests.length === 0
) {
  return (
    <DashboardLayout>
      <div className="rounded-xl bg-white p-12 text-center shadow-sm">
        <h2 className="text-xl font-semibold">
          No Requests Found
        </h2>

        <p className="mt-2 text-slate-500">
          No asset requests are available.
        </p>
      </div>
    </DashboardLayout>
  );
}

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Requests
      </h1>

      {loading ? (
        <p className="rounded-lg bg-white p-6 text-center text-slate-500 shadow-sm">
          Loading requests...
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-100">
                <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                  Asset
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                  User
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                  Quantity
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>

                {currentUser?.role === "ADMIN" && (
                 <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                 Actions
                 </th>
               )}
              </tr>
            </thead>

            <tbody>
              {requests
                .filter(
                  (request) =>
                   request.asset
                )
              .map(
                (request) => (
                  <tr
                    key={request._id}
                    className="border-b transition hover:bg-slate-50"
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
                     <span
                       className={`rounded-full px-3 py-1 text-xs font-medium ${
                        request.status === "APPROVED"
                         ? "bg-green-100 text-green-700"
                         : request.status === "REJECTED"
                         ? "bg-red-100 text-red-700"
                         : "bg-yellow-100 text-yellow-700"
                      }`}
                     >
                       {request.status}
                     </span>
                    </td>

                    {currentUser?.role === "ADMIN" && (
                     <td className="p-3">
                      {request.status ===
                        "PENDING" ? (
                        <div className="flex gap-2">
                        <button
                          onClick={() =>
                          updateRequest(
                        request._id,
                        "APPROVED"
                        )
                      }
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
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
        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        Reject
      </button>
    </div>

  ) : (
   <span
  className={`rounded px-2 py-1 text-white text-sm ${
    request.status ===
    "APPROVED"
      ? "bg-green-600"
      : request.status ===
        "REJECTED"
      ? "bg-red-600"
      : "bg-gray-600"
  }`}
>
  {request.status}
</span>
  )}
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
