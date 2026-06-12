"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Asset } from "@/types/asset";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [currentUser, setCurrentUser] =
  useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
  useState("ALL"); 
  const [selectedQR, setSelectedQR] =
  useState<string | null>(null);

  useEffect(() => {
  fetchAssets();
  fetchCurrentUser();
}, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("/api/assets");

      setAssets(response.data.assets);
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

  const filteredAssets = assets.filter(
  (asset) => {
    const matchesSearch =
      asset.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      asset.assetId
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" ||
      asset.category?.name ===
        selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
  <h1 className="text-3xl font-bold">
    Assets
  </h1>

  {currentUser?.role === "ADMIN" && (
  <Link
    href="/dashboard/assets/create"
    className="rounded bg-black px-4 py-2 text-white"
  >
    + Create Asset
  </Link>
)}
</div>

<div className="mb-6 flex gap-4">
  <input
    type="text"
    placeholder="Search assets..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-black focus:outline-none"
  />

  <select
    value={selectedCategory}
    onChange={(e) =>
      setSelectedCategory(
        e.target.value
      )
    }
    className="rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-black focus:outline-none"
  >
    <option value="ALL">
      All Categories
    </option>

    {[
      ...new Set(
        assets.map(
          (asset) =>
            asset.category?.name
        )
      ),
    ].map((category) => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    ))}
  </select>
</div>

      {loading ? (
        <p>Loading assets...</p>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-3 text-left">
                  Asset ID
                </th>

                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Category
                </th>

                <th className="p-3 text-left">
                Total Qty
                </th>

                <th className="p-3 text-left">
                Available Qty
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Location
                </th>

                <th className="p-3 text-left">
                  QR Code
                </th>

                {currentUser?.role === "ADMIN" && (
               <th className="p-3 text-left">
                Actions
                </th>
              )}
              </tr>
            </thead>

            <tbody>
              {filteredAssets.map((asset) => (
                <tr
                  key={asset._id}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="p-3">
                    {asset.assetId}
                  </td>

                  <td className="p-3">
                    {asset.name}
                  </td>

                  <td className="p-3">
                    {asset.category?.name}
                  </td>

                  <td className="p-3">
                  {asset.totalQuantity}
                  </td>

                  <td className="p-3">
                   {asset.availableQuantity}
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                       asset.status === "AVAILABLE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                     }`}
                    >
                     {asset.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {asset.location}
                  </td>

                  <td className="p-3">
  {asset.qrCode ? (
    <div className="flex flex-col gap-2">
      <img
        src={asset.qrCode}
        alt="QR Code"
        className="h-16 w-16"
      />

      <button
        onClick={() =>
          setSelectedQR(
            asset.qrCode || null
          )
        }
        className="rounded bg-blue-500 px-2 py-1 text-xs text-white"
      >
        View QR
      </button>

      <a
        href={asset.qrCode}
        download={`${asset.assetId}-qr.png`}
        className="rounded bg-green-600 px-2 py-1 text-center text-xs text-white"
      >
        Download
      </a>
    </div>
  ) : (
    "-"
  )}
</td>

                 <td className="p-3">
  <div className="flex gap-2">
    <Link
      href={`/dashboard/assets/${asset._id}`}
      className="rounded bg-blue-500 px-2 py-1 text-white text-sm"
    >
      View
    </Link>

    {currentUser?.role === "ADMIN" && (
      <>
        <Link
          href={`/dashboard/assets/${asset._id}/edit`}
          className="rounded bg-yellow-500 px-2 py-1 text-white text-sm"
        >
          Edit
        </Link>

        <button
          onClick={async () => {
            const confirmed =
             window.confirm(
               "Are you sure you want to delete this asset? This action cannot be undone."
             );

             if (!confirmed) return;

            try {
             await axios.delete(
                `/api/assets/${asset._id}`
             );

             toast.success(
              "Asset deleted successfully"
             );

             fetchAssets();
            } catch (error) {
             console.error(error);

            toast.error(
              "Failed to delete asset"
            );
          }
                 
          }}
          className="rounded bg-red-500 px-2 py-1 text-white text-sm"
        >
          Delete
        </button>
      </>
    )}
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    {selectedQR && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="rounded-lg bg-white p-6">
      <img
        src={selectedQR}
        alt="QR Code"
        className="h-72 w-72"
      />

      <button
        onClick={() =>
          setSelectedQR(null)
        }
        className="mt-4 w-full rounded bg-red-600 px-4 py-2 text-white"
      >
        Close
      </button>
    </div>
  </div>
)}  
    </DashboardLayout>
  );
}