"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

export default function AllocationsPage() {
  const [allocations, setAllocations] =
    useState<any[]>([]);

  const [currentUser, setCurrentUser] =
  useState<any>(null);  

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
  fetchAllocations();
  fetchCurrentUser();
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


  const returnAsset = async (
  allocationId: string
) => {
  try {
    await axios.patch(
      `/api/allocations/${allocationId}/return`
    );

    toast.success(
  "Asset returned successfully"
);

    fetchAllocations();
  } catch (error) {
    console.error(error);
    toast.error(
      "Failed to return asset"
    );
  }
};

if (
  !loading &&
  allocations.length === 0
) {
  return (
    <DashboardLayout>
      <div className="rounded-xl bg-white p-12 text-center shadow-sm">
        <h2 className="text-xl font-semibold">
          No Allocations Found
        </h2>

        <p className="mt-2 text-slate-500">
          No assets are currently allocated.
        </p>
      </div>
    </DashboardLayout>
  );
}

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Allocations
      </h1>

      {loading ? (
        <p className="rounded-lg bg-white p-6 text-center text-slate-500 shadow-sm">
         Loading allocations...
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-100">
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

                <th className="p-3 text-left">
                Return Date
                </th>

                <th className="p-3 text-left">
                 Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {allocations
               .filter(
                 (allocation) =>
                   allocation.asset
               )
              .map(
                (allocation) => (
  
                  <tr
                    key={
                      allocation._id
                    }
                    className="border-b transition hover:bg-slate-50"
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
                     <span
                       className={`rounded-full px-3 py-1 text-xs font-medium ${
                        allocation.status === "ACTIVE"
                         ? "bg-green-100 text-green-700"
                         : allocation.status === "OVERDUE"
                         ? "bg-red-100 text-red-700"
                         : "bg-gray-100 text-gray-700"
                      }`}
                    >
                     {allocation.status}
                   </span>
                   </td>

                    <td className="p-3">
                      {allocation.returnDate
                        ? new Date(
                        allocation.returnDate
                        ).toLocaleDateString()
                      : "-"}
                    </td>

                    <td className="p-3">
  {allocation.status ===
  "ACTIVE" &&
  currentUser?.role ===
    "USER" && (
    <button
      onClick={() =>
        returnAsset(
          allocation._id
        )
      }
      className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
    >
      Return
    </button>
)}

  {allocation.status ===
    "RETURNED" && (
    <span className="text-gray-500">
      Returned
    </span>
  )}
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